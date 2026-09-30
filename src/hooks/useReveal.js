import { useCallback, useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* -------------------------------------------------------------------------- */
/*  Scroll reveal                                                             */
/* -------------------------------------------------------------------------- */

export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}

/* -------------------------------------------------------------------------- */
/*  Active section for nav highlighting                                       */
/* -------------------------------------------------------------------------- */

export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return active
}

/* -------------------------------------------------------------------------- */
/*  Page scroll progress (drives the gold rule under the header)              */
/* -------------------------------------------------------------------------- */

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return progress
}

/* -------------------------------------------------------------------------- */
/*  Pointer position, written to CSS vars on :root for shared glow effects    */
/* -------------------------------------------------------------------------- */

export function usePointerGlow() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    // Skip on touch devices — there's no hover to speak of
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      frame = 0
      const root = document.documentElement
      root.style.setProperty('--px', `${x}px`)
      root.style.setProperty('--py', `${y}px`)
    }

    const onMove = (event) => {
      x = event.clientX
      y = event.clientY
      if (!frame) frame = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

/* -------------------------------------------------------------------------- */
/*  Magnetic hover — element drifts toward the cursor                          */
/* -------------------------------------------------------------------------- */

export function useMagnetic({ strength = 0.28, radius = 90 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0

    const reset = () => {
      node.style.transform = ''
    }

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = event.clientX - cx
      const dy = event.clientY - cy
      const distance = Math.hypot(dx, dy)

      if (distance > radius + Math.max(rect.width, rect.height) / 2) {
        reset()
        return
      }

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        node.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame)
      // Ease back to rest rather than snapping
      node.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      reset()
      const t = setTimeout(() => {
        node.style.transition = ''
      }, 500)
      return () => clearTimeout(t)
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [strength, radius])

  return ref
}

/* -------------------------------------------------------------------------- */
/*  3D tilt on pointer move                                                   */
/* -------------------------------------------------------------------------- */

export function useTilt({ max = 6, scale = 1.008 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0

    const onMove = (event) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width
      const py = (event.clientY - rect.top) / rect.height

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rx = (0.5 - py) * max * 2
        const ry = (px - 0.5) * max * 2
        node.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(frame)
      node.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      node.style.transform = ''
      const t = setTimeout(() => {
        node.style.transition = ''
      }, 600)
      return () => clearTimeout(t)
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)

    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [max, scale])

  return ref
}

/* -------------------------------------------------------------------------- */
/*  Horizontal carousel on native scroll + snap                               */
/* -------------------------------------------------------------------------- */

export function useCarousel() {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(1)

  const stepFor = useCallback((track) => {
    const card = track.firstElementChild
    if (!card) return 0
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
    return card.getBoundingClientRect().width + gap
  }, [])

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const step = stepFor(track)
    if (step <= 0) return

    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
    const total = Math.max(1, Math.round((track.scrollWidth - gap) / step))
    setPages(total)
    setPage((current) => Math.min(current, total - 1))
  }, [stepFor])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    measure()

    let frame = 0

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const step = stepFor(track)
        if (step <= 0) return
        const current = Math.round(track.scrollLeft / step)
        setPage(Math.min(Math.max(current, 0), pages - 1))
      })
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(frame)
    }
  }, [measure, stepFor, pages])

  const goTo = useCallback(
    (index) => {
      const track = trackRef.current
      if (!track) return

      const target = Math.min(Math.max(index, 0), pages - 1)
      const step = stepFor(track)
      if (step <= 0) return

      track.scrollTo({
        left: target * step,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
      setPage(target)
    },
    [pages, stepFor],
  )

  return {
    trackRef,
    page,
    pages,
    next: useCallback(() => goTo(page + 1), [goTo, page]),
    prev: useCallback(() => goTo(page - 1), [goTo, page]),
    goTo,
    atStart: page === 0,
    atEnd: page >= pages - 1,
  }
}

/* -------------------------------------------------------------------------- */
/*  Copy to clipboard with a transient "copied" state                         */
/* -------------------------------------------------------------------------- */

export function useCopyToClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), timeout)
    return () => clearTimeout(t)
  }, [copied, timeout])

  const copy = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      return false
    }
  }, [])

  return [copied, copy]
}
