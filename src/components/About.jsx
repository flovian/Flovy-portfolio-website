import { about, profile } from '../data/content'
import { useTilt } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { ArrowUpRight, GitHub, LinkedIn, Mail } from './icons'

export function About() {
  const tiltRef = useTilt({ max: 4, scale: 1.005 })

  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Left: image ---------- */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="blob -left-12 -top-10 h-40 w-40 bg-gold-wash" aria-hidden="true" />

                <div
                  ref={tiltRef}
                  className="relative overflow-hidden rounded-panel border border-line bg-card shadow-panel"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <img
                      src={profile.aboutImage}
                      alt={`${profile.name} at work`}
                      className="h-full w-full object-cover"
                      width="1280"
                      height="853"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
                    <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-canvas/25 bg-canvas/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-eyebrow text-canvas backdrop-blur-sm">
                      Behind the work
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-line bg-surface px-6 py-5">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-eyebrow text-ink-faint">
                        Works across
                      </p>
                      <p className="mt-1.5 text-sm text-ink">
                        Technology · Product · People
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      {[Mail, LinkedIn, GitHub].map((Icon, i) => (
                        <span
                          key={i}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-line text-gold"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Gold corner accent */}
                <span
                  className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 rounded-br-panel border-b-2 border-r-2 border-gold"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Reveal>

          {/* ---------- Right: copy ---------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="text-3xl leading-tight tracking-tightest sm:text-[2.6rem] sm:leading-[1.12]">
                {about.lead.split('. ').map((part, i, arr) => (
                  <span
                    key={part}
                    className={i < arr.length - 1 ? 'text-gold' : ''}
                  >
                    {part}
                    {i < arr.length - 1 ? '. ' : ''}
                  </span>
                ))}
              </h3>
            </Reveal>

            <div className="mt-9 space-y-5">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={paragraph} delay={i * 60}>
                  <p className="leading-relaxed text-ink-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={280}>
              <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
                {[
                  'Engineering Leadership',
                  'Software Development',
                  'AI',
                  'Open Source',
                  'Product Development',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-ink-muted transition-colors duration-300 hover:border-gold-soft hover:text-gold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={340}>
              <a
                href="#work"
                className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-gold"
              >
                <span className="link-underline">See the work behind this</span>
                <ArrowUpRight className="transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
