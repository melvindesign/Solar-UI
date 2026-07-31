'use client'

import { useEffect, useRef } from 'react'

/**
 * Starfield + shooting stars behind the footer wordmark.
 *
 * Adapted from the Aceternity `stars-background` / `shooting-stars` pair
 * (ui.aceternity.com, by Vijay Verma). Reworked here to (a) measure its own
 * container instead of the viewport, (b) take both colors from Solar UI tokens
 * so light and dark invert correctly, (c) draw dots and trails in a single
 * canvas pass instead of per-frame React state, and (d) stop the loop whenever
 * the band is offscreen, the tab is hidden, or the user asked for less motion.
 */

type Star = {
  x: number
  y: number
  r: number
  baseOpacity: number
  /** Seconds per twinkle cycle, or null for a steady star. */
  twinkle: number | null
}

type Shot = {
  x: number
  y: number
  dx: number
  dy: number
  speed: number
  len: number
}

const STAR_DENSITY = 0.00022
const MIN_DELAY = 1400
const MAX_DELAY = 4600

/** Fades the starfield out at the top edge and at both sides. */
const STARFIELD_MASK = [
  'linear-gradient(to bottom, transparent 0%, black 42%)',
  'linear-gradient(to right, transparent 0%, black 16%, black 84%, transparent 100%)',
].join(', ')

/**
 * Flat colors, deliberately outside the Radix token scale.
 *
 * This band is marketing furniture, not a system component: nothing here is
 * reused, and picking exact values beats snapping to the nearest scale step.
 * The rest of the site stays token-driven — do not copy this exemption.
 */
const INK = {
  light: { dot: '#0B0B0B', shot: '#F76B15' },
  dark: { dot: '#FFFFFF', shot: '#F76B15' },
} as const

function SunMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="h-[0.6em] w-[0.6em] shrink-0"
    >
      <path
        d="M12 0C12.3368 0 12.6703 0.0138134 13 0.0410156V23.958C12.6702 23.9852 12.3368 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0ZM13.7998 0.134766C14.1727 0.190848 14.5396 0.264931 14.9004 0.354492V23.6445C14.5396 23.7341 14.1727 23.8082 13.7998 23.8643V0.134766ZM15.7002 0.583008C16.0753 0.704493 16.4419 0.844566 16.7998 1.00098V22.998C16.4419 23.1545 16.0753 23.2945 15.7002 23.416V0.583008ZM17.5996 1.38672C17.9787 1.58713 18.3466 1.80549 18.7002 2.04395V21.9551C18.3465 22.1936 17.9787 22.4119 17.5996 22.6123V1.38672ZM19.5 2.63574C19.8868 2.94593 20.2542 3.27883 20.5996 3.63379V20.3652C20.2542 20.7202 19.8868 21.0531 19.5 21.3633V2.63574ZM21.3994 4.54395C21.8093 5.05995 22.1784 5.60948 22.5 6.18945V17.8096C22.1784 18.3896 21.8093 18.939 21.3994 19.4551V4.54395ZM23.2998 7.95703C23.7519 9.22046 24 10.5811 24 12C24 13.4185 23.7517 14.7788 23.2998 16.042V7.95703Z"
        fill="#F76B15"
      />
    </svg>
  )
}

