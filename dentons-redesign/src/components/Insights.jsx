import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { INSIGHTS, url } from '../data/content'
import { ClipReveal, PillLink, Reveal, SectionHeader } from './ui'

const ext = { target: '_blank', rel: 'noopener noreferrer' }

function Meta({ item, light }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      <span className={`rounded-full px-2.5 py-1 font-medium uppercase tracking-[0.12em] ${light ? 'bg-white/15 text-white backdrop-blur' : 'bg-brand/25 text-brand-200'}`}>{item.category}</span>
      {item.date && (
        <span className="flex items-center gap-1.5 text-muted">
          <CalendarDays className="size-3.5" aria-hidden /> {item.date}
        </span>
      )}
    </div>
  )
}

function ReadMore({ label }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
      {label}
      <span className="grid size-7 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-brand-200 group-hover:bg-brand-200 group-hover:text-ink">
        <ArrowUpRight className="size-3.5" aria-hidden />
      </span>
    </span>
  )
}

export default function Insights() {
  const [feature, ...rest] = INSIGHTS
  const side = rest.slice(0, 2)
  const row = rest.slice(2)

  return (
    <section id="insights" aria-labelledby="insights-title" className="panel py-20 md:py-28">
      <div className="container-x">
        <SectionHeader
          id="insights-title"
          eyebrow="Featured insights"
          title={
            <>
              Perspectives that help you <span className="accent">see around corners.</span>
            </>
          }
          aside={<PillLink href={url('/insights')}>All insights</PillLink>}
        >
          Global reports, research and knowledge hubs from Dentons teams on the issues shaping business today.
        </SectionHeader>

        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          {/* Feature */}
          <ClipReveal className="lg:col-span-7">
            <a href={feature.href} {...ext} className="group relative flex h-full min-h-[480px] flex-col justify-end overflow-hidden rounded-[24px] lg:min-h-[600px]">
              <img src={feature.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
              <div className="relative p-6 md:p-10">
                <Meta item={feature} light />
                <h3 className="mt-5 max-w-xl text-[1.875rem] font-light leading-[1.1] tracking-[-0.025em] md:text-[2.75rem]">{feature.title}</h3>
                <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-soft">{feature.excerpt}</p>
                <div className="mt-7">
                  <ReadMore label={feature.cta} />
                </div>
              </div>
            </a>
          </ClipReveal>

          {/* Side stack */}
          <div className="grid gap-4 lg:col-span-5">
            {side.map((item, i) => (
              <Reveal key={item.title} delay={0.08 * (i + 1)}>
                <a href={item.href} {...ext} className="group grid h-full overflow-hidden rounded-[24px] bg-panel-2 transition-colors hover:bg-panel-3 sm:grid-cols-[42%_1fr]">
                  <div className="relative h-48 overflow-hidden sm:h-full">
                    <img src={item.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col p-6">
                    <Meta item={item} />
                    <h3 className="mt-4 text-[1.25rem] font-light leading-snug tracking-tight">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
                    <div className="mt-auto pt-5">
                      <ReadMore label={item.cta} />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Row */}
          {row.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i} className="lg:col-span-4">
              <a href={item.href} {...ext} className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-line transition-colors hover:border-white/20 md:grid md:grid-cols-[40%_1fr] lg:flex">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-56 lg:aspect-[16/10] lg:min-h-0">
                  <img src={item.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Meta item={item} />
                  <h3 className="mt-4 text-[1.25rem] font-light leading-snug tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.excerpt}</p>
                  <div className="mt-auto pt-6">
                    <ReadMore label={item.cta} />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
