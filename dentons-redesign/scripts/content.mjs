import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.dentons.com/en/', { waitUntil: 'domcontentloaded', timeout: 90000 });
await page.waitForTimeout(6000);
const d = await page.evaluate(() => {
  const main = document.body;
  return {
    text: main.innerText.replace(/\n{2,}/g, '\n').slice(0, 8000),
    links: [...main.querySelectorAll('a')].map(a => `${a.innerText.trim().replace(/\s+/g,' ').slice(0,120)} => ${a.href}`).filter(s => !s.startsWith(' =>')).slice(0, 120),
    imgs: [...main.querySelectorAll('img')].map(i => i.src).slice(0, 50),
  };
});
console.log(d.text, '\n----LINKS\n', d.links.join('\n'), '\n----IMGS\n', d.imgs.join('\n'));
await browser.close();
