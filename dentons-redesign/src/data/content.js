// All copy, figures and links below are taken from https://www.dentons.com/en/
// (homepage, /about-dentons and /global-presence) as inspected in November 2026.

export const SITE = 'https://www.dentons.com'
export const url = (path) => `${SITE}/en${path}`

export const STATS = [
  { value: 12000, suffix: '+', label: 'Lawyers and professionals' },
  { value: 176, suffix: '', label: 'Offices worldwide' },
  { value: 88, suffix: '', label: 'Countries' },
]

export const LANGUAGES = [
  { code: 'EN', label: 'English', href: `${SITE}/en` },
  { code: 'IT', label: 'Italiano', href: `${SITE}/it` },
  { code: 'FR', label: 'Français (France)', href: `${SITE}/fr` },
  { code: 'FR-CA', label: 'Français (Canada)', href: `${SITE}/fr-ca` },
  { code: 'ES', label: 'Español', href: `${SITE}/es` },
  { code: 'DE', label: 'Deutsch', href: `${SITE}/de` },
  { code: 'PL', label: 'Polski', href: `${SITE}/pl` },
]

export const CAPABILITIES = [
  {
    key: 'grow',
    title: 'Grow',
    image: '/img/city-aerial.webp',
    summary: 'Expansion, investment, mergers and acquisitions, and strategic growth.',
    description:
      'Support for businesses entering new markets, raising and deploying capital, and completing transformational M&A—across borders and at speed.',
    href: url('/services-and-solutions/grow'),
  },
  {
    key: 'protect',
    title: 'Protect',
    image: '/img/gavel.webp',
    summary: 'Litigation, regulatory challenges, risk, compliance and business protection.',
    description:
      'Help managing disputes, investigations and regulatory scrutiny, so you can safeguard your people, assets, reputation and bottom line.',
    href: url('/services-and-solutions/protect'),
  },
  {
    key: 'operate',
    title: 'Operate',
    image: '/img/team3.webp',
    summary: 'Employment, technology, commercial agreements and regulatory requirements.',
    description:
      'Practical, everyday counsel that keeps your organization running—from workforce and data to contracts and the rules that govern your sector.',
    href: url('/services-and-solutions/operate'),
  },
  {
    key: 'finance',
    title: 'Finance',
    image: '/img/chart.webp',
    summary: 'Banking, capital markets, private equity and financial transactions.',
    description:
      'Legal expertise across lending, debt and equity capital markets, funds and structured transactions for borrowers, lenders and investors.',
    href: url('/services-and-solutions/finance'),
  },
]

export const PRACTICES = [
  { name: 'Corporate and M&A', image: '/img/handshake.webp', blurb: 'Cross-border transactions, joint ventures and corporate governance.' },
  { name: 'Banking and Finance', image: '/img/money.webp', blurb: 'Lending, restructuring and structured finance for lenders and borrowers.' },
  { name: 'Litigation and Dispute Resolution', image: '/img/gavel.webp', blurb: 'Commercial litigation, arbitration and class and collective actions.' },
  { name: 'Employment and Labor', image: '/img/meeting2.webp', blurb: 'Workforce strategy, employment disputes and labor relations.' },
  { name: 'Competition and Antitrust', image: '/img/signing.webp', blurb: 'Merger control, investigations and competition compliance.' },
  { name: 'Intellectual Property and Technology', image: '/img/circuit.webp', blurb: 'Patents, trademarks, licensing and technology transactions.' },
  { name: 'Tax', image: '/img/documents.webp', blurb: 'Tax-efficient structuring, controversy and international tax planning.' },
  { name: 'Real Estate', image: '/img/glass.webp', blurb: 'Acquisitions, development, leasing and real estate finance.' },
  { name: 'Energy', image: '/img/solar.webp', blurb: 'Power, renewables, oil and gas, and the energy transition.' },
  { name: 'Privacy and Cybersecurity', image: '/img/cyber.webp', blurb: 'Data protection, incident response and cyber resilience.' },
].map((p) => ({ ...p, href: url('/global-solutions') }))

