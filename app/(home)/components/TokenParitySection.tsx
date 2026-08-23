'use client'

import { Body } from '@/components/ui/body'
import { Button } from '@/components/ui/button'
import { Code } from '@/components/ui/code'
import { Display } from '@/components/ui/display'
import { CaretDown, Moon, Sun } from '@phosphor-icons/react/dist/ssr'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Palettes that genuinely exist on both sides of the system.
 * Figma names come from the `theme` variable collection of the SolarUI file
 * (`Palette/<name>/<step>`); code names are the semantic groups declared in
 * app/globals.css. `Accent` and `brand` are the same palette under two names.
 */
const PALETTES = [
  { code: 'default', figma: 'Default', radix: 'gray' },
  { code: 'brand', figma: 'Accent', radix: 'orange' },
  { code: 'error', figma: 'Error', radix: 'red' },
] as const

type PaletteId = (typeof PALETTES)[number]['code']

/**
 * Step roles are verbatim from two independent sources that already agree:
 * `figma` is the variable suffix in the Figma file, `role` is what the MCP
 * server returns from get_color_token. Neither is written for this page.
 */
const STEPS = [
  { step: 1, figma: '1 - Background', role: 'App background', prop: 'bg' },
  { step: 2, figma: '2 - Bg Subtle', role: 'Subtle background', prop: 'bg' },
  { step: 3, figma: '3 - Default Element', role: 'UI element background', prop: 'bg' },
  { step: 4, figma: '4 - Hovered Element', role: 'Hovered UI element background', prop: 'bg' },
  { step: 5, figma: '5 - Active Element', role: 'Active or selected element', prop: 'bg' },
  { step: 6, figma: '6 - Subtle Border', role: 'Subtle border', prop: 'border' },
  { step: 7, figma: '7 - Default Border', role: 'UI element border', prop: 'border' },
  { step: 8, figma: '8 - Hovered Border', role: 'Hovered UI element border', prop: 'border' },
  { step: 9, figma: '9 - Solid', role: 'Solid background', prop: 'bg' },
  { step: 10, figma: '10 - Hovered Solid', role: 'Hovered solid background', prop: 'bg' },
  { step: 11, figma: '11 - Text Low', role: 'Low-contrast text', prop: 'text' },
  { step: 12, figma: '12 - Text High', role: 'High-contrast text', prop: 'text' },
] as const

