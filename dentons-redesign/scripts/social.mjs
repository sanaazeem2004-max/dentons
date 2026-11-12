import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('https://www.dentons.com/en/', { waitUntil: 'domcontentloaded', timeout: 90000 }); await p.waitForTimeout(4000);
console.log(await p.evaluate(() => [...document.querySelectorAll('footer a, .footer a, a')].map(a => a.href).filter(h => /linkedin|twitter|x\.com|youtube|instagram|facebook|wechat|mailto|subscribe|rss|careers/i.test(h)).join('\n')));
await b.close();
