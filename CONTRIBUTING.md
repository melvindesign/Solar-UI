# Contributing to Solar UI

Contributions are welcome — bug fixes, new components, documentation improvements, or anything else. Here's what you need to know to get started.

---

## Project structure

```
SolarUI/
├── app/
│   ├── (home)/                 # Landing page (layout + sections)
│   │   ├── layout.tsx          # HTML shell with dark/light mode
│   │   ├── page.tsx
│   │   └── components/         # Landing page sections
│   ├── docs/
│   │   └── layout.tsx          # Nextra docs layout
│   ├── api/
│   │   └── mcp/route.ts        # MCP server (HTTP endpoint)
│   ├── globals.css             # Design tokens, Radix colors, Tailwind theme
│   └── sidebar.css             # Nextra sidebar overrides
│
├── components/
│   ├── ui/                     # 68 Solar UI components
│   ├── demos/                  # Interactive demos used in the docs
│   ├── charts/                 # Recharts-based chart components
│   └── component-preview.tsx   # Preview wrapper for MDX docs
│
├── content/
│   ├── overview/               # Introduction, installation, MCP, changelog
│   ├── components/             # One MDX file per component
│   ├── foundation/             # Colors, typography
│   ├── theming/                # Theming docs
│   └── core/                  # Core utilities
│
├── registry/
│   └── solar/
│       ├── ui/              # Source files for all UI components
│       ├── themes/          # One file per theme (stellar, trevia) — Figma "Theme"
│       ├── radix.css        # Radix Colors primitives — Figma "Mode"
│       ├── screen.css       # Sizes & type scales, desktop/mobile — Figma "Screen"
│       └── theme.css        # Entry point, distributed via the shadcn registry
│
├── lib/
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
└── hooks/
    └── use-mobile.tsx
```

### Key conventions

- **Components** follow the shadcn/ui pattern: CVA for variants, `data-slot` attributes, `cn()` for className merging.
- **Color tokens** use the Radix UI 12-step scale. Semantic groups: `default` (gray), `brand` (orange), `error` (red), `success` (green), `warning` (amber), `info` (sky).
- **No `dark:` prefixes** in component code — dark mode is handled automatically by the Radix color imports scoped to `.dark`.
- **Unified control height** — buttons and inputs share `--height-control: 2.25rem`.

---

## Running locally

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn)

### Setup

```bash
git clone https://github.com/melvindesign/SolarUI.git
cd SolarUI
npm install
npm run dev
```

The site is available at `http://localhost:3000`.

The dev server also exposes:
- Component registry at `http://localhost:3000/r`
- MCP server at `http://localhost:3000/api/mcp`

### Build

```bash
npm run build
```

The `postbuild` script runs [Pagefind](https://pagefind.app) to index the docs for search. You need to run a build at least once to generate the search index if you need it locally.

---

## Adding a component

1. Create `components/ui/your-component.tsx` following the existing patterns.
2. Create `content/components/your-component.mdx` with usage docs (variants, props, examples).
3. Register the component in the shadcn registry if applicable.
4. Run `npm run registry:build` to update the registry manifest.

## Submitting changes

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`.
3. Make your changes and commit.
4. Open a pull request against `main`.

Please keep PRs focused — one feature or fix per PR makes reviews faster.
