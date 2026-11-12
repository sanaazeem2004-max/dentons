// Interaction tests for navigation, search, filters and forms.
import { chromium } from 'playwright';
const OUT = process.argv[2];
const b = await chromium.launch();
const results = [];
const check = (name, ok, extra = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? '  — ' + extra : ''}`);

// Desktop
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('http://localhost:5173', { waitUntil: 'networkidle' });

await p.getByRole('button', { name: 'Practices' }).hover();
await p.waitForTimeout(600);
check('Mega menu opens on hover', await p.getByText('Disputes & Regulatory').isVisible());
await p.screenshot({ path: `${OUT}/ix-megamenu.png` });
await p.getByRole('button', { name: 'Insights' }).hover(); await p.waitForTimeout(500);
check('Mega menu switches to Insights', await p.getByText('Reports, trackers and thought leadership').isVisible());
await p.keyboard.press('Escape'); await p.mouse.move(700, 600); await p.waitForTimeout(600);
check('Mega menu closes', !(await p.getByText('Reports, trackers and thought leadership').isVisible()));

await p.getByRole('button', { name: 'Select language and location' }).click(); await p.waitForTimeout(400);
check('Language dropdown lists 7 languages', (await p.getByRole('listbox').getByRole('option').count()) === 7);
check('French link targets dentons.com/fr', (await p.getByRole('option', { name: /France/ }).locator('a').getAttribute('href')) === 'https://www.dentons.com/fr');
await p.keyboard.press('Escape');

await p.getByRole('button', { name: 'Search', exact: true }).click(); await p.waitForTimeout(500);
await p.locator('#site-search').fill('energy'); await p.waitForTimeout(300);
const n = await p.locator('[aria-label="Site search"] ul li a').count();
check('Search returns results for "energy"', n > 1, `${n} links`);
await p.screenshot({ path: `${OUT}/ix-search.png` });
await p.keyboard.press('Escape'); await p.waitForTimeout(900);
check('Search closes with Escape', !(await p.locator('#site-search').isVisible()));
await p.keyboard.press('/'); await p.waitForTimeout(400);
check('"/" shortcut opens search', await p.locator('#site-search').isVisible());
await p.keyboard.press('Escape');

await p.mouse.wheel(0, 1200); await p.waitForTimeout(700);
check('Header becomes sticky/solid on scroll', /bg-ink\/80/.test(await p.locator('header').getAttribute('class')));

await p.locator('#practices').scrollIntoViewIfNeeded();
await p.getByRole('tab', { name: /Industries/ }).click(); await p.waitForTimeout(600);
check('Industries tab shows 6 items', (await p.locator('#practice-panel ul > li').count()) === 6);
await p.getByRole('tab', { name: /Practices/ }).click(); await p.waitForTimeout(600);
await p.locator('#practice-search').fill('tax'); await p.waitForTimeout(700);
check('Practice filter "tax" narrows list', (await p.locator('#practice-panel ul > li').count()) === 1);
await p.locator('#practice-search').fill('zzz'); await p.waitForTimeout(700);
check('Empty state shows for no match', await p.getByText(/No practices match/).isVisible());
await p.locator('#practice-search').fill('');

await p.locator('#global-presence').scrollIntoViewIfNeeded();
await p.getByRole('button', { name: 'Asia Pacific' }).click(); await p.waitForTimeout(700);
check('Region filter shows Asia Pacific countries', await p.getByText('13 countries').isVisible());
await p.getByRole('button', { name: 'Singapore, Singapore' }).hover(); await p.waitForTimeout(400);
await p.evaluate(() => window.scrollBy(0, 150)); await p.getByRole('button', { name: 'Singapore, Singapore' }).hover(); await p.waitForTimeout(500);
await p.screenshot({ path: `${OUT}/ix-map.png` });
check('Map tooltip appears on hover', await p.locator('#global-presence').getByText('Singapore').first().isVisible());

await p.locator('#people').scrollIntoViewIfNeeded();
await p.locator('#lawyer-name').fill('Smith');
await p.locator('#lawyer-location').selectOption('Canada');
const [popup] = await Promise.all([ctx.waitForEvent('page'), p.getByRole('button', { name: 'Find a Lawyer' }).click()]);
const target = popup.url(); await popup.close();
check('Find a Lawyer opens Dentons people search', target.includes('our-professionals') && decodeURIComponent(target).includes('Keywords=Smith Canada'), target.slice(0, 110));

check('No console/page errors (desktop)', errs.length === 0, errs.join(' | '));
await ctx.close();

// Mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await m.getByRole('button', { name: 'Open menu' }).click(); await m.waitForTimeout(700);
check('Mobile menu opens', await m.getByRole('dialog', { name: 'Main menu' }).isVisible());
await m.getByRole('dialog').getByRole('button', { name: 'Practices', exact: true }).click(); await m.waitForTimeout(600);
check('Mobile accordion expands Practices', await m.getByRole('dialog').getByText('Corporate and M&A').isVisible());
await m.screenshot({ path: `${OUT}/ix-mobile-menu.png` });
await m.getByRole('button', { name: 'Close menu' }).click(); await m.waitForTimeout(700);
check('Mobile menu closes', !(await m.getByRole('dialog', { name: 'Main menu' }).isVisible()));
await m.getByRole('link', { name: /Explore Our Capabilities/ }).click(); await m.waitForTimeout(1200);
const y = await m.evaluate(() => document.querySelector('#capabilities').getBoundingClientRect().top);
check('Hero CTA scrolls to capabilities', Math.abs(y) < 140, `top=${Math.round(y)}`);

// Reduced motion
const rm = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await rm.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await rm.waitForTimeout(1500);
const op = await rm.evaluate(() => getComputedStyle(document.querySelector('#hero-title span span')).transform);
check('Reduced motion: hero headline not transformed', op === 'none' || op === 'matrix(1, 0, 0, 1, 0, 0)', op);
await b.close();
console.log(results.join('\n'));
