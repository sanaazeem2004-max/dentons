import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { CAPABILITIES, url } from '../data/content'
import { EASE, PillLink, Reveal, SectionHeader } from './ui'

function CardBody({ c, i, expanded }) {
  return (
    <>
      <img
        src={c.image}
        alt=""
        loading="lazy"
        className={`absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] ${expanded ? 'scale-100' : 'scale-110'}`}
      />
      <div className={`absolute inset-0 transition-colors duration-700 ${expanded ? 'bg-ink/35' : 'bg-ink/55'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-6 lg:p-7">
        <div className="flex items-center justify-between">
          <span className="font-serif text-xl italic text-brand-200">0{i + 1}</span>
          <span className={`chip-arrow ${expanded ? 'rotate-0 bg-brand-200' : '-rotate-45 bg-white/90'}`}>
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
        <div>
          <h3 className="text-[2.25rem] font-light leading-none tracking-[-0.03em] lg:text-[2.6rem]">{c.title}</h3>
          <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-soft">{c.summary}</p>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="max-w-md pt-4 text-[0.9375rem] leading-relaxed text-muted">{c.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink">
                  Learn more <span className="sr-only">about {c.title}</span>
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default function Capabilities() {
  const [active, setActive] = useState(0)

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="capabilities-title"
          eyebrow="How we help"
          title={
            <>
              However you need to grow, <span className="accent">Dentons is here to help.</span>
            </>
          }
          aside={<PillLink href={url('/about-dentons')}>The work we do</PillLink>}
        >
          Our practice, industry and sector groups work together around four client imperatives—whatever your organization is trying to achieve.
        </SectionHeader>

        {/* Desktop: expanding editorial panels */}
        <Reveal delay={0.1} className="mt-14 hidden h-[580px] gap-3 lg:flex">
          {CAPABILITIES.map((c, i) => (
            <a
              key={c.key}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={`${c.title}: ${c.summary}`}
              className={`group relative overflow-hidden rounded-[26px] transition-[flex-grow] duration-700 ease-[var(--ease-premium)] ${active === i ? 'grow-[2.3]' : 'grow'} basis-0`}
            >
              <CardBody c={c} i={i} expanded={active === i} />
            </a>
          ))}
        </Reveal>

        {/* Mobile / tablet: stacked cards */}
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:hidden">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.key} delay={(i % 2) * 0.08}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-[440px] overflow-hidden rounded-[22px]"
              >
                <CardBody c={c} i={i} expanded />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
