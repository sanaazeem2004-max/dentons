// Playwright QA: full-page screenshots, overflow, broken images, console errors, interactions.
import { chromium } from 'playwright';
const BASE = process.argv[2] || 'http://localhost:5173';
const OUT = process.argv[3] || '../screenshots/after';
const sizes = { desktop: 1440, tablet: 768, mobile: 390 };
const b = await chromium.launch();
const report = {};
for (const [name, width] of Object.entries(sizes)) {
  const page = await b.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('requestfailed', (r) => errors.push('REQ FAIL ' + r.url()));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/redesign-${name}-fold.png` });
  // scroll through so whileInView reveals + lazy images fire
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => ({
    height: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth - window.innerWidth,
    wideEls: [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 5).map((e) => e.tagName + '.' + String(e.className).slice(0, 60)),
    brokenImgs: [...document.images].filter((i) => i.offsetParent !== null && (!i.complete || i.naturalWidth === 0)).map((i) => i.src),
    imgCount: document.images.length,
    links: [...document.querySelectorAll('a[href]')].length,
    emptyLinks: [...document.querySelectorAll('a')].filter((a) => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
    noAccessibleName: [...document.querySelectorAll('a,button')].filter((e) => !(e.innerText.trim() || e.getAttribute('aria-label'))).length,
    h1: document.querySelectorAll('h1').length,
  }));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/redesign-${name}.png`, fullPage: true });
  report[name] = { ...r, errors };
  await page.close();
}
await b.close();
console.log(JSON.stringify(report, null, 1));
