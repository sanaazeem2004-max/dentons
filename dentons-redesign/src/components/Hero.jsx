import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { url } from '../data/content'
import { AnimatedWords, CountUp, EASE, Magnetic } from './ui'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.1, ease: EASE, delay },
})

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // Scroll: image drifts slower than the page, content lifts and fades as you leave the hero
  // Driven by raw page scroll (pixels) so the hero is exactly at rest when scrollY = 0
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 900], [0, 140])
  const contentY = useTransform(scrollY, [0, 700], [0, -90])
  const contentOpacity = useTransform(scrollY, [80, 560], [1, 0])

  // Pointer: subtle image parallax + a soft purple spotlight that follows the cursor
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.4)
  const px = useSpring(useTransform(mx, [0, 1], [14, -14]), { stiffness: 60, damping: 20 })
  const py = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 60, damping: 20 })
  const sx = useSpring(useTransform(mx, (v) => v * 100), { stiffness: 90, damping: 22 })
  const sy = useSpring(useTransform(my, (v) => v * 100), { stiffness: 90, damping: 22 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}% ${sy}%, rgb(164 87 187 / 0.22), transparent 70%)`

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <section id="top" ref={ref} aria-labelledby="hero-title" onPointerMove={onPointerMove} className="relative">
      <div className="grain relative isolate flex min-h-[clamp(640px,100svh,920px)] flex-col overflow-hidden rounded-b-[24px] bg-panel md:rounded-b-[40px]">
        {/* Imagery: scroll parallax → pointer parallax → intro zoom → ambient Ken Burns drift */}
        <motion.div style={{ y: imgY }} className="absolute -inset-x-6 -inset-y-6 -z-10">
          <motion.div style={{ x: px, y: py }} className="size-full">
            <motion.div
              initial={reduce ? false : { scale: 1.18, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2.6, ease: EASE }}
              className="size-full"
            >
              <img
                src="/img/hero.webp"
                alt="Glass office towers rising into the sky"
                fetchPriority="high"
                className="size-full object-cover object-center motion-safe:animate-[ken-burns_26s_ease-in-out_2.6s_infinite_alternate]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(13_12_16/0.95)_0%,rgb(13_12_16/0.75)_42%,rgb(13_12_16/0.2)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/85 to-transparent" />
        <motion.div aria-hidden style={{ background: spotlight }} className="pointer-events-none absolute inset-0 -z-10 hidden md:block" />

        {/* Content */}
        <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="container-x flex flex-1 flex-col justify-center pb-14 pt-32 md:pb-16 md:pt-36">
          <div className="max-w-[58rem]">
            <div>
              <div className="mb-6 flex items-center gap-3 md:mb-8">
                <motion.span
                  aria-hidden
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                  className="h-px w-6 shrink-0 origin-left bg-brand-300 sm:w-10"
                />
                <motion.p
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                  className="whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-brand-300 sm:text-[0.75rem] sm:tracking-[0.2em]"
                >
                  The world’s largest global law firm
                </motion.p>
              </div>

              <h1 id="hero-title" className="h-display -ml-[0.04em] text-[clamp(2.6rem,5.6vw,5.25rem)] leading-[1.04] tracking-[-0.04em]">
                <AnimatedWords immediate className="block" delay={0.3} stagger={0.09}>
                  Helping You Navigate
                </AnimatedWords>
                <AnimatedWords immediate className="block" delay={0.6} stagger={0.12}>
                  <>
                    What’s <span className="accent">Next.</span>
                  </>
                </AnimatedWords>
              </h1>

              <motion.p {...(reduce ? {} : fadeUp(0.95))} className="mt-6 max-w-[36rem] text-base leading-[1.7] text-soft md:mt-8 md:text-[1.125rem]">
                Wherever you do business, Dentons brings together global perspectives, local knowledge and innovative legal solutions to help you grow,
                protect, operate and finance your organization.
              </motion.p>

              <motion.div {...(reduce ? {} : fadeUp(1.1))} className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
                <Magnetic className="w-full sm:w-auto">
                  <a href="#capabilities" className="btn-light group relative w-full overflow-hidden sm:w-auto">
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                    />
                    <span className="relative">Explore Our Capabilities</span>
                    <ArrowDownRight className="relative size-4 transition-transform duration-300 group-hover:rotate-[-45deg]" />
                  </a>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <a href="#people" className="btn-ghost group w-full backdrop-blur-sm sm:w-auto">
                    Find a Lawyer
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Purple action band — cells rise in sequence, a light sweep passes across it */}
        <div className="container-x pb-5 md:pb-8">
          <motion.div
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.25 } } }}
            className="relative grid overflow-hidden rounded-[18px] bg-brand shadow-[0_30px_60px_-25px_rgb(112_32_130/0.9)] md:rounded-[22px] lg:grid-cols-3"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/12 to-transparent motion-safe:animate-[sweep_7s_ease-in-out_3s_infinite]"
            />
            <BandCell className="border-b border-white/15 lg:border-b-0 lg:border-r">
              <p className="text-sm text-brand-200">Together. Everywhere.</p>
              <p className="mt-1.5 text-lg font-light md:text-xl">
                <span className="font-medium">
                  <CountUp value={176} duration={2.2} delay={1.4} margin="0px" />
                </span>{' '}
                offices in{' '}
                <span className="font-medium">
                  <CountUp value={88} duration={2.2} delay={1.4} margin="0px" />
                </span>{' '}
                countries
              </p>
            </BandCell>
            <BandCell as="a" href="#people" className="group border-b border-white/15 hover:bg-brand-500 lg:border-b-0 lg:border-r">
              <span>
                <span className="block text-sm text-brand-200">Looking for an expert?</span>
                <span className="mt-1.5 block text-lg font-light md:text-xl">Search 12,000+ professionals</span>
              </span>
              <ArrowRight className="mb-1 size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
            </BandCell>
            <BandCell as="a" href={url('/contact-us')} target="_blank" rel="noopener noreferrer" className="group hover:bg-brand-500">
              <span>
                <span className="block text-sm text-brand-200">Need assistance?</span>
                <span className="mt-1.5 block text-lg font-light md:text-xl">Contact our global team</span>
              </span>
              <ArrowUpRight className="mb-1 size-5 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
            </BandCell>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BandCell({ as = 'div', className = '', children, ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
      className={`relative flex items-end justify-between gap-4 p-5 transition-colors duration-300 md:px-7 md:py-5 lg:p-7 ${className}`}
      {...rest}
    >
      {as === 'div' ? <div>{children}</div> : children}
    </Comp>
  )
}
