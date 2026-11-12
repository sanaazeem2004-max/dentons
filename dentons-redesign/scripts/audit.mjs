import { chromium } from 'playwright';
const out = process.argv[2];
const browser = await chromium.launch();
const sizes = { desktop: 1440, tablet: 768, mobile: 390 };
const info = {};
for (const [name, width] of Object.entries(sizes)) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  await page.goto('https://www.dentons.com/en/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(6000);
  // dismiss cookie banner if present
  for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Accept")']) {
    try { await page.locator(sel).first().click({ timeout: 2000 }); break; } catch {}
  }
  // scroll to trigger lazy content
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${out}/original-${name}.png`, fullPage: true });
  await page.screenshot({ path: `${out}/original-${name}-fold.png` });
  const data = await page.evaluate(() => ({
    title: document.title,
    height: document.body.scrollHeight,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    headings: [...document.querySelectorAll('h1,h2,h3')].map(h => h.tagName + ': ' + h.innerText.trim().replace(/\s+/g, ' ')).filter(Boolean).slice(0, 80),
    imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.alt).length,
    imgs: document.querySelectorAll('img').length,
    nav: [...document.querySelectorAll('header a, nav a')].map(a => a.innerText.trim()).filter(Boolean).slice(0, 60),
    fonts: [...new Set([...document.querySelectorAll('h1,h2,p,a')].slice(0, 200).map(e => getComputedStyle(e).fontFamily))],
    colors: [...new Set([...document.querySelectorAll('a,button,h1,h2,header,footer,section')].slice(0, 300).flatMap(e => [getComputedStyle(e).color, getComputedStyle(e).backgroundColor]))].slice(0, 30),
    text: name === 'desktop' ? document.body.innerText.replace(/\n{2,}/g, '\n').slice(0, 9000) : undefined,
  }));
  data.consoleErrors = errors.slice(0, 10);
  info[name] = data;
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(info, null, 1));
