# Dentons Homepage Redesign

A redesign concept for the homepage at https://www.dentons.com/en/, built with React 19, Vite, Tailwind CSS v4, Framer Motion and Lucide React. It was tested with Playwright.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

QA scripts are in `scripts/`. Run them while the dev server is running:

| Script | Purpose |
| --- | --- |
| `node scripts/test.mjs` | Takes full-page screenshots at 1440, 768 and 390 px. Checks horizontal overflow, broken images, console errors and unnamed controls. |
| `node scripts/interactions.mjs <outDir>` | Runs 21 interaction checks: mega-menu, language menu, search, sticky header, tabs and filter, map, people search, mobile menu, reduced motion. |
| `node scripts/links.mjs` | Collects every outbound link and checks that it resolves. |
| `node scripts/audit.mjs <outDir>` | Takes screenshots of the live dentons.com homepage and runs an audit. |
| `node scripts/gen-map.mjs` | Regenerates `src/data/worldMap.json` (dot-matrix map and office pins). |

---

## 1. Audit of the current homepage

The current homepage was inspected with Playwright at 1440, 768 and 390 px. Screenshots are in `../screenshots/before/`.

| Existing problem | Why it matters | What the redesign does |
| --- | --- | --- |
| Main navigation shows only 4 items. Practices, Insights, Global Presence, Careers and Contact are hidden behind a hamburger menu, even on desktop. | Key destinations are hard to find, and there is no visible contact button. | A full desktop nav with mega-menus, plus visible Search, Language and **Contact Us** controls. On small screens, a slide-in menu with accordions. |
| The hero is a rotating carousel with a generic grass photo. The headline is small for the space it occupies. | The first impression doesn't say "global law firm", and carousels are easy to ignore. | A single editorial hero: a large headline, architectural photography and a purple action band showing scale (176 offices, 88 countries). |
| Grow, Protect, Operate and Finance appear as small colored tabs overlapping the hero. | This is the firm's core framework, yet it reads as an afterthought. | A dedicated section with expanding image panels: hover expands each panel to show its description and a link. |
| Six identical grey cards with identical purple buttons, some with off-topic abstract images (a butterfly for supply chain). | The repetition flattens hierarchy, and nothing tells the reader what matters most. | An editorial layout: one feature story, two side stories and a row of three, each with a category label and a relevant photo. |
| News uses the same card grid. The lead story has no image and no link. No dates are shown, and "Load more" sits at the bottom. | It doesn't read like news. | A magazine layout: a lead story, a numbered list with region and date labels, and "View all news". |
| The homepage has no global presence visual and no firm statistics. | Scale is Dentons' main differentiator, and the homepage never shows it. | An interactive dot-matrix world map with 87 real office cities, region filters, tooltips and count-up statistics. |
| No people search on the homepage. | "Find a lawyer" is a top task for law-firm visitors. | A search by name, country and practice that deep-links to Dentons' real people search. |
| Accessibility: 12 empty `<h2>`/`<h3>` headings, and 24 of 44 images without `alt` text. | Screen-reader users get a broken outline. | One `h1`, a clean heading outline, alt text or `aria-hidden` on every image, a skip link, visible focus states and reduced-motion support. |
| The footer contains only legal links. | No sitemap, so users who reach the bottom have nowhere to go. | A structured footer: Practices, Industries, Insights and Firm columns, contact links, social links, all the legal links, and the copyright notice. |
| Card body text is around 12 px, and the mobile page is a long stack of identical cards. | Hard to read and scan on mobile. | Body text is 15–17 px. Layouts change per breakpoint: stacked capability cards, horizontal insight cards on tablet, compact news rows. |

**Kept:** the Grow/Protect/Operate/Finance framework, the language selector (all 7 languages), the brand purple `#702082`, every featured insight and news story, the "world's largest global law firm" positioning, and every legal and footer link.

## 2. Design direction

