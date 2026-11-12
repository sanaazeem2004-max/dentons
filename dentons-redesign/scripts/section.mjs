// Usage: node scripts/section.mjs <width> <outDir> <selector...>
import { chromium } from 'playwright';
const [, , w, out, ...sels] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });
for (const s of sels) {
  await p.locator(s).first().scrollIntoViewIfNeeded();
  await p.evaluate((s) => { const el = document.querySelector(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - (s.includes(" ") ? 500 : 20)); }, s);
  await p.waitForTimeout(2800);
  await p.screenshot({ path: `${out}/${w}-${s.replace(/[^a-z]/gi, '')}.png` });
}
await b.close();
