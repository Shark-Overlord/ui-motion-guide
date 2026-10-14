"""验证真实改造示例，并可选择重新录制 README 图像。

python scripts/verify_demo.py [--record]
依赖：playwright；录制额外需要 Pillow。默认使用已安装的 Google Chrome。
"""
from __future__ import annotations

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import io
import json
from pathlib import Path
import threading
import time

from playwright.sync_api import sync_playwright, expect


ROOT = Path(__file__).resolve().parents[1]


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--record', action='store_true')
    args = parser.parse_args()
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f'http://127.0.0.1:{server.server_port}'
    checks = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(channel='chrome', headless=True)
            page = browser.new_page(viewport={'width': 1080, 'height': 650}, device_scale_factor=1)
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            properties = ['backgroundColor', 'color', 'borderRadius', 'height', 'fontSize', 'fontWeight', 'fontFamily', 'borderTopWidth', 'boxShadow']
            page.goto(base+'/examples/action-button/before.html')
            before = page.locator('button').evaluate('(el, keys) => Object.fromEntries(keys.map(k => [k, getComputedStyle(el)[k]]))', properties)
            page.locator('button').click()
            expect(page.locator('button')).to_have_text('Publish')
            reference = ROOT/'skills/component-motion-tree/assets/style-1/raw_buttons/02_action_button.html'
            assert (ROOT/'examples/action-button/before.html').read_bytes() == reference.read_bytes()
            checks.append('before_matches_original')

            page.goto(base+'/examples/action-button/after.html')
            page.evaluate('document.fonts.ready')
            button = page.locator('#publishButton')
            after = button.evaluate('(el, keys) => Object.fromEntries(keys.map(k => [k, getComputedStyle(el)[k]]))', properties)
            assert before == after, {'before': before, 'after': after}
            checks.append('original_button_visual_properties_preserved')

            button.click()
            expect(button).to_have_attribute('data-state', 'pending')
            expect(button).to_have_attribute('aria-busy', 'true')
            expect(button).to_be_disabled()
            page.evaluate("Promise.all([motionDemo.run('success'), motionDemo.run('error')])")
            assert page.evaluate('motionDemo.calls') == 1
            expect(button).to_have_attribute('data-state', 'success')
            expect(button).to_have_attribute('aria-label', 'Published')
            expect(button).to_have_attribute('aria-busy', 'false')
            expect(button).to_have_attribute('data-state', 'idle', timeout=4000)
            checks.extend(['success_and_reset', 'no_duplicate_task'])

            page.select_option('#outcome', 'error')
            button.focus()
            page.keyboard.press('Enter')
            expect(button).to_have_attribute('data-state', 'pending')
            expect(button).to_have_attribute('data-state', 'error')
            expect(button).to_be_enabled()
            expect(page.locator('#status')).to_contain_text('失败')
            page.select_option('#outcome', 'success')
            button.click()
            expect(button).to_have_attribute('data-state', 'success')
            checks.extend(['keyboard_activation', 'error_and_retry'])

            page.evaluate("motionDemo.reset(); motionDemo.run('success'); motionDemo.reset()")
            page.wait_for_timeout(1500)
            expect(button).to_have_attribute('data-state', 'idle')
            page.evaluate("motionDemo.run('success')")
            expect(button).to_have_attribute('data-state', 'success')
            page.evaluate("motionDemo.reset(); motionDemo.run('error')")
            expect(button).to_have_attribute('data-state', 'error')
            page.wait_for_timeout(1400)
            expect(button).to_have_attribute('data-state', 'error')
            checks.extend(['cancelled_callback_cannot_restore_old_state', 'old_success_reset_cannot_override_error'])

            page.emulate_media(reduced_motion='reduce')
            page.evaluate('motionDemo.reset()')
            button.click()
            expect(button).to_have_attribute('data-state', 'pending')
            assert page.locator('.spinner').evaluate('el => getComputedStyle(el).animationName') == 'none'
            assert page.locator('.label-slot').evaluate('el => getComputedStyle(el).transitionDuration') == '0s'
            expect(button).to_have_attribute('data-state', 'success')
            checks.append('reduced_motion_preserves_state_without_animation')

            page.emulate_media(reduced_motion='no-preference')
            page.goto(base+'/examples/action-button/index.html')
            after_frame = page.frame_locator('#afterFrame')
            page.locator('#failure').click()
            expect(after_frame.locator('#publishButton')).to_have_attribute('data-state', 'error')
            page.locator('#reset').click()
            expect(after_frame.locator('#publishButton')).to_have_attribute('data-state', 'idle')
            page.set_viewport_size({'width': 390, 'height': 844})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            checks.extend(['comparison_controls_work', 'mobile_no_horizontal_overflow'])

            if args.record:
                from PIL import Image
                directory = ROOT/'docs/images'
                directory.mkdir(parents=True, exist_ok=True)
                page.set_viewport_size({'width': 1080, 'height': 650})
                page.reload()
                frame = next(f for f in page.frames if '/after.html' in f.url)
                frame.wait_for_function("window.motionDemo && motionDemo.state === 'idle'")
                comparison = page.locator('#motionComparison')
                assert comparison.inner_text().split() == ['Before', 'After']
                clip = comparison.bounding_box()
                page.screenshot(path=str(directory/'action-button-before-after.png'), clip=clip)
                images, durations = [], []
                def capture():
                    images.append(Image.open(io.BytesIO(page.screenshot(clip=clip))).convert('RGB'))
                capture()
                durations.append(600)
                page.locator('#success').click()
                start = time.monotonic()
                while time.monotonic() - start < 4.1:
                    mark = time.monotonic()
                    capture()
                    page.wait_for_timeout(65)
                    durations.append(max(30, round((time.monotonic()-mark)*1000 / 10)*10))
                images[0].save(directory/'action-button-motion.gif', save_all=True, append_images=images[1:], duration=durations, loop=0, optimize=False)
                page.locator('#reset').click()
                page.locator('#failure').click()
                expect(after_frame.locator('#publishButton')).to_have_attribute('data-state', 'error')
                page.wait_for_timeout(350)
                page.screenshot(path=str(directory/'action-button-error.png'), clip=clip)
                checks.append('browser_captured_png_and_gif')
            assert not errors, errors
            checks.append('no_browser_runtime_errors')
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    report = {'browser': 'Google Chrome / Playwright', 'checks_passed': checks, 'count': len(checks), 'demo_scope': 'Local Promise simulation; no real publishing API'}
    print(json.dumps(report, ensure_ascii=False, indent=2))
    (ROOT/'docs/demo-verification.json').write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')


if __name__ == '__main__':
    main()
