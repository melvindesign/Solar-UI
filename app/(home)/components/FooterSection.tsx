import Link from 'next/link'
import FooterWordmark from './FooterWordmark'
import SolarUILogo from './SolarUILogo'

const FIGMA_URL = 'https://www.figma.com/community/file/1617663822970891226'

const links = [
  {
    label: 'Product',
    items: [
      { label: 'Changelog', href: '/docs/overview/changelog' },
      { label: 'Foundation', href: '/docs/foundation/colors' },
      { label: 'Components', href: '/docs/components/button' },
      { label: 'MCP', href: '/docs/mcp' },
    ],
  },
  {
    label: 'Ressources',
    items: [
      { label: 'Installation', href: '/docs/overview/installation' },
      { label: 'Theming', href: '/docs/theming/composing-palettes' },
      { label: 'Figma', href: FIGMA_URL, external: true },
      { label: 'Github', href: 'https://github.com/melvindesign/SolarUI', external: true },
    ],
  },
]

export default function FooterSection() {
  return (
    <footer className="border-t border-default-6 bg-default-2">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <SolarUILogo/>
            <p className="mt-2 text-sm leading-relaxed text-default-11">
              Open-source React component library based
              <br />
              on Shadcn/ui and powered by Radix Colors
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-12">
            {links.map((group) => (
              <div key={group.label}>
                <p className="mb-3 text-xs font-medium text-default-12">{group.label}</p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-default-11 transition-colors hover:text-default-12"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 text-xs text-default-10 sm:flex-row">
          <span>© 2026 Solar UI. MIT License.</span>
          <span>Built with Solar UI</span>
        </div>
      </div>

      <FooterWordmark />
    </footer>
  )
}
