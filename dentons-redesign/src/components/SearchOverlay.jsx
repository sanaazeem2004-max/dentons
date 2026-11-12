import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CornerDownLeft, Search, User, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { INDUSTRIES, INSIGHTS, NAV, NEWS, PEOPLE_SEARCH, PRACTICES, REGIONS, url } from '../data/content'
import { EASE } from './ui'

const INDEX = [
  ...PRACTICES.map((p) => ({ type: 'Practice', label: p.name, href: p.href })),
  ...INDUSTRIES.map((p) => ({ type: 'Industry', label: p.name, href: p.href })),
  ...INSIGHTS.map((p) => ({ type: 'Insight', label: p.title, href: p.href })),
  ...NEWS.map((p) => ({ type: 'News', label: p.title, href: p.href })),
  ...NAV.map((p) => ({ type: 'Page', label: p.label, href: p.href })),
  ...REGIONS.flatMap((r) => r.countries.map((c) => ({ type: 'Location', label: c, href: url('/global-presence') }))),
]

const SUGGESTIONS = ['Corporate and M&A', 'Energy', 'Privacy and Cybersecurity', 'AI', 'Singapore', 'Tax']

export default function SearchOverlay({ open, onClose: close }) {
  const [q, setQ] = useState('')
  const onClose = useCallback(() => {
    setQ('')
    close()
  }, [close])
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const t = setTimeout(() => inputRef.current?.focus(), 60)
    const esc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return []
    return INDEX.filter((r) => r.label.toLowerCase().includes(term)).slice(0, 8)
  }, [q])

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    const target = results[0]?.href || PEOPLE_SEARCH(q.trim())
    window.open(target, '_blank', 'noopener')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] bg-ink/80 px-4 pt-[12vh] backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-2xl overflow-hidden rounded-[26px] border border-white/10 bg-panel-2 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)]"
          >
            <form onSubmit={submit} className="flex items-center gap-3 border-b border-line px-5 py-4 sm:px-6">
              <Search className="size-5 shrink-0 text-brand-300" aria-hidden />
              <label htmlFor="site-search" className="sr-only">
                Search Dentons
              </label>
              <input
                ref={inputRef}
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search people, practices, insights, locations…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-lg font-light text-white placeholder:text-muted focus:outline-none"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="grid size-9 place-items-center rounded-full border border-white/12 text-muted hover:text-white">
                <X className="size-4" />
              </button>
            </form>

            <div className="max-h-[55vh] overflow-y-auto p-3 sm:p-4">
              {!q.trim() && (
                <div className="p-2">
                  <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => setQ(s)} className="rounded-full border border-white/12 px-3.5 py-1.5 text-sm text-soft transition-colors hover:border-brand-400 hover:text-white">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {q.trim() && (
                <ul aria-live="polite">
                  {results.map((r) => (
                    <li key={r.type + r.label}>
                      <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-xl px-3 py-3 hover:bg-white/5">
                        <span className="min-w-0">
                          <span className="block text-[0.6875rem] uppercase tracking-[0.16em] text-brand-300">{r.type}</span>
                          <span className="block truncate text-[0.9375rem] text-white">{r.label}</span>
                        </span>
                        <ArrowUpRight className="size-4 shrink-0 text-muted group-hover:text-white" />
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={PEOPLE_SEARCH(q.trim())} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-3 rounded-xl border border-dashed border-white/12 px-3 py-3 text-sm text-soft hover:border-brand-400 hover:text-white">
                      <User className="size-4 text-brand-300" />
                      Search our people for “{q.trim()}”
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <div className="hidden items-center gap-4 border-t border-line px-6 py-3 text-xs text-muted sm:flex">
              <span className="flex items-center gap-1.5">
                <CornerDownLeft className="size-3.5" /> to open top result
              </span>
              <span>
                <kbd className="rounded border border-white/15 px-1.5 py-0.5">Esc</kbd> to close
              </span>
              <span className="ml-auto">
                Press <kbd className="rounded border border-white/15 px-1.5 py-0.5">/</kbd> anywhere to search
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
