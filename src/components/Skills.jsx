import { skills } from '../data/content'
import { useTilt } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ArrowUpRight, LineIcon } from './icons'

function SkillCard({ card, i }) {
  const tiltRef = useTilt({ max: 5, scale: 1.01 })

  return (
    <Reveal delay={i * 70}>
      <article
        ref={tiltRef}
        className="card card-lift spotlight group relative h-full overflow-hidden p-8 sm:p-9"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Oversized ghost number */}
        <span
          className="pointer-events-none absolute -right-2 -top-6 font-mono text-[5rem] leading-none tracking-tightest text-ink/[0.04] transition-colors duration-500 group-hover:text-gold/15"
          aria-hidden="true"
        >
          {String(i + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-gold transition-all duration-300 group-hover:border-gold-soft group-hover:bg-gold group-hover:text-ink">
            <LineIcon name={card.icon} />
          </span>
          <ArrowUpRight className="h-4 w-4 text-ink-faint transition-all duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </div>

        <h3 className="relative mt-7 text-xl tracking-tightest sm:text-2xl">
          {card.title}
        </h3>
        <p className="relative mt-3 leading-relaxed text-ink-muted">
          {card.description}
        </p>
      </article>
    </Reveal>
  )
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 bg-canvas-alt py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow={skills.eyebrow}
          heading={skills.heading}
          subtitle="Where product thinking, engineering depth, and leadership meet."
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16">
          {skills.cards.map((card, i) => (
            <SkillCard key={card.title} card={card} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
