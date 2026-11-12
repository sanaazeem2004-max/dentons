import { motion, useInView, useReducedMotion, useScroll, useSpring, animate } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const EASE = [0.22, 1, 0.36, 1]

/** Dentons wordmark in its signature purple pennant. */
export function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 168 36" className={className} role="img" aria-label="Dentons">
      <path d="M0 0h150l18 18-18 18H0z" fill="#702082" />
      <text
        x="74"
        y="24.5"
        textAnchor="middle"
        fill="#fff"
        fontFamily="'Inter Tight', Arial, sans-serif"
        fontWeight="600"
        fontSize="17"
        letterSpacing="3.2"
      >
        DENTONS
      </text>
    </svg>
  )
}

/** Fade-and-rise on scroll. Motion is disabled globally for reduced-motion users via MotionConfig. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  )
}

/* ---------- Word-by-word text reveal ---------- */

const wordVariants = {
  hidden: { opacity: 0, y: '0.55em', rotate: 2, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

// Splits plain strings and simple elements (e.g. <span className="accent">) into animated words,
// preserving each element's styling.
function splitWords(node, keyPrefix = 'w') {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part, i) =>
      /^\s+$/.test(part) || part === '' ? (
        part
      ) : (
        <span key={`${keyPrefix}-${i}`} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span className="inline-block will-change-transform" variants={wordVariants}>
            {part}
          </motion.span>
        </span>
      )
    )
  }
  if (Array.isArray(node)) return node.flatMap((n, i) => splitWords(n, `${keyPrefix}-${i}`))
  if (node?.props?.children !== undefined) {
    const { children, className } = node.props
    if (node.type === 'br') return node
    // Fragment → just recurse; element with a class → re-wrap each word with that class
    if (!className) return splitWords(children, keyPrefix)
    return splitWords(children, keyPrefix).map((w, i) =>
      typeof w === 'string' ? w : <span key={`${keyPrefix}-c${i}`} className={className}>{w}</span>
    )
  }
  return node
}

/** Animates text word by word. `immediate` plays on mount (hero); otherwise on scroll into view. */
export function AnimatedWords({ children, as = 'span', className = '', delay = 0, stagger = 0.06, immediate = false, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Comp
      className={className}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {splitWords(children)}
    </Comp>
  )
}

/* ---------- Image curtain reveal ---------- */

export function ClipReveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: 'inset(18% 8% 18% 8% round 28px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.3, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Magnetic hover (buttons follow the cursor slightly) ---------- */

export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.4 })
  const onMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  )
}

/* ---------- Thin reading-progress bar under the header ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-brand via-brand-300 to-brand-200"
    />
  )
}

export function SectionHeader({ eyebrow, title, children, aside, id }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        {eyebrow && (
          <Reveal y={12}>
            <p className="eyebrow mb-5">{eyebrow}</p>
          </Reveal>
        )}
        <AnimatedWords as="h2" id={id} className="h-section text-balance" delay={0.05}>
          {title}
        </AnimatedWords>
      </div>
      {(children || aside) && (
        <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
          {children && <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted">{children}</p>}
          {aside && <div className="mt-6">{aside}</div>}
        </Reveal>
      )}
    </div>
  )
}

/** Pill link with circular arrow — echoes the reference's "More details ↗" control. */
export function PillLink({ href, children, className = '', external = true, tone = 'dark' }) {
  const toneCls =
    tone === 'dark'
      ? 'border-white/15 bg-white/[0.04] text-white hover:border-white/40'
      : 'border-ink/10 bg-ink/[0.04] text-ink hover:border-ink/30'
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border py-1.5 pl-5 pr-1.5 text-sm font-medium transition-colors duration-300 ${toneCls} ${className}`}
    >
      {children}
      <span className="chip-arrow size-8 group-hover:rotate-45 group-hover:bg-brand-200">
        <ArrowUpRight className="size-4" aria-hidden />
      </span>
    </a>
  )
}

/** Number that counts up once when scrolled into view. */
export function CountUp({ value, suffix = '', duration = 2, delay = 0, margin = '0px 0px -15% 0px' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, delay, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

/* Minimal social marks (Lucide no longer ships brand icons). */
const social = {
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.6v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6S16 11.4 16 13v3" />
    </>
  ),
  X: <path d="M4 4l16 16M20 4L4 20" />,
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5l4 2.5-4 2.5z" fill="currentColor" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8v.01" />
    </>
  ),
}

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/dentons' },
  { name: 'X', href: 'https://twitter.com/dentons' },
  { name: 'YouTube', href: 'https://www.youtube.com/channel/UC8azty7IKBn40yQ6vxmsyvw' },
  { name: 'Instagram', href: 'https://www.instagram.com/dentonsglobal/' },
]

export function SocialIcon({ name, className = 'size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {social[name]}
    </svg>
  )
}
