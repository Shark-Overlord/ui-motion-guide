"""Playwright 240Hz temporal samples -> 4-sample tmix -> lossless 60fps.

python scripts/render_panels_hq.py [--component action-button]
CSS animations and JS timers/RAF share an offline clock. Identical static
samples reuse the same PNG bytes after checking DOM, animations and pointer
states; every output frame still contains exactly four temporal samples.
"""
from __future__ import annotations

import argparse
import base64
from functools import partial
from http.server import ThreadingHTTPServer
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import threading
import time

from PIL import Image
from playwright.sync_api import sync_playwright

from record_panels import ROOT, COMPONENTS, QuietHandler, record_interactions


class TemporalRenderer:
    def __init__(self, page, frame, cdp, clip, encoder, name):
        self.page, self.frame, self.cdp, self.clip = page, frame, cdp, clip
        self.encoder, self.name = encoder, name
        self.events = []
        self.samples = self.captures = self.reused = 0
        self.png = None
        self.fingerprint = None
        self.next_log = 240
        self.start = time.monotonic()

    def tick(self, target):
        return self.frame.evaluate('t => __motionRenderClock.tick(t)', target)

    def screenshot(self):
        data = self.cdp.send('Page.captureScreenshot', {'format': 'png', 'fromSurface': True, 'captureBeyondViewport': False, 'optimizeForSpeed': True, 'clip': {**self.clip, 'scale': 2}})
        return base64.b64decode(data['data'])

    def wait(self, ms):
        groups = max(1, round(ms * 60 / 1000))
        for _ in range(groups):
            for sub in range(4):
                target = (self.samples + 1) * 1000 / 240
                state = self.tick(target)
                # Synchronous style invalidation may create new transitions.
                # Pause them before capture; a second flush keeps wall time out.
                state = self.tick(target)
                fingerprint = hashlib.blake2b(state['fingerprint'].encode(), digest_size=16).digest()
                if fingerprint != self.fingerprint or self.png is None:
                    self.png = self.screenshot()
                    self.fingerprint = fingerprint
                    self.captures += 1
                else:
                    self.reused += 1
                self.encoder.stdin.write(self.png)
                self.samples += 1
            if self.samples >= self.next_log:
                print(json.dumps({'component': self.name, 'rendered_seconds': round(self.samples/240, 2), 'browser_captures': self.captures, 'static_samples_reused': self.reused, 'wall_seconds': round(time.monotonic()-self.start, 1)}), flush=True)
                self.next_log += 240

    def capture(self, duration=100):
        self.wait(duration)

    def hover(self, selector, wait=400):
        self.frame.locator(selector).first.hover(force=True)
        self.events.append({'action': 'hover', 'target': selector})
        self.wait(wait)

    def click(self, selector, wait=500):
        self.frame.locator(selector).first.click(force=True)
        self.events.append({'action': 'click', 'target': selector})
        self.wait(wait)

    def press(self, selector, wait=180):
        self.frame.locator(selector).first.hover(force=True)
        self.page.mouse.down()
        self.wait(wait)
        self.page.mouse.up()
        self.wait(220)
        self.events.append({'action': 'press', 'target': selector})

    def check(self, selector, attribute, value):
        actual = self.frame.locator(selector).first.get_attribute(attribute)
        assert actual == value, (selector, attribute, actual, value)
        self.events.append({'check': selector, 'attribute': attribute, 'value': value})


