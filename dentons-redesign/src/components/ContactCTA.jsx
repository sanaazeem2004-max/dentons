import { ArrowUpRight, MapPin } from 'lucide-react'
import { url } from '../data/content'
import { Reveal } from './ui'

export default function ContactCTA() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-32">
      <Reveal className="inset">
        <div className="grain relative isolate overflow-hidden rounded-[22px] bg-brand md:rounded-[30px]">
          <img src="/img/city-night.webp" alt="" loading="lazy" className="absolute inset-0 -z-10 size-full object-cover opacity-30 mix-blend-luminosity" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgb(112_32_130/0.55),rgb(87_24_102/0.95)_60%)]" />
          <div className="container-x grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="mb-6 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
                <span className="h-px w-6 bg-brand-200" /> Let’s talk
              </p>
              <h2 id="contact-title" className="h-display text-balance text-[clamp(2.4rem,5.6vw,5rem)]">
                Wherever business takes you, <span className="font-serif font-normal italic text-white">we’re ready.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                Connect with our global team to find the right legal expertise for your next challenge.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
              <a href={url('/contact-us')} target="_blank" rel="noopener noreferrer" className="btn-light group w-full sm:w-auto lg:w-64">
                Contact Us <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </a>
              <a href={url('/global-presence')} target="_blank" rel="noopener noreferrer" className="btn w-full border border-white/35 text-white hover:bg-white/10 sm:w-auto lg:w-64">
                <MapPin className="size-4" /> Find an Office
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
