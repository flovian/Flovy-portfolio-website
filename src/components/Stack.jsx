import { stack } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { LineIcon } from './icons'

function StackCard({ group, i }) {
  return (
    <Reveal delay={i * 70}>
      <article className="card spotlight group relative h-full overflow-hidden p-8 transition-colors duration-300 hover:border-line-strong hover:bg-card-hover sm:p-9">
        <span
          className="pointer-events-none absolute -right-3 -top-8 font-mono text-[6rem] leading-none tracking-tightest text-ink/[0.035] transition-colors duration-500 group-hover:text-gold/12"
          aria-hidden="true"
        >
          {String(i + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-gold transition-all duration-300 group-hover:border-gold-soft group-hover:bg-gold group-hover:text-ink">
            <LineIcon name={group.icon} />
          </span>
          <h3 className="text-lg tracking-tightest sm:text-xl">{group.label}</h3>
        </div>

        <ul className="relative mt-7 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="group/tag relative cursor-default rounded-lg border border-line bg-surface px-3.5 py-2 text-sm text-ink-muted transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-gold hover:bg-ink hover:text-canvas"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 bg-canvas-alt py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow={stack.eyebrow}
          heading={stack.heading}
          subtitle="Organised by what I actually reach for, not by what looks impressive."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16">
          {stack.groups.map((group, i) => (
            <StackCard key={group.label} group={group} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
