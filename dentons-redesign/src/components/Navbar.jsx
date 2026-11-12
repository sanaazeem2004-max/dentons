import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Globe, Menu, Phone, Search, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { LANGUAGES, NAV, url } from '../data/content'
import SearchOverlay from './SearchOverlay'
import { EASE, Logo } from './ui'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function MegaMenu({ item, onClose }) {
  const { mega } = item
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="absolute inset-x-0 top-full pt-3"
    >
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 overflow-hidden rounded-[26px] border border-white/10 bg-panel-2 p-8 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-xl">
          <div className="col-span-3 border-r border-line pr-8">
            <p className="eyebrow mb-4">{item.label}</p>
            <p className="text-[1.375rem] font-light leading-snug tracking-tight text-white">{mega.intro}</p>
            <a href={item.href} {...ext} onClick={onClose} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:text-white">
              View all {item.label.toLowerCase()} <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className={`col-span-6 grid gap-8 ${mega.columns.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {mega.columns.map((col, i) => (
              <div key={i}>
                <p className="mb-4 h-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">{col.title}</p>
                <ul className="space-y-1">
                  {(col.links || col.items.map((label) => ({ label, href: item.href }))).map((l) => (
                    <li key={l.label}>
                      <a href={l.href} {...ext} onClick={onClose} className="group flex items-start justify-between gap-3 rounded-lg py-2 text-[0.9375rem] text-soft transition-colors hover:text-white">
                        <span className="leading-snug">{l.label}</span>
                        <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <a href={mega.feature.href || item.href} {...ext} onClick={onClose} className="group relative col-span-3 block min-h-[220px] overflow-hidden rounded-2xl">
            <img src={mega.feature.image} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-brand-200">{mega.feature.label}</p>
                <p className="mt-1 text-lg font-light leading-tight">{mega.feature.title}</p>
              </div>
              <span className="chip-arrow group-hover:rotate-45">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

function LanguageSelect() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language and location"
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/12 px-3 text-sm text-soft transition-colors hover:border-white/35 hover:text-white"
      >
        <Globe className="size-4" />
        <span className="font-medium">EN</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute right-0 top-full z-10 mt-3 w-60 origin-top-right rounded-2xl border border-white/10 bg-panel-2 p-2 shadow-2xl"
          >
            <li className="px-3 pb-2 pt-1 text-xs uppercase tracking-[0.16em] text-muted">Language</li>
            {LANGUAGES.map((l) => (
              <li key={l.code} role="option" aria-selected={l.code === 'EN'}>
                <a href={l.href} className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${l.code === 'EN' ? 'text-white' : 'text-soft'}`}>
                  {l.label}
                  <span className={`text-xs ${l.code === 'EN' ? 'text-brand-300' : 'text-muted'}`}>{l.code}</span>
                </a>
              </li>
            ))}
            <li className="mt-1 border-t border-line pt-1">
              <a href={url('/global-presence')} {...ext} className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-brand-300 hover:bg-white/5">
                Choose a location <ArrowUpRight className="size-4" />
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({ open, onClose, onSearch }) {
  const [expanded, setExpanded] = useState(null)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', esc)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm xl:hidden"
          onClick={onClose}
        >
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-panel px-6 pb-8 pt-5"
          >
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto" />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-11 place-items-center rounded-full border border-white/15">
                <X className="size-5" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose()
                onSearch()
              }}
              className="mt-8 flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-5 py-3.5 text-left text-muted"
            >
              <Search className="size-4" /> Search people, practices, insights…
            </button>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {NAV.map((item, i) => (
                <li key={item.label}>
                  {item.mega ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === i}
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="flex w-full items-center justify-between py-4 text-left text-xl font-light"
                      >
                        {item.label}
                        <ChevronDown className={`size-5 text-muted transition-transform duration-300 ${expanded === i ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === i && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            {item.mega.columns
                              .flatMap((c) => c.links || c.items.map((label) => ({ label, href: item.href })))
                              .map((l) => (
                                <li key={l.label}>
                                  <a href={l.href} {...ext} className="block py-2 pl-3 text-[0.9375rem] text-soft hover:text-white">
                                    {l.label}
                                  </a>
                                </li>
                              ))}
                            <li className="pb-4 pt-1">
                              <a href={item.href} {...ext} className="inline-flex items-center gap-1.5 pl-3 text-sm font-medium text-brand-300">
                                View all <ArrowUpRight className="size-4" />
                              </a>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href={item.href} {...ext} className="flex items-center justify-between py-4 text-xl font-light">
                      {item.label}
                      <ArrowUpRight className="size-5 text-muted" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-muted">Language</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <a key={l.code} href={l.href} className={`rounded-full border px-3.5 py-1.5 text-sm ${l.code === 'EN' ? 'border-brand-400 bg-brand/30 text-white' : 'border-white/12 text-soft'}`}>
                    {l.code}
                  </a>
                ))}
              </div>
            </div>
            <a href={url('/contact-us')} {...ext} className="btn-primary mt-10 w-full">
              <Phone className="size-4" /> Contact Us
            </a>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const scrolled = useScrolled()
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeTimer = useRef()
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const openSearch = useCallback(() => setSearchOpen(true), [])

  const openMenu = (i) => {
    clearTimeout(closeTimer.current)
    setActive(i)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setActive(null), 160)
  }

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setActive(null)
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [])

  // Keyboard shortcut: "/" opens search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const activeItem = active !== null ? NAV[active] : null

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)] ${
          scrolled || activeItem ? 'border-b border-white/[0.06] bg-ink/80 py-3 backdrop-blur-xl' : 'border-b border-transparent py-5 md:py-7'
        }`}
        onMouseLeave={scheduleClose}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <a href="#top" className="shrink-0" aria-label="Dentons home">
            <Logo className="h-7 w-auto md:h-8" />
          </a>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-md" onMouseLeave={() => setHovered(null)}>
              {NAV.map((item, i) => {
                const isOpen = active === i
                return (
                  <li key={item.label} className="relative" onMouseEnter={() => { setHovered(i); if (item.mega) openMenu(i); else scheduleClose() }}>
                    {(hovered === i || isOpen) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                    )}
                    {item.mega ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() => (isOpen ? setActive(null) : openMenu(i))}
                        onFocus={() => setHovered(i)}
                        className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${hovered === i || isOpen ? 'text-ink' : 'text-soft'}`}
                      >
                        {item.label}
                        <ChevronDown className={`size-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        {...ext}
                        onFocus={() => { setHovered(i); setActive(null) }}
                        className={`relative z-10 block rounded-full px-4 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${hovered === i ? 'text-ink' : 'text-soft'}`}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid size-10 place-items-center rounded-full border border-white/12 text-soft transition-colors hover:border-white/35 hover:text-white"
            >
              <Search className="size-4" />
            </button>
            <div className="hidden sm:block">
              <LanguageSelect />
            </div>
            <a href={url('/contact-us')} {...ext} className="btn-primary hidden !py-2.5 !text-sm md:inline-flex">
              Contact Us
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full bg-white text-ink xl:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeItem?.mega && (
            <div key="mega" className="hidden xl:block" onMouseEnter={() => openMenu(active)} onMouseLeave={scheduleClose}>
              <MegaMenu item={activeItem} onClose={() => setActive(null)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu open={mobileOpen} onClose={closeMobile} onSearch={openSearch} />
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  )
}
