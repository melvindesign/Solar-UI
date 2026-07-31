'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Body } from '@/components/ui/body'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Code } from '@/components/ui/code'
import { Display } from '@/components/ui/display'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Title } from '@/components/ui/title'
import { ArrowRight, Check, WarningCircle } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * The two themes shipped with Solar UI. `primitives` names the Radix families
 * each theme maps its semantic groups onto; those primitive variables live in
 * radix.css and resolve regardless of the active theme, so a card can paint
 * Trevia's colors while Stellar is still the theme on screen.
 */
type Theme = {
  id: 'stellar' | 'trevia'
  name: string
  file: string
  lineCount: number
  primitives: string[]
  summary: string
  faces: string
}

const THEMES: Theme[] = [
  {
    id: 'stellar',
    name: 'Stellar',
    file: 'themes/stellar.css',
    lineCount: 171,
    primitives: ['gray-9', 'orange-9', 'red-9', 'green-9', 'amber-9', 'sky-9'],
    summary: 'gray · orange · Geist',
    faces: 'Geist',
  },
  {
    id: 'trevia',
    name: 'Trevia',
    file: 'themes/trevia.css',
    lineCount: 151,
    primitives: ['slate-9', 'blue-9', 'tomato-9', 'jade-9', 'orange-9', 'cyan-9'],
    summary: 'slate · blue · Poppins',
    faces: 'Poppins + Inter',
  },
]

/** The axes the two files disagree on. Values read from registry/solar/themes/. */
const AXES = [
  { axis: 'Neutral family', stellar: 'gray', trevia: 'slate' },
  { axis: 'Accent', stellar: 'orange', trevia: 'blue' },
  { axis: 'Error', stellar: 'red', trevia: 'tomato' },
  { axis: 'Header / body face', stellar: 'Geist', trevia: 'Poppins / Inter' },
  { axis: 'Type scale', stellar: 'Small', trevia: 'Medium' },
  {
    axis: 'Field radius',
    stellar: '0.5rem',
    trevia: '0.75rem',
    chip: { stellar: 'calc(var(--spacing) * 2)', trevia: 'calc(var(--spacing) * 3)' },
  },
  { axis: 'Field height', stellar: '2.25rem', trevia: '2.5rem' },
] as const

const STORAGE_KEY = 'solar-ui-theme'

/**
 * A field-shaped chip: 40×24 is wide and tall enough that 8px and 12px read as
 * two different corners. A small square would clamp both to a circle and turn a
 * real difference into a false one.
 */
function RadiusChip({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-6 w-10 border border-default-8 align-middle"
      style={{ borderRadius: value }}
    />
  )
}

