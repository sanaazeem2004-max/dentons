// Collects every unique outbound link on the page and checks it resolves.
import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
const p = await ctx.newPage();
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });
const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.href))]);
const internal = hrefs.filter((h) => h.includes('localhost'));
const external = hrefs.filter((h) => !h.includes('localhost'));
const bad = [];
await Promise.all(external.map(async (h) => {
  try {
    const r = await ctx.request.get(h, { timeout: 45000, maxRedirects: 5 });
    if (r.status() >= 400) bad.push(`${r.status()} ${h}`);
  } catch (e) { bad.push(`ERR ${h} ${e.message.split('\n')[0]}`); }
}));
// in-page anchors must exist
for (const h of internal) { const id = new URL(h).hash.slice(1); if (id && !(await p.$('#' + id))) bad.push('Missing anchor ' + h); }
console.log(`Checked ${external.length} external + ${internal.length} in-page links`);
console.log(bad.length ? bad.join('\n') : 'All links OK');
await b.close();