export const INDUSTRIES = [
  { name: 'Financial Institutions', image: '/img/nyc.webp', blurb: 'Banks, insurers, asset managers and fintech businesses.' },
  { name: 'Energy', image: '/img/pylons.webp', blurb: 'Generation, transmission and the transition to a low-carbon economy.' },
  { name: 'Technology, Media and Telecommunications', image: '/img/team-laptops.webp', blurb: 'From high-growth start-ups to global platforms and networks.' },
  { name: 'Healthcare and Life Sciences', image: '/img/lab.webp', blurb: 'Pharma, biotech, medtech and healthcare providers.' },
  { name: 'Real Estate', image: '/img/hero.webp', blurb: 'Investors, developers, lenders and occupiers.' },
  { name: 'Transportation and Infrastructure', image: '/img/containers.webp', blurb: 'Ports, aviation, rail, roads and logistics.' },
].map((p) => ({ ...p, href: url('/global-sectors') }))

// Featured content on the live Dentons homepage (Nov 2026)
export const INSIGHTS = [
  {
    category: 'New release',
    title: 'From AI Adoption to AI Advantage report',
    excerpt:
      'AI adoption is accelerating. But what does good actually look like? The report goes beyond whether legal teams are using AI to share firsthand accounts of how they are using it, what is working and what others can learn.',
    date: 'October 23, 2026',
    image: '/img/circuit.webp',
    cta: 'Explore the report',
    href: url('/insights/guides-reports-and-whitepapers/2026/october/23/from-ai-adoption-to-ai-advantage'),
  },
  {
    category: 'Report',
    title: 'Global supply chain disruption report',
    excerpt:
      'A sector-by-sector assessment of the supply chain implications of recent geopolitical disruption, focused on legal risk, contractual exposure, regulatory pressure and resilience.',
    date: 'Analysis: April 2026',
    image: '/img/containers.webp',
    cta: 'Learn more',
    href: url('/services-and-solutions/digital-solutions/all-knowledge-hubs/global-trade-and-legal-risk'),
  },
  {
    category: 'New',
    title: 'Register now for our CX webinar program',
    excerpt:
      'Complimentary 45-minute sessions for General Counsel and in-house teams on the leadership, business and legal challenges shaping the GC agenda.',
    image: '/img/meeting2.webp',
    cta: 'Explore more',
    href: url('/client-experience/webinar-insights-program'),
  },
  {
    category: 'New',
    title: 'Global class and collective actions',
    excerpt:
      'Insights, credentials and our latest global trends report on the expanding class action and collective redress landscape across jurisdictions.',
    image: '/img/documents.webp',
    cta: 'Visit the hub',
    href: url('/services-and-solutions/global-class-and-collective-actions'),
  },
  {
    category: 'Opportunity',
    title: 'Ukraine transformation and rebuild',
    excerpt:
      'Our Ukrainian team continues to work with international clients investing in Ukraine. Follow our videos, podcasts and up-to-date legal and market insights.',
    image: '/img/pylons.webp',
    cta: 'Learn more',
    href: url('/Ukraine-transformation-and-rebuild'),
  },
  {
    category: 'Finance',
    title: 'Global tax guide to doing business in…',
    excerpt:
      'A high-level overview of the tax consequences facing businesses planning to expand their international operations.',
    image: '/img/money.webp',
    cta: 'Access now',
    href: url('/services-and-solutions/global-tax-guide-to-doing-business-in'),
  },
]

