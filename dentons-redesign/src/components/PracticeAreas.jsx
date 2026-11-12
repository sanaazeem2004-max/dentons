import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { INDUSTRIES, PRACTICES, url } from '../data/content'
import { EASE, Reveal, SectionHeader } from './ui'

const TABS = [
  { key: 'practices', label: 'Practices', items: PRACTICES, all: url('/global-solutions') },
  { key: 'industries', label: 'Industries', items: INDUSTRIES, all: url('/global-sectors') },
]

export default function PracticeAreas() {
  const [tab, setTab] = useState(0)
  const [query, setQuery] = useState('')
  const [hover, setHover] = useState(0)

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = TABS[tab].items
    return q ? list.filter((i) => `${i.name} ${i.blurb}`.toLowerCase().includes(q)) : list
  }, [tab, query])

  const current = items[Math.min(hover, items.length - 1)]

  const switchTab = (i) => {
    setTab(i)
    setHover(0)
  }

  return (
    <section id="practices" aria-labelledby="practices-title" className="panel py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          id="practices-title"
          eyebrow="Practices & industries"
          title={
            <>
              Global capability, <span className="accent">local depth.</span>
            </>
          }
        >
          Integrated teams across every major practice and sector—so you get the right expertise, wherever the matter sits.
        </SectionHeader>

        {/* Controls */}
        <Reveal delay={0.05} className="mt-12 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Browse by" className="relative inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] p-1">
            {TABS.map((t, i) => (
              <button
                key={t.key}
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={tab === i}
                aria-controls="practice-panel"
                onClick={() => switchTab(i)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === i ? 'text-ink' : 'text-soft hover:text-white'}`}
              >
                {tab === i && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  {t.label} <span className={tab === i ? 'text-ink/50' : 'text-muted'}>{t.items.length}</span>
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <label htmlFor="practice-search" className="sr-only">
              Filter {TABS[tab].label.toLowerCase()}
            </label>
            <input
              id="practice-search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHover(0)
              }}
              placeholder={`Filter ${TABS[tab].label.toLowerCase()}…`}
              className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-muted focus:border-brand-400 focus:outline-none"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear filter" className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-white">
                <X className="size-3.5" />
              </button>
            )}
          </div>
        </Reveal>

        <div id="practice-panel" role="tabpanel" aria-labelledby={`tab-${TABS[tab].key}`} className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* List */}
          <ul className="lg:col-span-7">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item, i) => {
                const isActive = current?.name === item.name
                return (
                  <motion.li
                    key={TABS[tab].key + item.name}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: query ? 0 : i * 0.03 }}
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      className={`group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 md:px-5 md:py-5 ${
                        isActive ? 'bg-panel-2' : 'hover:bg-panel-2/60'
                      }`}
                    >
                      <span className={`text-sm tabular-nums ${isActive ? 'text-brand-300' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="min-w-0">
                        <span className="block text-[1.0625rem] font-normal leading-snug md:text-[1.25rem] md:font-light">{item.name}</span>
                        <span className="mt-1 block text-sm text-muted lg:hidden">{item.blurb}</span>
                      </span>
                      <span className={`grid size-9 place-items-center rounded-full border transition-all duration-300 ${isActive ? 'border-brand bg-brand text-white' : 'border-white/15 text-soft group-hover:border-white/40'}`}>
                        <ArrowUpRight className={`size-4 transition-transform duration-300 ${isActive ? 'rotate-45' : ''}`} aria-hidden />
                      </span>
                    </a>
                  </motion.li>
                )
              })}
            </AnimatePresence>
            {items.length === 0 && (
              <li className="rounded-2xl border border-dashed border-white/12 px-5 py-10 text-center text-muted">
                No {TABS[tab].label.toLowerCase()} match “{query}”.{' '}
                <a href={TABS[tab].all} target="_blank" rel="noopener noreferrer" className="text-brand-300 underline underline-offset-4">
                  Browse the full list
                </a>
              </li>
            )}
          </ul>

          {/* Preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-[26px] bg-panel-2">
              <AnimatePresence mode="sync">
                {current && (
                  <motion.img
                    key={current.image + current.name}
                    src={current.image}
                    alt=""
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="absolute inset-0 size-full object-cover"
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              {current && (
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <AnimatePresence mode="wait">
                    <motion.div key={current.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}>
                      <p className="text-xs uppercase tracking-[0.18em] text-brand-200">{TABS[tab].label.slice(0, -1).replace(/ie$/, 'y')}</p>
                      <p className="mt-2 text-[1.75rem] font-light leading-tight tracking-tight">{current.name}</p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-soft">{current.blurb}</p>
                    </motion.div>
                  </AnimatePresence>
                  <a href={TABS[tab].all} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-brand-200">
                    View all {TABS[tab].label.toLowerCase()} <ArrowUpRight className="size-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <a href={TABS[tab].all} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full sm:w-auto">
            View all {TABS[tab].label.toLowerCase()} <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
