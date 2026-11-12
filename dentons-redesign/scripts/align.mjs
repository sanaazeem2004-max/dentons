// Verifies that header, hero and every section share the same left content edge.
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [1440, 1920, 1024, 768, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
  await p.waitForTimeout(3000);
  const xs = await p.evaluate(() => {
    const L = (sel) => { const e = document.querySelector(sel); if (!e) return null; const s = getComputedStyle(e); return Math.round(e.getBoundingClientRect().left + parseFloat(s.paddingLeft)); };
    return {
      logo: Math.round(document.querySelector('header a[aria-label="Dentons home"]').getBoundingClientRect().left),
      h1: Math.round(document.querySelector('#hero-title').getBoundingClientRect().left),
      heroLeftGap: Math.round(document.querySelector('#top > div').getBoundingClientRect().left),
      ...Object.fromEntries(['#capabilities', '#practices', '#global-presence', '#insights', '#news', '#people', '#contact', '#footer'].map(s => [s, L(s + ' .container-x')])),
    };
  });
  console.log(w, JSON.stringify(xs));
  if (w === 1440) {
    await p.screenshot({ path: '../screenshots/after/redesign-desktop-fold.png' });
  }
  await p.close();
}
await b.close();
