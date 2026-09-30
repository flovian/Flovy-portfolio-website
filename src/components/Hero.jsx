import { hero, profile, socials } from '../data/content'
import { useCopyToClipboard, useMagnetic } from '../hooks/useReveal'
import { ArrowRight, Check, Copy, Download, Pin } from './icons'

function MagneticButton({ as: Tag = 'a', className = '', children, ...props }) {
  const ref = useMagnetic({ strength: 0.22, radius: 70 })

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  )
}

function SocialLink({ href, label, children }) {
  const ref = useMagnetic({ strength: 0.3, radius: 40 })

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-eyebrow text-ink-muted transition-colors duration-300 hover:text-gold"
    >
      {children || label}
      <span className="h-px w-0 bg-gold transition-all duration-300 ease-smooth group-hover:w-3.5" />
    </a>
  )
}

export function Hero() {
  const [copied, copy] = useCopyToClipboard()

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Warm ambient washes */}
      <div className="pointer-events-none absolute -right-48 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-wash/80 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-3xl" />

      {/* Fine rule grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(185,133,62,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(185,133,62,0.08) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage:
            'radial-gradient(60% 50% at 70% 30%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(60% 50% at 70% 30%, black, transparent 75%)',
        }}
      />

      <div className="shell relative grid items-center gap-16 pb-20 lg:grid-cols-12 lg:gap-14 lg:pb-28">
        {/* ---------- Left: typography ---------- */}
        <div className="lg:col-span-7">
          <div className="flex animate-fade-up items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <p className="eyebrow">{profile.roles}</p>
          </div>

          <h1 className="mt-7 text-[2.75rem] leading-[1.03] sm:text-6xl lg:text-[4.9rem]">
            {hero.headline.map((line, i) => (
              <span
                key={line}
                className="block animate-fade-up"
                style={{ animationDelay: `${140 + i * 110}ms` }}
              >
                {i === hero.highlight ? (
                  <>
                    {line.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-gradient-gold">
                      {line.split(' ').slice(-1)[0]}
                    </span>
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-9 max-w-xl animate-fade-up text-lg leading-relaxed text-ink sm:text-xl"
            style={{ animationDelay: '480ms' }}
          >
            {hero.supporting}
          </p>

          <p
            className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-ink-muted"
            style={{ animationDelay: '550ms' }}
          >
            {hero.paragraph}
          </p>

          <div
            className="mt-11 flex animate-fade-up flex-wrap items-center gap-3"
            style={{ animationDelay: '620ms' }}
          >
            {hero.actions.map((action) => (
              <MagneticButton
                key={action.label}
                href={action.href}
                {...(action.download ? { download: '' } : {})}
                className={action.variant === 'primary' ? 'btn-primary' : 'btn-ghost'}
              >
                {action.variant === 'primary' ? <ArrowRight /> : <Download />}
                {action.label}
              </MagneticButton>
            ))}

            <MagneticButton
              href={`mailto:${profile.email}`}
              onClick={async (event) => {
                event.preventDefault()
                const ok = await copy(profile.email)
                if (!ok) window.location.href = `mailto:${profile.email}`
              }}
              className="btn px-4 py-3 text-ink-muted hover:text-gold"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="h-4 w-4 text-gold" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only sm:not-sr-only">
                {copied ? 'Copied' : 'Copy email'}
              </span>
            </MagneticButton>
          </div>

          <p
            className="mt-9 animate-fade-up font-serif text-base italic text-ink-muted"
            style={{ animationDelay: '690ms' }}
          >
            {profile.availability}
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-7 gap-y-4 border-t border-line pt-6"
            style={{ animationDelay: '760ms' }}
          >
            {socials.map((item) => (
              <SocialLink key={item.label} href={item.href} label={item.label} />
            ))}
            <span className="flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-eyebrow text-ink-faint">
              <Pin className="h-3.5 w-3.5 text-gold" />
              {profile.location}
            </span>
          </div>
        </div>

        {/* ---------- Right: portrait ---------- */}
        <div className="lg:col-span-5">
          <div className="relative animate-fade-in" style={{ animationDelay: '260ms' }}>
            {/* Offset gold frame behind the photo */}
            <div
              className="absolute -right-3 -top-3 h-full w-full rounded-panel border border-gold/35 sm:-right-4 sm:-top-4"
              aria-hidden="true"
            />
            <div className="blob -right-8 top-10 h-32 w-32 bg-gold/25" aria-hidden="true" />
            <div className="blob -bottom-10 -left-10 h-36 w-36 bg-gold-soft/45" aria-hidden="true" />

            <div className="group relative overflow-hidden rounded-panel border border-line bg-card">
              <div className="aspect-square w-full overflow-hidden sm:aspect-[4/5]">
                <img
                  src={profile.heroImage}
                  alt={`${profile.name}, ${profile.roles}`}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-[1.04]"
                  width="400"
                  height="400"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Bottom scrim + caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/75 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-eyebrow text-gold-soft">
                    Based in
                  </p>
                  <p className="mt-1 text-sm text-canvas">{profile.location}</p>
                </div>
                <span className="rounded-full border border-canvas/25 bg-canvas/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-eyebrow text-canvas backdrop-blur-sm">
                  Software Developer
                </span>
              </div>
            </div>

            {/* Floating stat-style chips */}
            <div className="absolute -left-4 top-1/3 hidden -translate-y-1/2 rounded-2xl border border-line bg-surface px-5 py-4 shadow-lift sm:block">
              <p className="font-mono text-[0.58rem] uppercase tracking-eyebrow text-ink-faint">
                Focus
              </p>
              <p className="mt-1.5 text-sm text-ink">Engineering leadership</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
