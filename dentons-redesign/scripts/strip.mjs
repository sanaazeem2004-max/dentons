// Captures a page as several stitched viewport-height strips side by side for review.
import { chromium } from 'playwright';
const [, , w, out, from = '0', count = '6', h = '844'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });
const imgs = [];
for (let i = 0; i < +count; i++) {
  const y = +from + i * +h;
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(1600);
  imgs.push((await p.screenshot()).toString('base64'));
}
const sheet = await b.newPage({ viewport: { width: (+w + 10) * imgs.length, height: +h } });
await sheet.setContent(`<body style="margin:0;display:flex;gap:10px;background:#f0f">${imgs.map((d) => `<img src="data:image/png;base64,${d}">`).join('')}</body>`);
await sheet.screenshot({ path: out });
await b.close();
