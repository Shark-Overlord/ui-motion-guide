"""Validate the controlled clock, four-sample blend, and published HQ files."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil
import subprocess
import time

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]


def verify_engine():
    ffmpeg=shutil.which('ffmpeg')
    samples=[0,40,80,120,160,180,200,220]
    pixels=b''.join(bytes([n,n,n])*16*16 for n in samples)
    filters="format=gbrp,tmix=frames=4:weights='1 1 1 1',select='eq(mod(n,4),3)',setpts=N/(60*TB),format=rgb24"
    command=[ffmpeg,'-hide_banner','-loglevel','error','-f','rawvideo','-pixel_format','rgb24','-video_size','16x16','-framerate','240','-i','pipe:0','-vf',filters,'-r','60','-f','rawvideo','-pix_fmt','rgb24','pipe:1']
    result=subprocess.run(command,input=pixels,capture_output=True,check=True)
    size=16*16*3
    assert len(result.stdout)==size*2
    assert abs(result.stdout[0]-60)<=1
    assert abs(result.stdout[size]-190)<=1
    source=(ROOT/'scripts/render_clock.js').read_text(encoding='utf-8')
    with sync_playwright() as pw:
        browser=pw.chromium.launch(channel='chrome',headless=True)
        page=browser.new_page()
        page.add_init_script(source)
        page.goto('data:text/html,<style>%23box{width:20px;height:20px;background:black;transition:transform 400ms linear}</style><div id="box"></div>')
        page.evaluate('() => __motionRenderClock.tick(0)')
        page.evaluate("() => { box.style.transform='translateX(120px)'; window.testCounts={raf:0,timeout:0,interval:0,cancelled:0}; const raf=()=>{testCounts.raf++;if(testCounts.raf<4)requestAnimationFrame(raf)};requestAnimationFrame(raf);setTimeout(()=>testCounts.timeout++,60);const cancel=setTimeout(()=>testCounts.cancelled++,10);clearTimeout(cancel);window.testInterval=setInterval(()=>testCounts.interval++,30); __motionRenderClock.tick(0); }")
        positions=[]
        for sample in range(1,5):
            page.evaluate('t=>__motionRenderClock.tick(t)',sample*1000/240)
            positions.append(page.evaluate('new DOMMatrixReadOnly(getComputedStyle(box).transform).m41'))
        assert len(set(positions))==4, positions
        assert positions==sorted(positions), positions
        assert page.evaluate('testCounts.raf')==4
        frozen=page.evaluate('performance.now()')
        time.sleep(0.05)
        assert page.evaluate('performance.now()')==frozen
        page.evaluate('() => __motionRenderClock.tick(60)')
        counts=page.evaluate('testCounts')
        assert counts=={'raf':4,'timeout':1,'interval':2,'cancelled':0},counts
        browser.close()
    return {'tmix_disjoint_group_averages':[60,190],'distinct_css_subframe_positions':positions,'js_timer_and_raf_checks':counts,'clock_does_not_advance_with_wall_time':True}


def verify_files():
    report=json.loads((ROOT/'docs/panel-renders-hq.json').read_text(encoding='utf-8'))
    assert len(report['renders'])==9
    ffprobe=shutil.which('ffprobe')
    files=[]
    for entry in report['renders']:
        assert entry['temporal_samples']==entry['output_frames']*4
        assert entry['browser_captures']+entry['identical_static_samples_reused']==entry['temporal_samples']
        animation=Image.open(ROOT/entry['after'])
        assert animation.size==(2120,1120)
        assert animation.n_frames==entry['output_frames']
        # APNG stores exact rational 1/60-second durations, unlike GIF.
        for i in [0,animation.n_frames//2,animation.n_frames-1]:
            animation.seek(i)
            assert abs(animation.info['duration']-1000/60)<0.001
        before=Image.open(ROOT/entry['before'])
        assert before.size==(2120,1120)
        stream=json.loads(subprocess.check_output([ffprobe,'-v','error','-count_frames','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate,nb_read_frames','-of','json',str(ROOT/entry['video'])]))['streams'][0]
        assert stream['r_frame_rate']=='60/1'
        assert int(stream['nb_read_frames'])==entry['output_frames']
        assert not entry['runtime_errors']
        files.append({'component':entry['component'],'frames':entry['output_frames'],'fps':60,'size':[stream['width'],stream['height']]})
    return files


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--engine-only',action='store_true')
    args=parser.parse_args()
    report={'engine':verify_engine()}
    if not args.engine_only:
        report['files']=verify_files()
        (ROOT/'docs/temporal-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
