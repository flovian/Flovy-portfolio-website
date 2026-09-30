import { useState } from 'react'
import { projects } from '../data/content'
import { useTilt } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ArrowUpRight, LineIcon } from './icons'

const iconForCategory = (category) => {
  if (category.includes('Environmental')) return 'product'
  if (category.includes('Nonprofit')) return 'management'
  if (category.includes('AI')) return 'ai'
  return 'code'
}

/* Each project gets a bold band from the gold family so the grid reads as one
   system rather than three identical cream cards. */
const treatments = [
  {
    band: 'bg-gradient-to-br from-gold via-gold-deep to-ink',
    chip: 'border-gold-soft/40 text-canvas/80',
    dot: 'bg-canvas',
    icon: 'text-ink/70',
    ring: 'border-canvas/15',
  },
  {
    band: 'bg-gradient-to-br from-ink via-ink-soft to-night',
    chip: 'border-gold/50 text-gold-soft',
    dot: 'bg-gold',
    icon: 'text-gold',
    ring: 'border-gold/25',
  },
  {
    band: 'bg-gradient-to-br from-gold-wash via-gold-soft to-gold',
    chip: 'border-ink/15 text-ink/70',
    dot: 'bg-ink',
    icon: 'text-ink/70',
    ring: 'border-ink/10',
  },
]

function ProjectCard({ project, treatment, i }) {
  const [open, setOpen] = useState(false)
  const tiltRef = useTilt({ max: 5, scale: 1.012 })
  const hasResponsibilities = Boolean(project.responsibilities?.length)
  const hasConcept = Boolean(project.concept)

  return (
    <Reveal delay={i * 90} className="h-full">
      <article
        ref={tiltRef}
        className="card card-lift spotlight group flex h-full flex-col overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ---- Bold banded header ---- */}
        <div className={`relative h-36 shrink-0 overflow-hidden ${treatment.band}`}>
          <span
            className={`absolute -right-4 -top-5 h-24 w-24 rounded-full border ${treatment.ring}`}
          />
          <span
            className={`absolute -right-10 top-8 h-16 w-16 rounded-full border ${treatment.ring}`}
          />
          <span className="absolute left-4 top-3 h-12 w-12 rounded-full bg-canvas/10 blur-lg" />

          <div className="absolute inset-0 grid place-items-center">
            <LineIcon
              name={iconForCategory(project.category)}
              className={`h-10 w-10 ${treatment.icon}`}
            />
          </div>

          {/* Index + category sit on top of the band, reversed out */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
            <span className="font-mono text-[0.62rem] tracking-eyebrow text-canvas/90">
              {project.index}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-eyebrow backdrop-blur-sm ${treatment.chip}`}
            >
              {project.role.split(' / ')[0]}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 pb-3">
            <span className={`h-1.5 w-1.5 rounded-full ${treatment.dot}`} />
            <span className="font-mono text-[0.58rem] uppercase tracking-eyebrow text-canvas/80">
              {project.category}
            </span>
          </div>
        </div>

        {/* ---- Body ---- */}
        <div className="relative flex flex-1 flex-col p-6">
          <h3 className="text-xl leading-tight tracking-tightest sm:text-[1.4rem]">
            {project.name}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>

          <p className="mt-4 line-clamp-2 border-l-2 border-gold pl-3 font-serif text-[0.8rem] italic leading-relaxed text-ink-soft">
            {project.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[0.62rem] text-ink-muted transition-colors duration-300 group-hover:border-gold-soft group-hover:text-gold"
              >
                {item}
              </li>
            ))}
            {project.tech.length > 4 && (
              <li className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[0.62rem] text-ink-faint">
                +{project.tech.length - 4}
              </li>
            )}
          </ul>

          {/* ---- Expandable detail ---- */}
          <div
            className={`grid transition-all duration-500 ease-smooth ${
              open ? 'mt-5 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="space-y-3.5 border-t border-line pt-4">
                <p className="text-[0.8rem] leading-relaxed text-ink-muted">
                  {project.contribution}
                </p>

                {hasConcept && (
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-eyebrow text-gold">
                      Key concept
                    </p>
                    <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-muted">
                      {project.concept}
                    </p>
                  </div>
                )}

                {hasResponsibilities && (
                  <div>
                    <p className="font-mono text-[0.58rem] uppercase tracking-eyebrow text-gold">
                      Responsibilities
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {project.responsibilities.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[0.8rem] text-ink-muted"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---- Footer actions ---- */}
          <div className="mt-auto flex items-center gap-4 pt-5">
            <a
              href={project.href}
              {...(project.href.startsWith('#')
                ? {}
                : { target: '_blank', rel: 'noreferrer' })}
              className="btn-primary px-4 py-2 text-[0.75rem]"
            >
              {project.cta}
              <ArrowUpRight className="transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="link-underline font-mono text-[0.62rem] uppercase tracking-eyebrow text-ink-muted transition-colors duration-300 hover:text-gold"
            >
              {open ? 'Less' : 'Details'}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow={projects.eyebrow}
          heading={projects.heading}
          subtitle={projects.subtitle}
        />

        {/* All three at once — no carousel */}
        <div className="mt-14 grid items-stretch gap-5 lg:mt-16 lg:grid-cols-3">
          {projects.items.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              treatment={treatments[i % treatments.length]}
              i={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
