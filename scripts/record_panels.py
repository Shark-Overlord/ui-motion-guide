"""录制 style-1 的全部 9 个动态面板，参考文件保持原样。

python scripts/record_panels.py [--component button]
依赖 playwright、Pillow、FFmpeg 和已安装的 Google Chrome。
Before 是同一成品面板的初始静态状态，After 是真实交互过程。
"""
from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import threading

from PIL import Image
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS = ['button', 'action-button', 'split-button', 'button-group', 'floating-button-group', 'expanding-button-group', 'copy-button', 'icon-morph', 'confirm-morph']


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Recorder:
    def __init__(self, page, frame, clip):
        self.page, self.frame, self.clip = page, frame, clip
        self.events = []

    def capture(self, duration=100):
        self.wait(duration)

    def wait(self, ms):
        self.page.wait_for_timeout(ms)

    def click(self, selector, wait=500):
        self.frame.locator(selector).first.click()
        self.events.append({'action': 'click', 'target': selector})
        self.wait(wait)

    def hover(self, selector, wait=400):
        self.frame.locator(selector).first.hover()
        self.events.append({'action': 'hover', 'target': selector})
        self.wait(wait)

    def press(self, selector, wait=180):
        item = self.frame.locator(selector).first
        item.hover()
        self.page.mouse.down()
        self.wait(wait)
        self.page.mouse.up()
        self.wait(220)
        self.events.append({'action': 'press', 'target': selector})

    def check(self, selector, attribute, value):
        expect(self.frame.locator(selector).first).to_have_attribute(attribute, value)
        self.events.append({'check': selector, 'attribute': attribute, 'value': value})