export default function FooterWordmark() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    let stars: Star[] = []
    let shots: Shot[] = []
    let width = 0
    let height = 0
    let frame = 0
    let spawnTimer: ReturnType<typeof setTimeout> | null = null
    let running = false
    let visible = false

    let dotColor: string = INK.light.dot
    let shotColor: string = INK.light.shot

    const readColors = () => {
      const ink = document.documentElement.classList.contains('dark') ? INK.dark : INK.light
      dotColor = ink.dot
      shotColor = ink.shot
    }

    const layout = () => {
      const rect = host.getBoundingClientRect()
      width = rect.width
      height = rect.height
      if (width === 0 || height === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.floor(width * height * STAR_DENSITY)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.6 + 0.5,
        baseOpacity: Math.random() * 0.4 + 0.3,
        twinkle: Math.random() < 0.7 ? 0.5 + Math.random() * 0.9 : null,
      }))
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = dotColor
      for (const star of stars) {
        ctx.globalAlpha = star.twinkle
          ? star.baseOpacity *
            (0.55 + 0.45 * Math.abs(Math.sin((time * 0.001) / star.twinkle)))
          : star.baseOpacity
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      ctx.lineWidth = 1.6
      ctx.lineCap = 'round'
      for (const shot of shots) {
        const tailX = shot.x - shot.dx * shot.len
        const tailY = shot.y - shot.dy * shot.len
        const gradient = ctx.createLinearGradient(tailX, tailY, shot.x, shot.y)
        gradient.addColorStop(0, 'transparent')
        gradient.addColorStop(1, shotColor)
        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(shot.x, shot.y)
        ctx.stroke()
      }
    }

    const spawn = () => {
      const fromLeft = Math.random() < 0.5
      // Shallow diagonals read best across a band that is much wider than tall.
      const angle = ((Math.random() * 14 + 11) * Math.PI) / 180
      shots.push({
        x: fromLeft ? -120 : width + 120,
        y: Math.random() * height * 0.5,
        dx: fromLeft ? Math.cos(angle) : -Math.cos(angle),
        dy: Math.sin(angle),
        speed: 5 + Math.random() * 5,
        len: 90 + Math.random() * 110,
      })
      spawnTimer = setTimeout(spawn, MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY))
    }

    const tick = (time: number) => {
      for (const shot of shots) {
        shot.x += shot.dx * shot.speed
        shot.y += shot.dy * shot.speed
      }
      shots = shots.filter(
        (shot) => shot.x > -600 && shot.x < width + 600 && shot.y < height + 300,
      )
      draw(time)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduced.matches) return
      running = true
      frame = requestAnimationFrame(tick)
      spawnTimer = setTimeout(spawn, 700)
    }

    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
      if (spawnTimer) clearTimeout(spawnTimer)
      spawnTimer = null
    }

    const sync = () => {
      if (visible && !document.hidden) start()
      else stop()
    }

    readColors()
    layout()
    draw(performance.now())

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false
        sync()
      },
      { rootMargin: '120px' },
    )
    intersection.observe(host)

    const resizeObserver = new ResizeObserver(() => {
      layout()
      if (!running) draw(performance.now())
    })
    resizeObserver.observe(host)

    // Theme changes swap the token values under us; re-read and repaint.
    const themeObserver = new MutationObserver(() => {
      readColors()
      if (!running) draw(performance.now())
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const onMotionChange = () => {
      stop()
      shots = []
      sync()
      if (!running) draw(performance.now())
    }

    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', onMotionChange)

    return () => {
      stop()
      intersection.disconnect()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div ref={hostRef} className="relative isolate overflow-hidden">
      {/*
        The starfield dissolves into the footer at the top and into the page
        margins at both sides, so the band reads as one continuous block rather
        than a panel bolted underneath.
      */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          maskImage: STARFIELD_MASK,
          WebkitMaskImage: STARFIELD_MASK,
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />

      <p
        className="flex select-none items-center justify-center gap-[0.16em] px-4 py-14 font-semibold leading-none tracking-[-0.04em] sm:py-20"
        style={{ fontSize: 'clamp(3rem, 15vw, 12.5rem)' }}
      >
        <SunMark />
        {/* Pale at the top settling into the surface at the bottom in light,
            the reverse in dark. Flat values, chosen by eye against each band. */}
        <span className="bg-[linear-gradient(to_bottom,#EDEDED,#BEBEBE)] bg-clip-text text-transparent dark:bg-[linear-gradient(to_bottom,#1F1F1F,#525252)]">
          Solar UI
        </span>
      </p>
    </div>
  )
}
