import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Briefcase, ChevronDown, MapPin, Search, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { PEOPLE_SEARCH, PRACTICES, REGIONS, url } from '../data/content'
import { Reveal } from './ui'

const COUNTRIES = [...new Set(REGIONS.flatMap((r) => r.countries))].sort((a, b) => a.localeCompare(b))

function Field({ icon: Icon, label, id, children }) {
  return (
    <div className="group relative">
      <label htmlFor={id} className="absolute left-12 top-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      <Icon className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-brand-300" aria-hidden />
      {children}
    </div>
  )
}

const inputCls =
  'w-full appearance-none rounded-2xl border border-white/10 bg-ink/40 pb-3 pl-12 pr-10 pt-8 text-[0.9375rem] text-white placeholder:text-white/35 transition-colors focus:border-brand-400 focus:outline-none'

export default function OurPeople() {
  const [form, setForm] = useState({ name: '', location: '', practice: '' })
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const colA = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const colB = useTransform(scrollYProgress, [0, 1], ['-4%', '8%'])

  const submit = (e) => {
    e.preventDefault()
    const keywords = [form.name, form.practice, form.location].filter(Boolean).join(' ')
    window.open(keywords ? PEOPLE_SEARCH(keywords) : url('/our-professionals'), '_blank', 'noopener')
  }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="people" ref={ref} aria-labelledby="people-title" className="panel overflow-hidden py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-5">Our people</p>
            <h2 id="people-title" className="h-section text-balance">
              12,000+ lawyers and professionals. <span className="accent">One connected team.</span>
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-muted">
              Find the right expertise by name, location or practice area—and connect with a team that understands both the global picture and local realities.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="mt-10 grid gap-3 rounded-[24px] border border-white/[0.07] bg-panel-2 p-3 sm:grid-cols-2" aria-label="Find a lawyer">
              <div className="sm:col-span-2">
                <Field icon={User} label="Search by name" id="lawyer-name">
                  <input id="lawyer-name" value={form.name} onChange={set('name')} placeholder="First or last name" autoComplete="off" className={inputCls} />
                </Field>
              </div>
              <Field icon={MapPin} label="Location" id="lawyer-location">
                <select id="lawyer-location" value={form.location} onChange={set('location')} className={`${inputCls} ${form.location ? '' : 'text-white/45'}`}>
                  <option value="">Any country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="bg-panel text-white">
                      {c}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
              </Field>
              <Field icon={Briefcase} label="Practice area" id="lawyer-practice">
                <select id="lawyer-practice" value={form.practice} onChange={set('practice')} className={`${inputCls} ${form.practice ? '' : 'text-white/45'}`}>
                  <option value="">Any practice</option>
                  {PRACTICES.map((p) => (
                    <option key={p.name} value={p.name} className="bg-panel text-white">
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
              </Field>
              <button type="submit" className="btn-primary w-full !rounded-2xl !py-4 sm:col-span-2">
                <Search className="size-4" /> Find a Lawyer
              </button>
            </form>
            <a href={url('/our-professionals')} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 hover:text-white">
              Browse the full people directory <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        {/* Portrait collage (illustrative photography) */}
        <div className="relative lg:col-span-6" aria-hidden>
          <div className="grid h-[460px] grid-cols-2 gap-3 sm:h-[560px] lg:h-[640px]">
            <motion.div style={{ y: colA }} className="grid gap-3 [grid-template-rows:1.25fr_1fr]">
              <img src="/img/portrait1.webp" alt="" loading="lazy" className="size-full rounded-[22px] object-cover" />
              <img src="/img/woman.webp" alt="" loading="lazy" className="size-full rounded-[22px] object-cover object-[60%_center]" />
            </motion.div>
            <motion.div style={{ y: colB }} className="grid gap-3 pt-10 [grid-template-rows:1fr_1.25fr]">
              <img src="/img/portrait4.webp" alt="" loading="lazy" className="size-full rounded-[22px] object-cover" />
              <img src="/img/portrait3.webp" alt="" loading="lazy" className="size-full rounded-[22px] object-cover" />
            </motion.div>
          </div>
          <div className="absolute -bottom-2 left-1/2 w-[min(88%,340px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-ink/80 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-200">Together. Everywhere.</p>
            <p className="mt-1.5 font-light leading-snug text-soft">Search our professionals across 176 offices in 88 countries.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