const NEWS_BASE = url('/about-dentons/news-events-and-awards/news/2026/november')
export const NEWS = [
  {
    region: 'Global',
    date: 'November 2026',
    title: 'Dentons appoints new Global Practice Leaders to enhance the global client experience',
    excerpt:
      'Appointed by the Firm’s Global Management Committee, the new global practice leaders will work closely with Dentons’ global sector leaders and teams to deepen collaboration and deliver an enhanced client experience.',
    image: '/img/team-meeting.webp',
    href: `${NEWS_BASE}/dentons-appoints-new-global-practice-leaders-to-enhance-the-global-client-experience`,
  },
  {
    region: 'United States',
    date: 'November 2026',
    title: 'Dentons advises Tractian on US$130 million Series D, achieving US$1.4 billion unicorn valuation',
    excerpt: 'Dentons advised Tractian, a global AI and industrial automation company, on its US$130 million Series D financing.',
    image: '/img/workspace.webp',
    href: `${NEWS_BASE}/dentons-advises-tractian`,
  },
  {
    region: 'Slovakia',
    date: 'November 2026',
    title: 'Dentons advises financing banks on Logis One Park Košice development',
    excerpt: 'A club of banks led by Slovenská sporiteľňa, a.s. on portfolio development financing for a major industrial and logistics development.',
    image: '/img/office.webp',
    href: `${NEWS_BASE}/dentons-advises-financing-banks-on-logis-one-park-kosice-development`,
  },
  {
    region: 'United Kingdom, Romania',
    date: 'November 2026',
    title: 'Dentons advises Electrica on the establishment of its €1 billion bond issuance programme',
    excerpt: 'Advising Societatea Energetică Electrica S.A. on its €1 billion Euro Medium-Term Note (EMTN) programme.',
    image: '/img/pylons.webp',
    href: `${NEWS_BASE}/dentons-advises-electrica`,
  },
  {
    region: 'South Korea',
    date: 'November 2026',
    title: 'Dentons Lee secures complete victory in wrongful dismissal lawsuit through circumstantial evidence',
    excerpt: 'The Employment and Labor team secured a complete victory before the Seoul Central District Court on October 23, 2026.',
    image: '/img/signing.webp',
    href: 'https://www.dentonslee.com/en/about-dentons-lee/news/2026/november/dentons-lee-secures-complete-victory-in-wrongful-dismissal-lawsuit-through-circumstantial-evidence',
  },
]

