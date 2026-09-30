import { Reveal } from './Reveal'
import { ArrowLeft, ArrowRight } from './icons'

export function SectionHeading({ eyebrow, heading, subtitle, align = 'left' }) {
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-prose text-center' : 'max-w-3xl'}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <span className={`rule mt-4 ${centered ? 'mx-auto' : ''}`} />
      </Reveal>

      <Reveal delay={70}>
        <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl">{heading}</h2>
      </Reveal>

      {subtitle && (
        <Reveal delay={130}>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function CarouselControls({ atStart, atEnd, prev, next, variant = 'light' }) {
  const idle =
    variant === 'light'
      ? 'border-line-strong text-ink hover:border-gold hover:bg-gold hover:text-ink'
      : 'border-night-line text-night-soft hover:border-gold hover:text-gold'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={prev}
        disabled={atStart}
        aria-label="Previous"
        className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:bg-transparent disabled:hover:text-ink ${idle}`}
      >
        <ArrowLeft />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={atEnd}
        aria-label="Next"
        className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 ease-smooth disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:bg-transparent disabled:hover:text-ink ${idle}`}
      >
        <ArrowRight />
      </button>
    </div>
  )
}
