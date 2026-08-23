import { readFileSync } from 'fs';
import { join } from 'path';
import { PATHS } from './paths.js';
let cached = null;
/** L'unité d'espacement Desktop définie par screen.css (Sizes/0,25 = 4px). */
const SPACING_REM = 0.25;
/** `calc(var(--spacing) * 9)` → `2.25rem` */
function resolveSpacing(expr, fallback) {
    const m = expr?.match(/var\(--spacing\)\s*\*\s*([\d.]+)/);
    if (!m?.[1])
        return fallback;
    return `${Number(m[1]) * SPACING_REM}rem`;
}
export function parseCssTokens() {
    if (cached)
        return cached;
    // theme.css liste les thèmes ; le dernier importé fournit les défauts.
    const entry = readFileSync(PATHS.themeCss, 'utf-8');
    const availableThemes = [...entry.matchAll(/@import\s+["']\.\/themes\/([\w-]+)\.css["']/g)]
        .map(m => m[1]);
    const activeTheme = availableThemes.at(-1) ?? 'stellar';
    const themeCss = readFileSync(join(PATHS.themesDir, `${activeTheme}.css`), 'utf-8');
    // --color-brand-9: var(--orange-9)  →  { brand: 'orange' }
    const semanticGroups = {};
    const tokenRegex = /--color-([a-z]+)-\d+:\s*var\(--([a-z]+)-a?\d+\)/g;
    let match;
    while ((match = tokenRegex.exec(themeCss)) !== null) {
        const group = match[1];
        const color = match[2];
        if (group && color && !semanticGroups[group])
            semanticGroups[group] = color;
    }
    const token = (name, fallback) => resolveSpacing(themeCss.match(new RegExp(`${name}:\\s*([^;]+)`))?.[1], fallback);
    cached = {
        activeTheme,
        availableThemes,
        semanticGroups,
        fieldRadius: token('--radius-field', '0.5rem'),
        fieldRadiusInner: token('--radius-field-inner', '0.25rem'),
        fieldHeight: token('--spacing-field', '2.25rem'),
        fieldPadding: token('--spacing-field-padding', '0.25rem'),
        fieldGap: token('--spacing-field-gap', '0.25rem'),
    };
    return cached;
}
