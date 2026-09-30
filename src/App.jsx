import { usePointerGlow } from './hooks/useReveal'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { Writing } from './components/Writing'
import { BeyondCode } from './components/BeyondCode'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  usePointerGlow()

  return (
    <div className="relative min-h-screen">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
      >
        Skip to content
      </a>

      {/* Paper grain over everything, purely decorative */}
      <div className="grain" aria-hidden="true" />

      <Header />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stack />
        <Writing />
        <BeyondCode />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