export default function TokenParitySection() {
  const [paletteId, setPaletteId] = useState<PaletteId>('brand')
  const [step, setStep] = useState(3)
  const [resolved, setResolved] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [flash, setFlash] = useState(false)
  /** True once a theme flip has been observed to leave this token's value untouched. */
  const [themeStable, setThemeStable] = useState(false)

  const probeRef = useRef<HTMLSpanElement>(null)
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastReading = useRef<{ key: string; dark: boolean; value: string | null } | null>(null)

  const palette = PALETTES.find((p) => p.code === paletteId) ?? PALETTES[1]
  const detail = STEPS.find((s) => s.step === step) ?? STEPS[8]
  const tailwindClass = `${detail.prop}-${palette.code}-${detail.step}`

  /**
   * The value is never transcribed. A probe element is painted with the token
   * and the browser is asked what that actually resolved to, so the readout
   * cannot drift from the stylesheet.
   */
  const readResolved = useCallback(() => {
    const el = probeRef.current
    if (!el) return null
    el.style.backgroundColor = `var(--color-${palette.code}-${detail.step})`
    return getComputedStyle(el).backgroundColor
  }, [palette.code, detail.step])

  const tokenKey = `${palette.code}-${detail.step}`

  useEffect(() => {
    const value = readResolved()
    setResolved(value)
    setFlash(false)
    setThemeStable(false)
    lastReading.current = {
      key: tokenKey,
      dark: document.documentElement.classList.contains('dark'),
      value,
    }
  }, [readResolved, tokenKey])

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains('dark')
      const value = readResolved()
      const previous = lastReading.current

      setIsDark(nowDark)
      setResolved(value)

      // Only react to an actual theme flip on the token currently on screen.
      if (previous && previous.key === tokenKey && previous.dark !== nowDark) {
        if (previous.value === value) {
          setThemeStable(true)
        } else {
          setThemeStable(false)
          setFlash(true)
          if (flashTimer.current) clearTimeout(flashTimer.current)
          flashTimer.current = setTimeout(() => setFlash(false), 900)
        }
      }

      lastReading.current = { key: tokenKey, dark: nowDark, value }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
      if (flashTimer.current) clearTimeout(flashTimer.current)
    }
  }, [readResolved, tokenKey])

  const flipTheme = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    localStorage.setItem('solar-ui', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <section className="mx-auto max-w-6xl px-4 pt-28 pb-24">
      <span ref={probeRef} aria-hidden className="pointer-events-none fixed size-0 opacity-0" />

      <div className="max-w-2xl">
        <Display size="2" className="text-balance">
          The same token, on both sides
        </Display>
        <Body className="mt-4 max-w-[58ch] text-default-11">
          Every color in Solar UI exists once. It carries a Figma variable name, a CSS custom
          property, and a Tailwind class — three names for one decision. Pick a step, then switch
          the theme: the names hold, the value moves.
        </Body>
      </div>

      {/* Palette selector */}
      <div className="mt-10 flex flex-wrap items-center gap-2">
        {PALETTES.map((p) => (
          <Button
            key={p.code}
            variant={p.code === paletteId ? 'default' : 'secondary'}
            size="compact"
            aria-pressed={p.code === paletteId}
            onClick={() => setPaletteId(p.code)}
          >
            <span
              aria-hidden
              className="size-2.5 rounded-full transition-colors duration-300 ease-out motion-reduce:transition-none"
              style={{ backgroundColor: `var(--color-${p.code}-9)` }}
            />
            {p.figma}
          </Button>
        ))}
        <p className="ml-1 text-body-compact text-default-11">
          Radix <Code size="compact">{palette.radix}</Code>
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        {/* The ramp */}
        <ul className="overflow-hidden rounded-xl border border-default-6 bg-default-1">
          {STEPS.map((s) => {
            const selected = s.step === step
            return (
              <li
                key={s.step}
                className="relative border-b border-default-6 last:border-b-0"
              >
                {/*
                  The one motion idea of this section: on a theme flip or a
                  palette switch the color travels while every name stays put.
                */}
                {/*
                  z-10 keeps the swatch above the row's hover and focus fills:
                  pointer states belong to the line, never to the color.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 transition-colors duration-300 ease-out motion-reduce:transition-none sm:w-16"
                  style={{ backgroundColor: `var(--color-${palette.code}-${s.step})` }}
                />
                <button
                  type="button"
                  aria-expanded={selected}
                  onClick={() => setStep(s.step)}
                  className="relative flex w-full items-center gap-3 py-3 pr-3 pl-16 text-left outline-none transition-colors hover:bg-default-2 focus-visible:bg-default-2 focus-visible:ring-3 focus-visible:ring-default-7 focus-visible:ring-inset sm:pl-24"
                >
                  <Code
                    size="compact"
                    className="w-5 shrink-0 tabular-nums text-default-11"
                  >
                    {s.step}
                  </Code>
                  <span className="min-w-0 flex-1 truncate text-body-compact text-default-12">
                    {s.role}
                  </span>
                  <Code
                    size="compact"
                    className="hidden shrink-0 text-default-11 sm:block"
                  >
                    {`${s.prop}-${palette.code}-${s.step}`}
                  </Code>
                  <CaretDown
                    size={12}
                    aria-hidden
                    className={`shrink-0 text-default-11 transition-transform duration-200 motion-reduce:transition-none ${
                      selected ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    selected ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    {/*
                      Remounting on open replays the stagger: the three names
                      arrive as the list of three the section is about.
                    */}
                    <dl
                      key={selected ? 'open' : 'closed'}
                      className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 pr-3 pb-4 pl-16 text-body-compact sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:pl-24"
                    >
                      {[
                        {
                          label: 'Figma',
                          value: `Palette/${palette.figma}/${s.figma}`,
                        },
                        {
                          label: 'CSS',
                          value: `--color-${palette.code}-${s.step}`,
                        },
                        {
                          label: 'Tailwind',
                          value: `${s.prop}-${palette.code}-${s.step}`,
                        },
                      ].map((line, index) => (
                        <div
                          key={line.label}
                          className="col-span-2 grid grid-cols-subgrid animate-token-line motion-reduce:animate-none"
                          style={{ animationDelay: `${index * 70}ms` }}
                        >
                          <dt className="text-default-11">{line.label}</dt>
                          <dd className="min-w-0">
                            <Code size="compact" className="wrap-break-word text-default-12">
                              {line.value}
                            </Code>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Readout */}
        <div className="rounded-xl border border-default-6 bg-default-2 p-5 lg:sticky lg:top-24">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-10 shrink-0 rounded-lg border border-default-6 transition-colors duration-300 ease-out motion-reduce:transition-none"
              style={{ backgroundColor: `var(--color-${palette.code}-${detail.step})` }}
            />
            <div className="min-w-0">
              <p className="truncate text-body-compact font-medium text-default-12">
                {detail.role}
              </p>
              <Code size="compact" className="text-default-11">
                {tailwindClass}
              </Code>
            </div>
          </div>

          <div className="mt-5 border-t border-default-6 pt-4">
            <p className="text-body-compact text-default-11">Resolved value</p>
            <Code
              size="compact"
              className={`mt-1 block rounded-md px-2 py-1.5 wrap-break-word transition-colors duration-500 motion-reduce:transition-none ${
                flash ? 'bg-brand-4 text-brand-12' : 'bg-default-3 text-default-12'
              }`}
            >
              {resolved ?? ' '}
            </Code>
            <p className="mt-3 text-body-compact text-default-11">
              Read from the browser, not from a table.
            </p>
          </div>

          <div className="mt-5 border-t border-default-6 pt-4">
            <Button variant="secondary" className="w-full" onClick={flipTheme}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {isDark ? 'light' : 'dark'}
            </Button>
            <p className="mt-3 text-body-compact text-default-11">
              {themeStable ? (
                <>
                  This step holds the same value in both themes — Radix keeps solid accents fixed,
                  so the name and the color both stayed put. Try step 3 or 12 to watch the value
                  move while the names do not.
                </>
              ) : (
                <>
                  Three names above, one value below. Flip the theme: the names hold, because there
                  is no{' '}
                  <Code size="compact" className="text-default-12">
                    dark:
                  </Code>{' '}
                  override anywhere in the system.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
