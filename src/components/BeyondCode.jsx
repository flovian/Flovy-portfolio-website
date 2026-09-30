import { beyondCode } from '../data/content'
import { useTilt } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/* Bold treatments drawn from the gold family, so the section reads as part of
   the same system as Featured Work rather than four flat cream cards. */
const treatments = [
  {
    panel: 'bg-gradient-to-br from-ink via-ink-soft to-night',
    title: 'text-canvas',
    body: 'text-canvas/70',
    glyph: 'text-gold',
    chip: 'border-gold/35 text-gold-soft',
    ring: 'border-gold/20',
    ghost: 'text-canvas/[0.06] group-hover:text-gold/20',
    tag: 'bg-gold text-ink',
  },
  {
    panel: 'bg-gradient-to-br from-gold via-gold-deep to-ink',
    title: 'text-canvas',
    body: 'text-canvas/75',
    glyph: 'text-ink/70',
    chip: 'border-canvas/25 text-canvas/85',
    ring: 'border-canvas/15',
    ghost: 'text-canvas/[0.12] group-hover:text-canvas/25',
    tag: 'bg-ink text-gold',
  },
  {
    panel: 'bg-gradient-to-br from-gold-wash via-gold-soft to-gold',
    title: 'text-ink',
    body: 'text-ink/70',
    glyph: 'text-ink/70',
    chip: 'border-ink/20 text-ink/80',
    ring: 'border-ink/15',
    ghost: 'text-ink/[0.08] group-hover:text-ink/20',
    tag: 'bg-canvas text-ink',
  },
  {
    panel: 'bg-canvas border border-line',
    title: 'text-ink',
    body: 'text-ink-muted',
    glyph: 'text-gold',
    chip: 'border-gold/40 text-gold-deep',
    ring: 'border-gold/20',
    ghost: 'text-ink/[0.05] group-hover:text-gold/15',
    tag: 'bg-gold text-ink',
  },
]

const glyphs = ['◎', '◐', '◈', '✦']

function BeyondCard({ item, treatment, i }) {
  const tiltRef = useTilt({ max: 6, scale: 1.015 })

  return (
    <Reveal delay={i * 80} className="h-full">
      <article
        ref={tiltRef}
        className={`group relative flex h-full flex-col overflow-hidden rounded-card p-7 shadow-panel transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-lift ${treatment.panel}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Oversized ghost glyph bleeding off the corner */}
        <span
          className={`pointer-events-none absolute -right-3 -top-8 select-none text-[7rem] leading-none tracking-tightest transition-colors duration-500 ${treatment.ghost}`}
          aria-hidden="true"
        >
          {glyphs[i % glyphs.length]}
        </span>

        {/* Orbiting ring detail */}
        <span
          className={`pointer-events-none absolute -right-8 top-14 h-24 w-24 rounded-full border ${treatment.ring}`}
          aria-hidden="true"
        />

        <span
          className={`relative grid h-12 w-12 place-items-center rounded-xl border text-lg transition-transform duration-500 ease-smooth group-hover:scale-110 group-hover:rotate-6 ${treatment.chip}`}
        >
          {glyphs[i % glyphs.length]}
        </span>

        <h3 className={`relative mt-8 text-lg tracking-tightest ${treatment.title}`}>
          {item.title}
        </h3>

        <p className={`relative mt-3 text-sm leading-relaxed ${treatment.body}`}>
          {item.description}
        </p>

        {/* Accent bar that fills on hover */}
        <span
          className={`relative mt-7 h-0.5 w-10 rounded-full transition-all duration-500 ease-smooth group-hover:w-full ${treatment.tag}`}
          aria-hidden="true"
        />
      </article>
    </Reveal>
  )
}

export function BeyondCode() {
  return (
    <section id="beyond" className="scroll-mt-24 bg-canvas-alt py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow={beyondCode.eyebrow}
          heading={beyondCode.heading}
          subtitle={beyondCode.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {beyondCode.items.map((item, i) => (
            <BeyondCard
              key={item.title}
              item={item}
              treatment={treatments[i % treatments.length]}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
