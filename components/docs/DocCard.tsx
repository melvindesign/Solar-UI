import Link from 'next/link'
import React from 'react'

const s = {
  xmlns: 'http://www.w3.org/2000/svg' as const,
  viewBox: '0 0 80 48' as const,
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.5 as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'w-full h-full',
}

const illustrations: Record<string, React.ReactElement> = {
  // ── Section entries ──────────────────────────────────────────
  introduction: (
    <svg {...s}>
      <rect x="16" y="6" width="48" height="40" rx="4" />
      <line x1="24" y1="16" x2="56" y2="16" />
      <line x1="24" y1="22" x2="56" y2="22" />
      <line x1="24" y1="28" x2="48" y2="28" />
      <line x1="24" y1="34" x2="44" y2="34" />
    </svg>
  ),
  installation: (
    <svg {...s}>
      <rect x="8" y="8" width="64" height="36" rx="4" />
      <polyline points="13,15 17,18 13,21" />
      <line x1="20" y1="18" x2="48" y2="18" />
      <polyline points="13,23 17,26 13,29" />
      <line x1="20" y1="26" x2="58" y2="26" />
      <polyline points="13,31 17,34 13,37" />
      <line x1="20" y1="34" x2="40" y2="34" />
    </svg>
  ),
  changelog: (
    <svg {...s}>
      <rect x="12" y="4" width="56" height="42" rx="4" />
      <line x1="20" y1="14" x2="36" y2="14" />
      <line x1="20" y1="22" x2="60" y2="22" />
      <line x1="20" y1="28" x2="52" y2="28" />
      <line x1="20" y1="34" x2="60" y2="34" />
      <line x1="20" y1="40" x2="44" y2="40" />
    </svg>
  ),
  colors: (
    <svg {...s}>
      {/* Centers form equilateral triangle, d≈14 so circles properly overlap */}
      <circle cx="33" cy="28" r="11" />
      <circle cx="47" cy="28" r="11" />
      <circle cx="40" cy="16" r="11" />
    </svg>
  ),
  typography: (
    <svg {...s}>
      <line x1="12" y1="24" x2="68" y2="24" />
      <line x1="20" y1="30" x2="60" y2="30" />
      <line x1="16" y1="18" x2="64" y2="18" />
    </svg>
  ),
  'composing-palettes': (
    <svg {...s}>
      <rect x="8" y="8" width="16" height="16" rx="3" />
      <rect x="28" y="8" width="16" height="16" rx="3" />
      <rect x="48" y="8" width="16" height="16" rx="3" />
      <rect x="18" y="28" width="16" height="16" rx="3" />
      <rect x="38" y="28" width="16" height="16" rx="3" />
    </svg>
  ),
  button: (
    <svg {...s}>
      <rect x="20" y="16" width="40" height="16" rx="8" />
      <line x1="32" y1="24" x2="48" y2="24" />
    </svg>
  ),
}

interface DocCardProps {
  title: string
  href: string
  description: string
  illustration: string
}

export function DocCard({ title, href, description, illustration }: DocCardProps) {
  const illu = illustrations[illustration]
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors no-underline"
    >
      <div className="flex items-center justify-center h-20 p-4 bg-neutral-50 dark:bg-neutral-900 text-neutral-300 dark:text-neutral-600">
        {illu ?? null}
      </div>
      <div className="px-3 pt-2.5 pb-3">
        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {title}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5 leading-relaxed">
          {description}
        </div>
      </div>
    </Link>
  )
}

export function DocGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4 mb-8">
      {children}
    </div>
  )
}