// Countries listed on https://www.dentons.com/en/global-presence, grouped by region.
// Includes offices, associate firms and strategic alliance firms.
export const REGIONS = [
  {
    key: 'americas',
    label: 'Americas',
    countries: ['Anguilla', 'Antigua and Barbuda', 'Argentina', 'Barbados', 'Bolivia', 'Brazil', 'British Virgin Islands', 'Canada', 'Cayman Islands', 'Chile', 'Colombia', 'Costa Rica', 'Dominica', 'Ecuador', 'El Salvador', 'Grenada', 'Guatemala', 'Guyana', 'Honduras', 'Jamaica', 'Mexico', 'Montserrat', 'Nicaragua', 'Panama', 'Peru', 'St. Kitts and Nevis', 'St. Lucia', 'St. Vincent and The Grenadines', 'Trinidad and Tobago', 'Turks and Caicos Islands', 'United States', 'Uruguay', 'Venezuela'],
  },
  {
    key: 'europe',
    label: 'Europe & Central Asia',
    countries: ['Azerbaijan', 'Belgium', 'Czech Republic', 'France', 'Georgia', 'Germany', 'Hungary', 'Ireland', 'Italy', 'Kazakhstan', 'Luxembourg', 'Netherlands', 'Poland', 'Romania', 'Slovak Republic', 'Spain', 'Türkiye', 'Ukraine', 'United Kingdom', 'Uzbekistan'],
  },
  {
    key: 'mea',
    label: 'Middle East & Africa',
    countries: ['Cameroon', 'Democratic Republic of the Congo', 'Egypt', 'Ethiopia', 'Kenya', 'Lebanon', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Nigeria', 'Oman', 'Qatar', 'Republic of the Congo', 'Saudi Arabia', 'Senegal', 'South Africa', 'Tanzania', 'Tunisia', 'Uganda', 'United Arab Emirates', 'Zambia'],
  },
  {
    key: 'apac',
    label: 'Asia Pacific',
    countries: ['Australia', 'China (Hong Kong)', 'India', 'Indonesia', 'Malaysia', 'Myanmar', 'New Zealand', 'Papua New Guinea', 'Philippines', 'Singapore', 'South Korea', 'Thailand', 'Vietnam'],
  },
]

export const PEOPLE_SEARCH = (keywords) =>
  `${url('/our-professionals')}?Filters=${encodeURIComponent(`&sectorid=&practiceid=&positionid=&languageid=&inpid=&countryid=&Keywords=${keywords}&page=1`)}`

export const NAV = [
  { label: 'Our People', href: url('/our-professionals') },
  {
    label: 'Practices',
    href: url('/global-solutions'),
    mega: {
      intro: 'Integrated legal solutions across every major practice, delivered locally and globally.',
      columns: [
        { title: 'Transactional', items: ['Corporate and M&A', 'Banking and Finance', 'Real Estate', 'Tax'] },
        { title: 'Disputes & Regulatory', items: ['Litigation and Dispute Resolution', 'Competition and Antitrust', 'Employment and Labor'] },
        { title: 'Technology & Energy', items: ['Intellectual Property and Technology', 'Privacy and Cybersecurity', 'Energy'] },
      ],
      feature: { label: 'Global solutions', title: 'Explore all practices', image: '/img/handshake.webp' },
    },
  },
  {
    label: 'Industries & Sectors',
    href: url('/global-sectors'),
    mega: {
      intro: 'Deep sector knowledge that anticipates the issues shaping your industry.',
      columns: [
        { title: 'Sectors', items: ['Financial Institutions', 'Energy', 'Technology, Media and Telecommunications'] },
        { title: '', items: ['Healthcare and Life Sciences', 'Real Estate', 'Transportation and Infrastructure'] },
      ],
      feature: { label: 'Global sectors', title: 'Explore all sectors', image: '/img/containers.webp' },
    },
  },
  {
    label: 'Insights',
    href: url('/insights'),
    mega: {
      intro: 'Reports, trackers and thought leadership from our teams around the world.',
      columns: [
        {
          title: 'Featured',
          links: INSIGHTS.slice(0, 4).map((i) => ({ label: i.title, href: i.href })),
        },
        {
          title: 'Explore',
          links: [
            { label: 'All insights', href: url('/insights') },
            { label: 'News', href: url('/about-dentons/news-events-and-awards/news') },
            { label: 'Client experience', href: url('/client-experience') },
          ],
        },
      ],
      feature: { label: 'New release', title: 'From AI Adoption to AI Advantage', image: '/img/circuit.webp', href: INSIGHTS[0].href },
    },
  },
  {
    label: 'About Us',
    href: url('/about-dentons'),
    mega: {
      intro: 'Redefining possibilities. Together, everywhere.',
      columns: [
        {
          title: 'About Dentons',
          links: [
            { label: 'About Dentons', href: url('/about-dentons') },
            { label: 'Client experience', href: url('/client-experience') },
            { label: 'News', href: url('/about-dentons/news-events-and-awards/news') },
          ],
        },
      ],
      feature: { label: 'Purpose-driven', title: 'The Dentons difference', image: '/img/team-meeting.webp' },
    },
  },
  { label: 'Global Presence', href: url('/global-presence') },
  { label: 'Careers', href: url('/careers') },
]

export const FOOTER_LEGAL = [
  ['Legal notices', '/legal-notices/legal-notices'],
  ['Client extranets', '/client-extranets'],
  ['Privacy', '/privacy-policy'],
  ['Terms of use', '/terms-of-use'],
  ['Modern Slavery Statement', '/modern-slavery-and-human-trafficking-statement'],
  ['SRA Regulation', '/global-presence/united-kingdom'],
  ['Fraud Alert', '/footer/fraud-alert'],
  ['Web Accessibility', '/footer/web-accessibility'],
  ['Tax Strategy Statement', '/tax-strategy-statement'],
].map(([label, path]) => ({ label, href: url(path) }))
