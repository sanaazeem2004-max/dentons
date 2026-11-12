import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
for (const u of ['https://www.dentons.com/en/about-dentons', 'https://www.dentons.com/en/global-presence']) {
  try {
    await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(5000);
    const t = await page.evaluate(() => document.body.innerText.replace(/\n{2,}/g, '\n'));
    console.log('=====', u, '\n', t.split('\n').filter(l => !/cookie/i.test(l)).join('\n').slice(0, 7000));
  } catch (e) { console.log('ERR', u, e.message); }
}
await browser.close();