def record_interactions(name, r):
    if name == 'button':
        for selector in ['.arc-btn:not(.arc-btn-primary):not([disabled])', '.arc-btn-ghost', '.arc-btn-delete', '.arc-btn-lg']:
            r.press(selector)
        r.click('#saveChangesBtn', 4200)
        r.click('#continueBtn', 500)
        r.click('#copyLinkBtn', 500)
        r.click('#iconCopyBtn', 500)
        r.click('#uploadFileBtn', 4700)
        assert r.frame.locator('#saveChangesText').inner_text() == 'Save changes'
        assert r.frame.locator('#uploadFileContent').inner_text() == 'Upload file'
        r.events.append({'check': 'save_and_upload_return_to_idle'})
    elif name == 'action-button':
        r.press('#mainActionBtn')
        r.wait(4200)
        r.check('#mainActionBtn', 'data-state', 'idle')
    elif name == 'split-button':
        r.click('#splitTriggerBtn')
        r.check('#splitTriggerBtn', 'aria-expanded', 'true')
        r.hover('#itemSaveDraft')
        r.click('#itemSaveDraft', 2600)
        r.click('#splitPrimaryBtn', 2600)
        r.click('#splitTriggerBtn')
        r.hover('#itemPublishNotify')
        r.click('#itemPublishNotify', 2600)
        r.click('#splitTriggerBtn')
        r.hover('#itemDeleteDraft')
        r.click('#itemDeleteDraft', 2600)
        r.check('#splitTriggerBtn', 'aria-expanded', 'false')
    elif name == 'button-group':
        for selector in ['#btnShare', '#btnDuplicate', '#btnArchive', '#btnMenuTrigger']:
            r.hover(selector)
        r.click('#btnShare', 1900)
        for _ in range(3): r.click('#btnZoomOut', 400)
        assert r.frame.locator('#zoomSrOnly').inner_text() == '25%'
        for _ in range(8): r.click('#btnZoomIn', 300)
        assert r.frame.locator('#zoomSrOnly').inner_text() == '400%'
        r.click('#btnZoomReset', 500)
        r.click('#btnMenuTrigger')
        r.hover('.menu-item')
        r.page.keyboard.press('Escape')
        r.wait(300)
        r.click('#btnSave', 1900)
        r.hover('#btnPreview')
        r.events.append({'check': 'counter_25_to_400_then_reset'})
    elif name == 'floating-button-group':
        for selector in ['#trayEditor [aria-label="Undo"]', '#trayEditor [aria-label="Comment"]', '#btnShareItem', '#btnPresentItem', '#trayCanvas [aria-label="Zoom in"]', '#trayCanvas [aria-label="Zoom out"]', '#trayCanvas [aria-label="Lock layer"]', '#trayCanvas [aria-label="Hide layer"]', '#trayMessage [aria-label="Copy text"]', '#trayMessage [aria-label="Pin message"]', '#trayMessage [aria-label="Archive"]']:
            r.hover(selector, 360)
        r.click('#btnShareItem', 1900)
        r.click('#btnPresentItem')
        r.check('#btnPresentItem', 'aria-pressed', 'true')
        r.click('#btnPresentItem')
        r.click('#trayCanvas [aria-label="Lock layer"]')
        r.click('#trayCanvas [aria-label="Hide layer"]')
    elif name == 'expanding-button-group':
        groups = r.frame.locator('.ebg-group')
        for i in range(groups.count()):
            group = groups.nth(i)
            items = group.locator('.ebg-item')
            for j in range(items.count()):
                item = items.nth(j)
                item.hover()
                r.events.append({'action': 'hover', 'group': i, 'item': item.get_attribute('data-id')})
                r.wait(420)
            item = items.nth(1)
            item.click()
            r.wait(1700)
            expect(item).to_have_attribute('data-state', 'idle')
        r.events.append({'check': 'all_groups_expand_and_feedback_reset'})
    elif name == 'copy-button':
        r.click('#copyLinkBtn', 400)
        r.check('#copyLinkBtn', 'data-state', 'copied')
        assert r.frame.evaluate('navigator.clipboard.readText()') == 'https://example.com/launch'
        r.click('#copyCodeBtn', 2300)
        r.check('#copyLinkBtn', 'data-state', 'idle')
        r.check('#copyCodeBtn', 'data-state', 'idle')
        assert r.frame.evaluate('navigator.clipboard.readText()') == 'ARC-4821'
        r.events.append({'check': 'actual_clipboard_results'})
    elif name == 'icon-morph':
        selectors = ['#cardMenu', '#cardPlay', '#cardPlus', '#cardCopy', '#cardTheme', '#cardChevron', '#cardBell', '#cardHeart']
        for selector in selectors:
            r.click(selector, 600)
            r.check(selector, 'data-active', 'true')
        for selector in selectors:
            r.click(selector, 450)
            r.check(selector, 'data-active', 'false')
    elif name == 'confirm-morph':
        r.click('#btnTrigger')
        r.click('#btnCancel')
        r.click('#btnTrigger')
        r.click('#btnConfirm', 1700)
        expect(r.frame.locator('#faceDone')).to_be_visible()
        r.click('#btnUndo', 1700)
        r.click('[data-mode="hold"]')
        r.click('#btnTrigger')
        r.frame.locator('#btnConfirm').hover()
        r.page.mouse.down()
        r.wait(1200)
        r.page.mouse.up()
        r.wait(1700)
        expect(r.frame.locator('#faceDone')).to_be_visible()
        r.click('#btnUndo', 1700)
        r.click('[data-mode="countdown"]')
        r.click('#btnTrigger')
        r.click('#btnConfirm', 900)
        r.click('#btnCancelCounting', 500)
        r.click('[data-result="fails"]')
        r.click('#btnTrigger')
        r.click('#btnConfirm', 4800)
        expect(r.frame.locator('#faceError')).to_be_visible()
        r.click('[data-result="succeeds"]')
        r.click('#btnRetry', 1800)
        expect(r.frame.locator('#faceDone')).to_be_visible()
        r.click('#btnUndo', 1700)
        r.events.append({'check': 'click_hold_countdown_cancel_undo_error_retry'})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--component', choices=COMPONENTS)
    args = parser.parse_args()
    ffmpeg = shutil.which('ffmpeg')
    if not ffmpeg:
        raise SystemExit('FFmpeg is required for GIF encoding.')
    chosen = [args.component] if args.component else COMPONENTS
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    output = ROOT/'docs/images/panels'
    output.mkdir(parents=True, exist_ok=True)
    recordings = ROOT/'docs/recordings/panels'
    recordings.mkdir(parents=True, exist_ok=True)
    records = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(channel='chrome', headless=True)
            context = browser.new_context(viewport={'width': 1140, 'height': 650}, device_scale_factor=1, permissions=['clipboard-read', 'clipboard-write'], record_video_dir=str(ROOT/'artifacts/panel-videos'), record_video_size={'width': 1140, 'height': 650})
            for name in chosen:
                page = context.new_page()
                errors = []
                page.on('pageerror', lambda error: errors.append(str(error)))
                page.goto(base+'/examples/panels/index.html?component='+name)
                page.wait_for_function("document.getElementById('componentFrame').dataset.ready === 'true'")
                frame = next(f for f in page.frames if '/'+name+'/index.html' in f.url)
                frame.evaluate('document.fonts.ready')
                page.wait_for_timeout(1400)
                clip = page.locator('#panel').bounding_box()
                page.screenshot(path=str(output/(name+'-before.png')), clip=clip)
                r = Recorder(page, frame, clip)
                r.capture(500)
                record_interactions(name, r)
                page.mouse.move(1120, 630)
                r.wait(400)
                assert not errors, errors
                gif_path = output/(name+'-after.gif')
                video_path = recordings/(name+'-after.webm')
                video = page.video
                page.close()
                video.save_as(str(video_path))
                crop = f"crop={round(clip['width'])}:{round(clip['height'])}:{round(clip['x'])}:{round(clip['y'])}"
                filters = f"[0:v]trim=start=0.8,setpts=PTS-STARTPTS,{crop},fps=15,split[a][b];[a]palettegen=max_colors=160:stats_mode=diff[p];[b][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle"
                subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', '-i', str(video_path), '-filter_complex', filters, '-loop', '0', str(gif_path)], check=True)
                gif = Image.open(gif_path)
                assert gif.n_frames > 1
                duration_ms = 0
                for i in range(gif.n_frames):
                    gif.seek(i)
                    duration_ms += gif.info.get('duration', 0)
                records.append({'component': name, 'before': str((output/(name+'-before.png')).relative_to(ROOT)).replace('\\','/'), 'after': str(gif_path.relative_to(ROOT)).replace('\\','/'), 'original_recording': str(video_path.relative_to(ROOT)).replace('\\','/'), 'frames': gif.n_frames, 'duration_ms': duration_ms, 'bytes': gif_path.stat().st_size, 'runtime_errors': errors, 'events': r.events})
                print(json.dumps({'component': name, 'frames': gif.n_frames, 'bytes': gif_path.stat().st_size, 'checks': len(r.events)}, ensure_ascii=False), flush=True)
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    skill = ROOT/'skills/component-motion-tree'
    manifest = json.loads((skill/'references/source-integrity.json').read_text(encoding='utf-8'))
    for entry in manifest['files']:
        assert hashlib.sha256((skill/entry['bundled']).read_bytes()).hexdigest() == entry['sha256']
    report_path = ROOT/'docs/panel-recordings.json'
    if args.component and report_path.exists():
        previous = json.loads(report_path.read_text(encoding='utf-8'))['recordings']
        records = [item for item in previous if item['component'] != args.component] + records
    report = {'browser': 'Google Chrome / Playwright', 'source': 'style-1 original interactive examples', 'before_definition': 'Initial static state of the same full panel; not the separate raw button files', 'source_files_unchanged': len(manifest['files']), 'recordings': records}
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')


if __name__ == '__main__':
    main()
