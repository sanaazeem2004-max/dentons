import { chromium } from 'playwright';
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('https://www.dentons.com/en/our-professionals', { waitUntil: 'domcontentloaded', timeout: 90000 });
await p.waitForTimeout(5000);
console.log(await p.evaluate(() => [...document.querySelectorAll('form, input, select')].slice(0, 15).map(e => `${e.tagName} name=${e.name} id=${e.id} action=${e.action || ''} ph=${e.placeholder || ''}`).join('\n')));
const inp = p.locator('input[type=text]:visible, input[type=search]:visible').first();
try { await inp.fill('Smith'); await inp.press('Enter'); await p.waitForTimeout(5000); console.log('URL after search:', p.url()); } catch (e) { console.log('search err', e.message); }
await b.close();
