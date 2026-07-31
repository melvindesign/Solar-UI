import { readFileSync } from 'fs'
import { join } from 'path'
import { PATHS } from './paths.js'

export interface TokenMap {
  /** Thème actif, c.-à-d. celui importé en dernier dans theme.css. */
  activeTheme: string
  /** Tous les thèmes importés, disponibles via `data-theme`. */
  availableThemes: string[]
  /** Groupe sémantique → échelle Radix, pour le thème actif. */
  semanticGroups: Record<string, string>
  /** Layout/Field, résolus en rem sur le breakpoint Desktop. */
  fieldRadius: string
  fieldRadiusInner: string
  fieldHeight: string
  fieldPadding: string
  fieldGap: string
}

let cached: TokenMap | null = null

/** L'unité d'espacement Desktop définie par screen.css (Sizes/0,25 = 4px). */
const SPACING_REM = 0.25

/** `calc(var(--spacing) * 9)` → `2.25rem` */
function resolveSpacing(expr: string | undefined, fallback: string): string {
  const m = expr?.match(/var\(--spacing\)\s*\*\s*([\d.]+)/)
  if (!m?.[1]) return fallback
  return `${Number(m[1]) * SPACING_REM}rem`
}

export function parseCssTokens(): TokenMap {
  if (cached) return cached

  // theme.css liste les thèmes ; le dernier importé fournit les défauts.
  const entry = readFileSync(PATHS.themeCss, 'utf-8')
  const availableThemes = [...entry.matchAll(/@import\s+["']\.\/themes\/([\w-]+)\.css["']/g)]
    .map(m => m[1] as string)
  const activeTheme = availableThemes.at(-1) ?? 'stellar'

  const themeCss = readFileSync(join(PATHS.themesDir, `${activeTheme}.css`), 'utf-8')

  // --color-brand-9: var(--orange-9)  →  { brand: 'orange' }
  const semanticGroups: Record<string, string> = {}
  const tokenRegex = /--color-([a-z]+)-\d+:\s*var\(--([a-z]+)-a?\d+\)/g
  let match: RegExpExecArray | null
  while ((match = tokenRegex.exec(themeCss)) !== null) {
    const group = match[1]
    const color = match[2]
    if (group && color && !semanticGroups[group]) semanticGroups[group] = color
  }

  const token = (name: string, fallback: string) =>
    resolveSpacing(themeCss.match(new RegExp(`${name}:\\s*([^;]+)`))?.[1], fallback)

  cached = {
    activeTheme,
    availableThemes,
    semanticGroups,
    fieldRadius: token('--radius-field', '0.5rem'),
    fieldRadiusInner: token('--radius-field-inner', '0.25rem'),
    fieldHeight: token('--spacing-field', '2.25rem'),
    fieldPadding: token('--spacing-field-padding', '0.25rem'),
    fieldGap: token('--spacing-field-gap', '0.25rem'),
  }
  return cached
}