function ThemeCard({
  theme,
  active,
  onSelect,
}: {
  theme: Theme
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={`group flex flex-col gap-4 rounded-xl border p-5 text-left outline-none transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-default-7 motion-reduce:transition-none ${
        active
          ? 'border-brand-8 bg-brand-2'
          : 'border-default-6 bg-default-2 hover:border-default-8 hover:bg-default-3'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="text-title-6 font-medium text-default-12">{theme.name}</span>
        {active ? (
          <span className="flex items-center gap-1 text-body-compact text-brand-11">
            <Check size={13} weight="bold" aria-hidden />
            Applied
          </span>
        ) : (
          <span className="text-body-compact text-default-11 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
            Apply
          </span>
        )}
      </span>

      <span aria-hidden className="flex gap-1.5">
        {theme.primitives.map((token) => (
          <span
            key={token}
            className="h-6 flex-1 rounded-sm"
            style={{ backgroundColor: `var(--${token})` }}
          />
        ))}
      </span>

      <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-body-compact text-default-11">{theme.summary}</span>
        <span className="font-mono text-code-compact text-default-10">
          {theme.file} · {theme.lineCount} lines
        </span>
      </span>
    </button>
  )
}

/** One bento cell: a label, the live components, and what to watch in them. */
function Tile({
  label,
  watch,
  className = '',
  delay,
  children,
}: {
  label: string
  watch: string
  className?: string
  delay: number
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex animate-token-line flex-col gap-5 rounded-xl border border-default-6 bg-default-2 p-5 motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-body-compact font-medium text-default-12">{label}</p>
      <div className="flex-1">{children}</div>
      <p className="text-body-compact text-default-11">{watch}</p>
    </div>
  )
}

export default function ThemeFileSection() {
  const [themeId, setThemeId] = useState<Theme['id']>('stellar')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'trevia' || current === 'stellar') setThemeId(current)
  }, [])

  const apply = (id: Theme['id']) => {
    setThemeId(id)
    document.documentElement.setAttribute('data-theme', id)
    localStorage.setItem(STORAGE_KEY, id)
  }

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  return (
    <section className="border-t border-default-6">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-24">
        <div className="max-w-2xl">
          <Display size="2" className="text-balance">
            The same components, in another theme
          </Display>
          <Body className="mt-4 max-w-[58ch] text-default-11">
            A theme reassigns variables — palettes, type faces, the type scale, the geometry of a
            field. Solar UI ships two. Apply Trevia and every component below changes identity,
            with no variant to pass and not one line of component code touched.
          </Body>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {THEMES.map((t) => (
            <ThemeCard
              key={t.id}
              theme={t}
              active={t.id === themeId}
              onSelect={() => apply(t.id)}
            />
          ))}
        </div>

        <p className="mt-3 text-body-compact text-default-11">
          Applying a theme sets <Code size="compact">data-theme</Code> on{' '}
          <Code size="compact">&lt;html&gt;</Code> — one attribute selector, no{' '}
          <Code size="compact">!important</Code>, no <Code size="compact">dark:</Code> branch.
          Everything on this page follows.
        </p>

        {/*
          Remounting on a theme change replays the stagger, so the bento reads as
          the thing that just moved rather than as a static component gallery.
        */}
        <div key={theme.id} className="mt-8 grid gap-3 lg:grid-cols-3">
          <Tile
            label="Form"
            watch="Control height, corner radius and label size are theme decisions — the markup is identical in both."
            className="lg:col-span-2 lg:row-span-2"
            delay={0}
          >
            <div className="flex flex-col gap-4">
              <Field>
                <FieldLabel htmlFor="theme-project">Project name</FieldLabel>
                <Input id="theme-project" defaultValue="Aurora" readOnly />
              </Field>

              <Field>
                <FieldLabel htmlFor="theme-visibility">Visibility</FieldLabel>
                <Select defaultValue="private">
                  <SelectTrigger id="theme-visibility" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="theme-notes">Release notes</FieldLabel>
                <Textarea
                  id="theme-notes"
                  rows={3}
                  defaultValue="Ships the new billing screen and drops the legacy export path."
                  readOnly
                />
              </Field>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox id="theme-approval" defaultChecked />
                  <label htmlFor="theme-approval" className="text-label text-default-12">
                    Require approval
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="theme-deploy" defaultChecked />
                  <label htmlFor="theme-deploy" className="text-label text-default-12">
                    Auto-deploy
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Save changes</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
          </Tile>

          <Tile
            label="Type"
            watch={`Header and body faces, and the whole scale — currently ${theme.faces}.`}
            delay={80}
          >
            {/* Four rungs of the scale, so the jump from Small to Medium is visible. */}
            <div className="flex flex-col gap-2">
              <Display size="4" className="text-balance">
                Aurora
              </Display>
              <Title size="5">Deployment overview</Title>
              <Body>Every check passed on this revision.</Body>
              <Body size="compact" className="text-default-11">
                Finished in 4.2s · 12 minutes ago
              </Body>
            </div>
          </Tile>

          <Tile
            label="Status"
            watch="Error, success, warning and info are six palettes the theme remaps together."
            delay={160}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="primary">Live</Badge>
                <Badge variant="secondary">Draft</Badge>
                <Badge variant="destructive">Failed</Badge>
                <Badge variant="outline">Archived</Badge>
              </div>
              <Alert variant="destructive">
                <WarningCircle size={16} aria-hidden />
                <AlertTitle>Build failed</AlertTitle>
                <AlertDescription>Two checks did not pass on this revision.</AlertDescription>
              </Alert>
            </div>
          </Tile>

          <Tile
            label="Controls"
            watch="Filled tracks, selected tabs and solid fills all resolve to the theme's accent."
            className="lg:col-span-3"
            delay={240}
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Tabs defaultValue="overview">
                <TabsList className="w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="flex flex-col gap-4">
                <Slider defaultValue={[62]} max={100} aria-label="Threshold" />
                <div className="flex items-center gap-3">
                  <Progress value={72} />
                  <span className="shrink-0 text-body-compact tabular-nums text-default-11">
                    72%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <AvatarGroup>
                  {['MA', 'JD', 'RK'].map((initials) => (
                    <Avatar key={initials} size="lg">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  ))}
                  <AvatarGroupCount>+2</AvatarGroupCount>
                </AvatarGroup>
                <span className="text-body-compact text-default-11">5 collaborators</span>
              </div>
            </div>
          </Tile>
        </div>

        {/* What a theme carries */}
        <div className="mt-12 grid gap-x-12 gap-y-8 border-t border-default-6 pt-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div>
            <p className="text-body-compact font-medium text-default-12">
              A theme is not only color
            </p>
            <Body size="compact" className="mt-2 text-default-11">
              The two files disagree on seven axes, and each is one CSS file of about 160 lines.
              Writing a third means reassigning the same names to your own.
            </Body>
            <Link
              href="/docs/theming/composing-palettes"
              className="mt-4 flex w-fit items-center gap-1.5 text-body-compact text-brand-11 underline-offset-4 hover:underline"
            >
              Write your own theme
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          <dl className="grid grid-cols-3 gap-x-4 text-body-compact">
            {/*
              The header's first cell must occupy its column: an `sr-only` <dt>
              is absolutely positioned and would shift both labels one column
              left, off the values they name.
            */}
            <div className="col-span-3 grid grid-cols-subgrid border-b border-default-6 pb-2 text-default-11">
              <dt>
                <span className="sr-only">Axis</span>
              </dt>
              <dd className={themeId === 'stellar' ? 'text-default-12' : ''}>Stellar</dd>
              <dd className={themeId === 'trevia' ? 'text-default-12' : ''}>Trevia</dd>
            </div>
            {AXES.map((row) => (
              <div
                key={row.axis}
                className="col-span-3 grid grid-cols-subgrid border-b border-default-6 py-2 last:border-b-0"
              >
                <dt className="text-default-11">{row.axis}</dt>
                <dd
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono ${
                    themeId === 'stellar' ? 'text-default-12' : 'text-default-10'
                  }`}
                >
                  {row.stellar}
                  {'chip' in row ? <RadiusChip value={row.chip.stellar} /> : null}
                </dd>
                <dd
                  className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono ${
                    themeId === 'trevia' ? 'text-default-12' : 'text-default-10'
                  }`}
                >
                  {row.trevia}
                  {'chip' in row ? <RadiusChip value={row.chip.trevia} /> : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
