import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
const [, , src, out, w = '1400'] = process.argv;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto(src.startsWith('http') ? src : pathToFileURL(src).href); await p.waitForTimeout(1500);
await p.screenshot({ path: out, fullPage: true }); await b.close();
