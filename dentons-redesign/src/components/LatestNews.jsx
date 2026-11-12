import { ArrowUpRight } from 'lucide-react'
import { NEWS, url } from '../data/content'
import { AnimatedWords, ClipReveal, PillLink, Reveal } from './ui'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Dateline({ item }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 text-xs font-medium uppercase tracking-[0.14em]">
      <span className="text-brand-300">{item.region}</span>
      <span className="size-1 rounded-full bg-white/25" aria-hidden />
      <time className="text-muted">{item.date}</time>
    </p>
  )
}

export default function LatestNews() {
  const [lead, ...others] = NEWS

  return (
    <section id="news" aria-labelledby="news-title" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Latest news</p>
            <AnimatedWords as="h2" id="news-title" className="h-section">
              <>Dentons news from <span className="accent">around the world.</span></>
            </AnimatedWords>
          </div>
          <PillLink href={url('/about-dentons/news-events-and-awards/news')}>View all news</PillLink>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Lead story */}
          <Reveal className="lg:col-span-6">
            <a href={lead.href} {...ext} className="group block">
              <ClipReveal className="relative aspect-[4/3] overflow-hidden rounded-[24px]">
                <img src={lead.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105" />
                <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-medium uppercase tracking-[0.14em]">Featured</span>
              </ClipReveal>
              <div className="mt-7">
                <Dateline item={lead} />
                <h3 className="mt-4 text-[1.75rem] font-light leading-[1.15] tracking-[-0.025em] decoration-brand-300 decoration-1 underline-offset-[6px] group-hover:underline md:text-[2.25rem]">
                  {lead.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Read more <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Story list */}
          <ol className="divide-y divide-line lg:col-span-6">
            {others.map((item, i) => (
              <Reveal as="li" key={item.title} delay={0.06 * i} className="first:pt-0">
                <a href={item.href} {...ext} className="group grid grid-cols-[1fr_auto] gap-5 py-7 first:pt-0 sm:grid-cols-[2rem_1fr_auto]">
                  <span className="hidden font-serif text-2xl italic text-white/30 sm:block">{i + 2}</span>
                  <div className="min-w-0">
                    <Dateline item={item} />
                    <h3 className="mt-3 text-[1.1875rem] font-light leading-snug tracking-tight decoration-brand-300 decoration-1 underline-offset-4 group-hover:underline md:text-[1.375rem]">
                      {item.title}
                    </h3>
                    <p className="mt-2 hidden text-sm leading-relaxed text-muted md:line-clamp-2">{item.excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-soft group-hover:text-white">
                      Read more <ArrowUpRight className="size-3.5" aria-hidden />
                    </span>
                  </div>
                  <div className="relative size-20 overflow-hidden rounded-2xl sm:size-28">
                    <img src={item.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
