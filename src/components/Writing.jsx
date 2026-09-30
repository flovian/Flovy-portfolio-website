import { writing } from '../data/content'
import { useCarousel, useTilt } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { CarouselControls, SectionHeading } from './SectionHeading'
import { ArrowRight } from './icons'

function PostVisual({ index }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-card to-gold-wash/70">
      <span className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-gold-soft/40" />
      <span className="absolute -right-1 -top-2 h-20 w-20 rounded-full border border-gold/30" />

      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-5xl tracking-tightest text-gold/25">
          {index}
        </span>
      </div>

      <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        <span className="font-mono text-[0.6rem] uppercase tracking-eyebrow text-ink-muted">
          Essay
        </span>
      </span>
    </div>
  )
}

function PostCard({ post, index }) {
  const tiltRef = useTilt({ max: 4, scale: 1.01 })

  return (
    <article
      ref={tiltRef}
      className="card card-lift spotlight group flex h-full flex-col overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-700 ease-smooth group-hover:scale-105">
          <PostVisual index={index} />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <h3 className="text-xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-gold">
          {post.title}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{post.excerpt}</p>

        <a
          href={post.href}
          {...(post.href.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' })}
          className="mt-6 inline-flex items-center gap-1.5 self-start pt-0 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-gold"
        >
          Read more
          <span className="h-px w-4 bg-gold transition-all duration-300 ease-smooth group-hover:w-7" />
          <ArrowRight className="-ml-1 transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  )
}

export function Writing() {
  const { trackRef, next, prev, atStart, atEnd } = useCarousel()

  return (
    <section id="writing" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow={writing.eyebrow}
            heading={writing.heading}
            subtitle={writing.subtitle}
          />
          <Reveal delay={180} className="hidden lg:block">
            <CarouselControls
              atStart={atStart}
              atEnd={atEnd}
              prev={prev}
              next={next}
            />
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div
            ref={trackRef}
            className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3 lg:mt-14"
          >
            {writing.posts.map((post, i) => (
              <div
                key={post.title}
                className="w-[84vw] shrink-0 snap-start sm:w-[64vw] lg:w-[24rem]"
              >
                <PostCard post={post} index={String(i + 1).padStart(2, '0')} />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 lg:hidden">
          <CarouselControls atStart={atStart} atEnd={atEnd} prev={prev} next={next} />
        </div>
      </div>
    </section>
  )
}
