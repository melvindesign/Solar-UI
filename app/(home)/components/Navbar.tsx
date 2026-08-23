'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Desktop, FigmaLogo, GithubLogo, List, Moon, Sun, X } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SolarUILogo from './SolarUILogo'

const FIGMA_URL = 'https://www.figma.com/community/file/1617663822970891226'

type ThemeMode = 'system' | 'dark' | 'light'

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

function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = (localStorage.getItem('solar-ui') as ThemeMode) || 'system'
    setMode(saved)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const select = (next: ThemeMode) => {
    setMode(next)
    localStorage.setItem('solar-ui', next)
    applyTheme(next)
    setIsDark(
      next === 'dark' ||
        (next === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" aria-label="Toggle theme" className="size-8">
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-28">
        <DropdownMenuItem onClick={() => select('system')} className="gap-2">
          <Desktop size={14} />
          System
          {mode === 'system' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-9" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select('dark')} className="gap-2">
          <Moon size={14} />
          Dark
          {mode === 'dark' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-9" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => select('light')} className="gap-2">
          <Sun size={14} />
          Light
          {mode === 'light' && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-9" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
        <NavigationMenu className="hidden items-center gap-2 sm:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={FIGMA_URL} target="_blank" rel="noopener noreferrer">
                <FigmaLogo/>
                  Figma
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="https://github.com/melvindesign/SolarUI" target="_blank" rel="noopener noreferrer">
                  <GithubLogo/>
                  Github
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Documentation</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <ThemeToggle />
          </NavigationMenuList>
        </NavigationMenu>

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
            href="https://github.com/melvindesign/SolarUI"
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
