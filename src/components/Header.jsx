import { useEffect, useState } from 'react'
import { nav, profile } from '../data/content'
import { useActiveSection, useScrollProgress } from '../hooks/useReveal'
import { ArrowUpRight, Close, GitHub, LinkedIn, Menu } from './icons'

const sectionIds = nav.map((item) => item.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const progress = useScrollProgress()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-smooth ${
        scrolled
          ? 'border-b border-line bg-canvas/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-base font-semibold tracking-tightest"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-mono text-[0.8rem] font-medium text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
            F
          </span>
          <span className="transition-colors duration-300 group-hover:text-gold">
            {profile.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                className={`link-underline text-sm transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden lg:block">
          <a
            href={`mailto:${profile.email}`}
            className="btn-primary px-5 py-2.5 text-[0.82rem]"
          >
            Email Me
            <ArrowUpRight />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-ink transition-colors duration-300 hover:border-ink hover:bg-card lg:hidden"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Reading progress */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* Mobile panel */}
      <div
        className={`overflow-hidden bg-canvas transition-all duration-500 ease-smooth lg:hidden ${
          open ? 'max-h-[520px] border-b border-line' : 'max-h-0'
        }`}
      >
        <nav className="shell flex flex-col py-6">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-2xl tracking-tightest text-ink transition-colors duration-200 hover:text-gold"
            >
              {item.label}
            </a>
          ))}

          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="btn-primary mt-6 self-start px-5 py-2.5 text-[0.82rem]"
          >
            Email Me
            <ArrowUpRight />
          </a>

          <div className="mt-6 flex gap-5">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-ink-muted transition-colors hover:text-gold"
            >
              <LinkedIn className="h-4 w-4" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-ink-muted transition-colors hover:text-gold"
            >
              <GitHub className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
