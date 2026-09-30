import { footer, nav, profile } from '../data/content'
import { ArrowUpRight } from './icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-night text-canvas">
      {/* Warm glow bleeding in from the contact section */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="shell relative py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-3xl tracking-tightest">{profile.name}</p>
            <p className="mt-4 max-w-sm font-mono text-[0.7rem] uppercase leading-relaxed tracking-eyebrow text-canvas/60">
              {profile.roles}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-6 inline-flex items-center gap-1 font-mono text-[0.72rem] tracking-eyebrow text-gold transition-colors hover:text-gold-soft"
            >
              {profile.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <nav>
              <p className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-canvas/45">
                Navigate
              </p>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="link-underline text-sm text-canvas/85 transition-colors duration-300 hover:text-gold-soft"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <p className="font-mono text-[0.65rem] uppercase tracking-eyebrow text-canvas/45">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-3">
                {footer.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-sm text-canvas/85 transition-colors duration-300 hover:text-gold-soft"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          className="pointer-events-none mt-16 select-none text-center text-[3.5rem] font-semibold leading-none tracking-tightest text-canvas/[0.05] sm:text-[6rem] lg:text-[9rem]"
          aria-hidden="true"
        >
          {profile.name}
        </p>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-night-line pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[0.68rem] uppercase tracking-eyebrow text-canvas/50">
            © {year} {profile.name}. Built with purpose.
          </p>
          <p className="font-mono text-[0.68rem] uppercase tracking-eyebrow text-canvas/50">
            {profile.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
