import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage();
for (const path of ['services-and-solutions/protect', 'services-and-solutions/operate', 'services-and-solutions/finance', 'insights', 'careers', 'global-solutions', 'global-sectors', 'client-experience', 'about-dentons/news-events-and-awards/news', 'this-page-does-not-exist-xyz']) {
  await p.goto('https://www.dentons.com/en/' + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log(path.padEnd(48), '|', (await p.title()).slice(0, 60), '|', (await p.locator('h1').first().innerText().catch(() => '')).slice(0, 50).replace(/\n/g, ' '));
}
await b.close();
