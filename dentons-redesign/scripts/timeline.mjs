// Captures the hero intro animation as a frame sequence (fresh load, no scrolling).
import { chromium } from 'playwright';
const [, , out, w = '1440'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto(process.env.BASE || 'http://localhost:5173', { waitUntil: 'commit' });
const t0 = Date.now(); const frames = [];
for (const t of [350, 800, 1300, 1900, 4500]) {
  await p.waitForTimeout(Math.max(0, t - (Date.now() - t0)));
  frames.push({ t, img: (await p.screenshot({ scale: 'css' })).toString('base64') });
}
await p.screenshot({ path: out.replace('.png', '-final.png') });
const s = await b.newPage({ viewport: { width: 1500, height: 1000 } });
await s.setContent(`<body style="margin:0;background:#111;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font:14px sans-serif;color:#fff">${frames.map(f => `<div><img src="data:image/png;base64,${f.img}" style="width:100%"><div>${f.t} ms</div></div>`).join('')}</body>`);
await s.screenshot({ path: out, fullPage: true });
await b.close();
