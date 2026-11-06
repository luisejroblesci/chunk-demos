// Usage: node record.mjs <demo-name>   e.g. node record.mjs 01-factory-overview
// Runs web/demos/<demo-name>.mjs while recording, then converts to a Slack-ready MP4:
//   out/web-<demo-name>.mp4  (H.264, yuv420p, faststart, no audio, 1920x1080)
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const name = process.argv[2];
if (!name) { console.error('usage: node record.mjs <demo-name>'); process.exit(1); }

const SIZE = { width: 1920, height: 1080 };
const outDir = path.join(here, '..', 'out');
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), 'chunk-web-'));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: SIZE,
  recordVideo: { dir: tmp, size: SIZE },
  storageState: path.join(here, '.auth', 'state.json'),
});
const page = await ctx.newPage();

// Fake cursor: headless video has no pointer, so draw one.
await ctx.addInitScript(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const c = document.createElement('div');
    c.style.cssText = 'position:fixed;z-index:2147483647;width:20px;height:20px;border-radius:50%;' +
      'background:rgba(255,255,255,.9);border:2px solid #161616;box-shadow:0 0 0 3px rgba(0,0,0,.2);' +
      'pointer-events:none;transform:translate(-50%,-50%);left:-50px;top:-50px;transition:left .05s,top .05s';
    document.body.appendChild(c);
    document.addEventListener('mousemove', e => { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }, true);
  });
});

// Helpers shared by demos (mirror VHS: Sleep / Type / click).
let mx = 960, my = 540;
const helpers = {
  sleep: ms => page.waitForTimeout(ms),
  type: (text, delay = 60) => page.keyboard.type(text, { delay }),
  async click(locator) {
    const box = await locator.boundingBox();
    if (box) { mx = box.x + box.width / 2; my = box.y + box.height / 2; await page.mouse.move(mx, my, { steps: 25 }); }
    await page.waitForTimeout(300);
    await locator.click();
  },
};

try {
  const demo = await import(path.join(here, 'demos', `${name}.mjs`));
  await demo.run(page, helpers);
  await page.waitForTimeout(1000);
} finally {
  await ctx.close(); // flushes the video
  await browser.close();
}

const webm = readdirSync(tmp).find(f => f.endsWith('.webm'));
const out = path.join(outDir, `web-${name}.mp4`);
execFileSync('ffmpeg', ['-y', '-i', path.join(tmp, webm),
  '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', out], { stdio: 'inherit' });
rmSync(tmp, { recursive: true, force: true });
console.log('Wrote', out);
