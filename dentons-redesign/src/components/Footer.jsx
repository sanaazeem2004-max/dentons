import { ArrowUp, ArrowUpRight, Mail } from 'lucide-react'
import { FOOTER_LEGAL, INDUSTRIES, INSIGHTS, PRACTICES, url } from '../data/content'
import { Logo, SOCIAL_LINKS, SocialIcon } from './ui'

const YEAR = new Date().getFullYear()
const ext = { target: '_blank', rel: 'noopener noreferrer' }

const COLUMNS = [
  { title: 'Practices', links: PRACTICES.slice(0, 6).map((p) => ({ label: p.name, href: p.href })), all: { label: 'All practices', href: url('/global-solutions') } },
  { title: 'Industries', links: INDUSTRIES.map((p) => ({ label: p.name, href: p.href })), all: { label: 'All sectors', href: url('/global-sectors') } },
  { title: 'Insights', links: INSIGHTS.slice(0, 4).map((p) => ({ label: p.title, href: p.href })), all: { label: 'All insights', href: url('/insights') } },
  {
    title: 'Firm',
    links: [
      { label: 'Our People', href: url('/our-professionals') },
      { label: 'Global Presence', href: url('/global-presence') },
      { label: 'About Dentons', href: url('/about-dentons') },
      { label: 'Client experience', href: url('/client-experience') },
      { label: 'News', href: url('/about-dentons/news-events-and-awards/news') },
      { label: 'Careers', href: url('/careers') },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="footer" className="panel mb-2 sm:mb-3 md:mb-4">
      <div className="container-x pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-line pb-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-8 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              A global legal practice providing client services worldwide through its member firms and affiliates. Redefining possibilities. Together, everywhere.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={url('/contact-us')} {...ext} className="flex items-center gap-2.5 text-soft hover:text-white">
                <Mail className="size-4 text-brand-300" /> Contact Dentons
              </a>
              <a href={url('/global-presence')} {...ext} className="flex items-center gap-2.5 text-soft hover:text-white">
                <ArrowUpRight className="size-4 text-brand-300" /> Find an office in your location
              </a>
            </div>
            <ul className="mt-8 flex gap-2" aria-label="Dentons on social media">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    {...ext}
                    aria-label={`Dentons on ${s.name}`}
                    className="grid size-10 place-items-center rounded-full border border-white/12 text-soft transition-colors hover:border-brand-400 hover:bg-brand hover:text-white"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-white">{col.title}</h2>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} {...ext} className="text-sm leading-snug text-muted transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                  {col.all && (
                    <li>
                      <a href={col.all.href} {...ext} className="inline-flex items-center gap-1 text-sm font-medium text-brand-300 hover:text-white">
                        {col.all.label} <ArrowUpRight className="size-3.5" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 pt-8 lg:flex-row lg:items-start lg:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-muted">
            {FOOTER_LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...ext} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="inline-flex shrink-0 items-center gap-2 self-start text-sm text-soft hover:text-white">
            Back to top
            <span className="grid size-8 place-items-center rounded-full border border-white/15">
              <ArrowUp className="size-4" />
            </span>
          </a>
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-relaxed text-white/50">
          © {YEAR} Dentons. All rights reserved. Attorney Advertising. Dentons is a global legal practice providing client services worldwide through its member firms and
          affiliates. This website and its publications are not designed to provide legal or other advice and you should not take, or refrain from taking, action based on its content.
        </p>
      </div>
    </footer>
  )
}