def encode_outputs(ffmpeg, master, apng, mp4):
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(master), '-c:v', 'apng', '-pred', 'mixed', '-plays', '0', '-f', 'apng', str(apng)], check=True)
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(master), '-c:v', 'libx264', '-preset', 'medium', '-crf', '12', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(mp4)], check=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--component', choices=COMPONENTS)
    args = parser.parse_args()
    ffmpeg, ffprobe = shutil.which('ffmpeg'), shutil.which('ffprobe')
    assert ffmpeg and ffprobe, 'FFmpeg and FFprobe are required'
    chosen = [args.component] if args.component else COMPONENTS
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    images = ROOT/'docs/images/panels'
    videos = ROOT/'docs/recordings/panels-hq'
    artifacts = ROOT/'artifacts/temporal-render'
    videos.mkdir(parents=True, exist_ok=True)
    artifacts.mkdir(parents=True, exist_ok=True)
    report_path = ROOT/'docs/panel-renders-hq.json'
    records = json.loads(report_path.read_text(encoding='utf-8'))['renders'] if report_path.exists() else []
    clock_source = (ROOT/'scripts/render_clock.js').read_text(encoding='utf-8')
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(channel='chrome', headless=True)
            context = browser.new_context(viewport={'width': 1140, 'height': 650}, device_scale_factor=2, permissions=['clipboard-read','clipboard-write'])
            context.add_init_script(clock_source)
            for name in chosen:
                page = context.new_page()
                errors = []
                page.on('pageerror', lambda error: errors.append(str(error)))
                page.goto(base+'/examples/panels/index.html?component='+name)
                page.wait_for_function("document.getElementById('componentFrame').dataset.ready === 'true'")
                frame = next(f for f in page.frames if '/'+name+'/index.html' in f.url)
                frame.evaluate('document.fonts.ready')
                for t in range(0, 101, 4): frame.evaluate('t => __motionRenderClock.tick(t)', t)
                # Establish a zero-time baseline after layout has settled.
                frame.evaluate('() => { const original = __motionRenderClock.tick.bind(__motionRenderClock); window.__hqOffset=100; window.__hqTick=t=>original(t+100); }')
                clip = page.locator('#panel').bounding_box()
                cdp = context.new_cdp_session(page)
                before = images/(name+'-before-hq.png')
                raw = cdp.send('Page.captureScreenshot', {'format':'png','captureBeyondViewport':False,'clip':{**clip,'scale':2}})
                before.write_bytes(base64.b64decode(raw['data']))
                assert Image.open(before).size == (2120,1120)
                master = artifacts/(name+'-60fps.mkv')
                log = (artifacts/(name+'-ffmpeg.log')).open('wb')
                filters = "format=gbrp,tmix=frames=4:weights='1 1 1 1',select='eq(mod(n,4),3)',setpts=N/(60*TB),format=rgb24"
                encoder = subprocess.Popen([ffmpeg,'-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate','240','-i','pipe:0','-vf',filters,'-r','60','-c:v','ffv1','-level','3',str(master)],stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=log)
                r = TemporalRenderer(page,frame,cdp,clip,encoder,name)
                r.tick = lambda target: frame.evaluate('t=>__hqTick(t)', target)
                try:
                    r.wait(400)
                    record_interactions(name,r)
                    page.mouse.move(1120,630)
                    r.wait(400)
                finally:
                    encoder.stdin.close()
                    code=encoder.wait()
                    log.close()
                assert code==0, (artifacts/(name+'-ffmpeg.log')).read_text(errors='replace')
                assert not errors, errors
                apng = images/(name+'-after-hq.png')
                mp4 = videos/(name+'-after-60fps.mp4')
                encode_outputs(ffmpeg,master,apng,mp4)
                probe=json.loads(subprocess.check_output([ffprobe,'-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate,nb_read_frames','-of','json',str(mp4)]))['streams'][0]
                assert probe['r_frame_rate']=='60/1'
                assert int(probe['nb_read_frames'])==r.samples//4
                animation=Image.open(apng)
                assert animation.n_frames==r.samples//4
                assert apng.stat().st_size < 100_000_000, 'APNG exceeds GitHub file limit'
                record={'component':name,'sample_rate':240,'subframes_per_frame':4,'output_fps':60,'resolution':[2120,1120],'tmix_filter':filters,'temporal_samples':r.samples,'output_frames':r.samples//4,'browser_captures':r.captures,'identical_static_samples_reused':r.reused,'before':before.relative_to(ROOT).as_posix(),'after':apng.relative_to(ROOT).as_posix(),'video':mp4.relative_to(ROOT).as_posix(),'animation_bytes':apng.stat().st_size,'runtime_errors':errors,'events':r.events}
                records=[x for x in records if x['component']!=name]+[record]
                report={'renderer':'Playwright Chrome, controlled JS and CSS clock','device_scale_factor':2,'input_fps':240,'output_fps':60,'subframes':4,'renders':records}
                report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
                print(json.dumps({'completed':name,'fps':60,'frames':r.samples//4,'apng_mb':round(apng.stat().st_size/1024/1024,2)},ensure_ascii=False),flush=True)
                page.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    skill=ROOT/'skills/component-motion-tree'
    manifest=json.loads((skill/'references/source-integrity.json').read_text(encoding='utf-8'))
    for entry in manifest['files']:
        assert hashlib.sha256((skill/entry['bundled']).read_bytes()).hexdigest()==entry['sha256']


if __name__=='__main__':
    main()
