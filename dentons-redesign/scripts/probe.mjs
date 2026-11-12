import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' }); await p.waitForTimeout(4000);
console.log(await p.evaluate(() => {
  const chain = []; let e = document.querySelector('#hero-title');
  while (e && e !== document.body) { const s = getComputedStyle(e); if (s.opacity !== '1' || s.filter !== 'none') chain.push(`${e.tagName}.${String(e.className).slice(0, 40)} op=${s.opacity} filter=${s.filter}`); e = e.parentElement; }
  const btn = document.querySelector('a[href="#capabilities"].btn-light'); const bs = getComputedStyle(btn);
  return { scrollY, chain, btnBg: bs.backgroundColor, btnParentOp: getComputedStyle(btn.parentElement.parentElement).opacity, h1Color: getComputedStyle(document.querySelector('#hero-title span span span')).color };
}));
await b.close();
