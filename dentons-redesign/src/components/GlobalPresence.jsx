import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { memo, useMemo, useState } from 'react'
import { REGIONS, STATS, url } from '../data/content'
import map from '../data/worldMap.json'
import { CountUp, EASE, PillLink, Reveal, SectionHeader } from './ui'

const HUBS = new Set(['London', 'New York', 'Toronto', 'São Paulo', 'Paris', 'Frankfurt', 'Dubai', 'Nairobi', 'Johannesburg', 'Mumbai', 'Singapore', 'Hong Kong', 'Sydney', 'Mexico City', 'Warsaw'])

const Dots = memo(function Dots() {
  return (
    <svg viewBox={`0 0 ${map.width} ${map.height}`} className="absolute inset-0 size-full" aria-hidden>
      <g fill="rgb(255 255 255 / 0.13)">
        {map.dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.3" />
        ))}
      </g>
    </svg>
  )
})

// Merge offices that snap to the same grid dot (e.g. Budapest + Bratislava) and
// render hub cities last so their markers sit on top of close neighbours.
const PINS = Object.values(
  map.pins.reduce((acc, p) => {
    const k = `${p.x},${p.y}`
    if (acc[k]) {
      acc[k].city += ` · ${p.city}`
      if (!acc[k].country.includes(p.country)) acc[k].country += ` · ${p.country}`
    } else acc[k] = { ...p }
    return acc
  }, {})
).sort((a, b) => HUBS.has(a.city) - HUBS.has(b.city))

export default function GlobalPresence() {
  const [region, setRegion] = useState('all')
  const [hovered, setHovered] = useState(null)

  const regionData = REGIONS.find((r) => r.key === region)
  const pins = PINS
  const visibleCount = useMemo(() => (region === 'all' ? map.pins.length : map.pins.filter((p) => p.region === region).length), [region])

  return (
    <section id="global-presence" aria-labelledby="presence-title" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="presence-title"
          eyebrow="Global presence"
          title={
            <>
              One firm. <span className="accent">Everywhere you do business.</span>
            </>
          }
          aside={<PillLink href={url('/global-presence')}>Explore our locations</PillLink>}
        >
          With more offices in more countries than any other firm, Dentons pairs world-class global capability with deep local knowledge.
        </SectionHeader>

        <Reveal delay={0.1} className="mt-14">
          <div className="grain relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-panel md:rounded-[30px]">
            <div className="pointer-events-none absolute left-1/2 top-1/3 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[140px]" />

            {/* Region filter */}
            <div className="relative flex flex-wrap gap-2 p-4 md:p-6" role="group" aria-label="Filter offices by region">
              {[{ key: 'all', label: 'All regions' }, ...REGIONS].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  aria-pressed={region === r.key}
                  onClick={() => setRegion(r.key)}
                  className={`rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all duration-300 ${
                    region === r.key ? 'border-white bg-white text-ink' : 'border-white/12 text-soft hover:border-white/35 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="relative mx-auto aspect-[139/70] w-full max-w-[1200px] px-2 md:px-6">
              <div className="relative size-full">
                <Dots />
                {pins.map((p) => {
                  const on = region === 'all' || p.region === region
                  const hub = HUBS.has(p.city)
                  return (
                    <button
                      key={p.city}
                      type="button"
                      aria-label={`${p.city}, ${p.country}`}
                      onMouseEnter={() => setHovered(p)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(p)}
                      onBlur={() => setHovered(null)}
                      tabIndex={on ? 0 : -1}
                      className="group absolute grid size-3 -translate-x-1/2 -translate-y-1/2 place-items-center md:size-4"
                      style={{ left: `${(p.x / map.width) * 100}%`, top: `${(p.y / map.height) * 100}%` }}
                    >
                      {hub && on && <span className="absolute size-1.5 rounded-full bg-brand-300 motion-safe:animate-[ping-soft_2.6s_ease-out_infinite] md:size-2" />}
                      <span
                        className={`relative rounded-full transition-all duration-500 ${
                          on ? 'size-1.5 bg-brand-300 shadow-[0_0_10px_2px_rgb(196_143_214/0.6)] group-hover:scale-150 md:size-2' : 'size-1 bg-white/25'
                        }`}
                      />
                    </button>
                  )
                })}

                <AnimatePresence>
                  {hovered && (
                    <motion.div
                      key={hovered.city}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-xl border border-white/10 bg-panel-3/95 px-3.5 py-2 shadow-xl backdrop-blur"
                      style={{ left: `${(hovered.x / map.width) * 100}%`, top: `${(hovered.y / map.height) * 100}%` }}
                    >
                      <p className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin className="size-3.5 text-brand-300" /> {hovered.city}
                      </p>
                      <p className="text-xs text-muted">{hovered.country}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Stats + region detail */}
            <div className="relative grid border-t border-line md:grid-cols-12">
              <dl className="grid grid-cols-3 md:col-span-7">
                {STATS.map((s, i) => (
                  <div key={s.label} className={`p-5 md:p-8 ${i > 0 ? 'border-l border-line' : ''}`}>
                    <dd className="text-[1.75rem] font-light leading-none tracking-[-0.03em] sm:text-4xl lg:text-[3.25rem]">
                      <CountUp value={s.value} suffix={s.suffix} />
                    </dd>
                    <dt className="mt-3 text-xs leading-snug text-muted sm:text-sm">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line p-5 md:col-span-5 md:border-l md:border-t-0 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div key={region} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
                    {regionData ? (
                      <>
                        <p className="text-sm text-muted">
                          <span className="text-white">{regionData.label}</span> · {regionData.countries.length} countries &amp; territories
                        </p>
                        <ul className="mt-4 flex max-h-[7.5rem] flex-wrap gap-1.5 overflow-y-auto pr-1">
                          {regionData.countries.map((c) => (
                            <li key={c} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-soft">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted">
                          Showing <span className="text-white">{visibleCount} key cities</span> across four regions. Select a region to see every country where Dentons and its
                          associate firms operate.
                        </p>
                        <a href={url('/global-presence')} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-white">
                          Find an office near you <ArrowUpRight className="size-4" />
                        </a>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