- **Reference:** the dark editorial layout supplied in `../refernce/`: rounded inset panels, a pill-shaped nav with a white active pill, a hero photo with a purple CTA band, image cards with circular arrow chips, and a numbered list (used here for Practices).
- **Color:** a near-black ink background (`#0d0c10`) with layered panels (`#16141a` / `#1f1c24`). Dentons purple `#702082` is the action color, and lighter purple tints are used for accents on dark backgrounds.
- **Type:** Inter Tight (light weight, tight tracking) for large headlines, plus *Instrument Serif* italic for one accent phrase per headline, for an editorial feel.
- **Alignment:** one shared content line. `--pad` (20 / 32 / 40 / 48 px by breakpoint) sets the inset, content is capped at 1440px on wide screens, and content inside inset panels subtracts the panel gutter. The header logo, hero headline and every section therefore start at exactly the same x position at every width (checked by `scripts/align.mjs`). The hero runs full-bleed, with rounded bottom corners only.
- **Hero animation:** the headline reveals word by word (rise, blur-out and slight rotation). An accent line draws in before the eyebrow text. The paragraph and buttons fade up from a blur. The buttons are magnetic and the primary button shows a light sweep on hover. The chips stagger in and then float gently. The purple band's cells rise in sequence, a light sweep passes across the band, and 176 and 88 count up. The photo zooms in on load, then drifts slowly (Ken Burns), follows the pointer with spring parallax, and moves with scroll parallax. A purple spotlight follows the cursor. The hero content lifts and fades as you scroll away.
- **Page-wide animation:** section headings reveal word by word, large feature images open with a curtain reveal, and a thin purple progress bar tracks reading position.
- **Motion:** used sparingly. Text reveals once on scroll, the hero image eases in with gentle parallax, the nav pill and tab pill slide between items, the capability panels expand, the practice preview crossfades, map pins pulse, and stats count up. With reduced motion on, all transform animations are switched off through `MotionConfig reducedMotion="user"`, a CSS media query and the Hero/CountUp hooks.

## 3. Structure

```
src/
  App.jsx                    page composition + MotionConfig
  index.css                  Tailwind v4 theme tokens + shared component classes
  data/content.js            all copy, figures and links (sourced from dentons.com)
  data/worldMap.json         generated dot map + office pins
  components/
    Navbar.jsx               sticky header, mega-menus, language menu, mobile menu
    SearchOverlay.jsx        site search (press "/" anywhere), people-search handoff
    Hero.jsx
    Capabilities.jsx         Grow / Protect / Operate / Finance
    PracticeAreas.jsx        tabbed, filterable practices & industries
    GlobalPresence.jsx       interactive world map + stats
    Insights.jsx
    LatestNews.jsx
    OurPeople.jsx            find-a-lawyer form
    ContactCTA.jsx
    Footer.jsx
    ui.jsx                   Logo, Reveal, SectionHeader, PillLink, CountUp, social icons
public/img/                  locally hosted, optimised WebP photography (Unsplash)
```

## 4. Content accuracy

- **Figures:** 12,000+ lawyers and professionals, 176 offices, 88 countries. The office and country counts come from the live Global Presence search ("See our 176 offices and 88 countries"), checked November 2026. The brief's figure of "5,900+ lawyers" could not be verified, so it is not used.
- **Map pins:** 87 cities, all taken from the official Global Presence office list. The country lists per region match that page (Russia is excluded, as the site marks it as a team serving clients from other countries).
- **Insights and news:** the exact titles, summaries, labels and URLs from the live homepage. Dates appear only where the source gives one.
- **People section:** stock portraits are used as unnamed illustrative photography. No lawyer names or credentials are invented.
- **Links:** all 38 outbound links were checked with Playwright and resolve (LinkedIn returns 403 to automated requests but is Dentons' own link). Practice and industry items link to the official Global Solutions and Global Sectors pages, because per-practice URLs were not verified.

## 5. Test results

| Check | 1440 | 768 | 390 |
| --- | --- | --- | --- |
| Horizontal overflow | 0 px | 0 px | 0 px |
| Broken images | 0 | 0 | 0 |
| Console / page errors | 0 | 0 | 0 |
| Links/buttons without an accessible name | 0 | 0 | 0 |

21 of 21 interaction checks pass (see `../screenshots/after/interaction-results.txt`). The production build succeeds.

## 6. Deployment

Not deployed: no Vercel or Netlify credentials are configured on this machine. The site deploys as-is to either service (build command `npm run build`, output `dist/`). Because this is an unofficial redesign that carries Dentons' branding, keep any public deployment private or password-protected unless Dentons has approved it.
