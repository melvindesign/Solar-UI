'use client'

import { Button } from '@/components/ui/button'
import { Desktop, FigmaLogo, GithubLogo, List, Moon, Sun, X } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SolarUILogo from './SolarUILogo'

const FIGMA_URL = 'https://www.figma.com/community/file/1617663822970891226'
const GITHUB_URL = 'https://github.com/melvindesign/SolarUI'

type ThemeMode = 'system' | 'dark' | 'light'

const NEXT_MODE: Record<ThemeMode, ThemeMode> = {
  system: 'dark',
  dark: 'light',
  light: 'system',
}

function applyTheme(mode: ThemeMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else if (mode === 'light') {
    document.documentElement.classList.remove('dark')
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}

/**
 * Cycles system → dark → light. The dropdown-menu version lived here until the
 * button-only release; a single button covers the same three modes.
 */
function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system')

  useEffect(() => {
    setMode((localStorage.getItem('solar-ui') as ThemeMode) || 'system')
  }, [])

  const cycle = () => {
    const next = NEXT_MODE[mode]
    setMode(next)
    localStorage.setItem('solar-ui', next)
    applyTheme(next)
  }

  const Icon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Desktop

  return (
    <Button
      variant="secondary"
      onClick={cycle}
      aria-label={`Theme: ${mode}. Switch to ${NEXT_MODE[mode]}`}
      title={`Theme: ${mode}`}
      className="size-8"
    >
      <Icon size={15} />
    </Button>
  )
}

const navLinkClass =
  'inline-flex items-center gap-1.5 rounded-field px-3 py-1.5 text-label font-medium tracking-body text-default-12 transition-colors hover:bg-default-4'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-default-6 bg-default-1/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-default-12"
        >
          <SolarUILogo className="h-5.5 w-auto shrink-0 text-default-12" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            <FigmaLogo size={15} />
            Figma
          </Link>
          <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            <GithubLogo size={15} />
            Github
          </Link>
          <Link href="/docs" className={navLinkClass}>
            Documentation
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-1 sm:hidden">
          <ThemeToggle />
          <Button
            variant={'ghost'}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out sm:hidden"
        style={{ maxHeight: open ? '16rem' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="flex flex-col gap-1 border-t border-default-6 px-4 py-3">
          <Link
            href={FIGMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 py-2 text-sm text-default-12 transition-colors hover:text-default-11"
          >
            <FigmaLogo size={15} />
            Figma
          </Link>
          <Link
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 py-2 text-sm text-default-12 transition-colors hover:text-default-11"
          >
            <GithubLogo size={15} />
            GitHub
          </Link>
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="py-2 text-sm text-default-12 transition-colors hover:text-default-11"
          >
            Documentation
          </Link>
        </div>
      </div>
    </header>
  )
}
