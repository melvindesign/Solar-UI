import { Body } from '@/components/ui/body'
import { Code } from '@/components/ui/code'
import { Display } from '@/components/ui/display'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import type { ReactNode } from 'react'

/** Real `tools/call` params for the request shown below. */
const REQUEST = `{
  "name": "get_color_token",
  "arguments": { "group": "brand", "step": 3 }
}`

/**
 * Verbatim output of lib/mcp/tools/get-color-token.ts for the request above.
 * `radixColor` is parsed from the theme stylesheet at runtime, so this is what
 * the deployed server answers — not an illustration written for this page.
 */
const RESPONSE = `{
  "group": "brand",
  "step": 3,
  "radixColor": "orange",
  "tailwindClass": "bg-brand-3",
  "role": "UI element background",
  "example": "Inactive button or input background",
  "antiPatterns": [
    "Never use \`dark:\` prefixes — dark mode is fully automatic via Radix UI color variables.",
    "Never use shadcn/ui default tokens like \`text-muted-foreground\`, \`bg-background\`, \`text-foreground\`, \`text-primary\`. Use SolarUI semantic tokens instead (e.g. \`text-default-11\`, \`bg-default-1\`, \`text-default-12\`, \`bg-brand-9\`).",
    "Never use arbitrary hex values for colors. Always use a semantic group + step (e.g. \`bg-error-3\` instead of \`bg-[#ff0000]\`).",
    "Do not invent new token names. The only valid groups are: default, brand, error, success, warning, info."
  ]
}`

const TOOLS = [
  {
    name: 'get_color_token',
    body: 'Step roles, Tailwind classes, and the anti-patterns to avoid.',
  },
  {
    name: 'get_component',
    body: 'Variants, props, JSX examples, and the install command for one component.',
  },
  {
    name: 'find_component',
    body: 'The right component for a use case, described in plain English.',
  },
  {
    name: 'list_components',
    body: 'Every component, grouped by category.',
  },
  {
    name: 'get_guidelines',
    body: 'Design rules: color, typography, theming, control height.',
  },
]

/** Colors quoted keys, string values, and numbers in a JSON literal. */
function highlight(json: string): ReactNode[] {
  const pattern = /("(?:[^"\\]|\\.)*")(\s*:)?|(\b\d+\b)/g
  const nodes: ReactNode[] = []
  let cursor = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(json)) !== null) {
    if (match.index > cursor) {
      nodes.push(
        <span key={key++} className="text-default-10">
          {json.slice(cursor, match.index)}
        </span>,
      )
    }

    if (match[3]) {
      nodes.push(
        <span key={key++} className="text-brand-11">
          {match[3]}
        </span>,
      )
    } else {
      nodes.push(
        <span key={key++} className={match[2] ? 'text-default-12' : 'text-brand-11'}>
          {match[1]}
        </span>,
      )
      if (match[2]) {
        nodes.push(
          <span key={key++} className="text-default-10">
            {match[2]}
          </span>,
        )
      }
    }

    cursor = match.index + match[0].length
  }

  if (cursor < json.length) {
    nodes.push(
      <span key={key++} className="text-default-10">
        {json.slice(cursor)}
      </span>,
    )
  }

  return nodes
}

function Transcript({ label, json }: { label: string; json: string }) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-body-compact text-default-11">{label}</p>
      <pre className="overflow-x-auto rounded-xl border border-default-6 bg-default-2 p-4 font-mono text-code-compact leading-relaxed wrap-break-word whitespace-pre-wrap">
        <code>{highlight(json)}</code>
      </pre>
    </div>
  )
}

export default function McpSection() {
  return (
    <section className="border-t border-default-6 bg-default-1">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-24">
        <div className="max-w-2xl">
          <Display size="2" className="text-balance">
            The same token, read by a machine
          </Display>
          <Body className="mt-4 max-w-[58ch] text-default-11">
            Solar UI ships a Model Context Protocol server. Assistants query the system instead of
            guessing at variant names. Whichever theme you just applied, the server answers for
            the project&rsquo;s default one — here, <Code>brand-3</Code> in a fourth form.
          </Body>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Transcript label="Request" json={REQUEST} />
          <Transcript label="Response" json={RESPONSE} />
        </div>

        <div className="mt-12 grid gap-x-12 gap-y-8 border-t border-default-6 pt-8 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div>
            <p className="text-body-compact font-medium text-default-12">
              Five tools, one endpoint
            </p>
            <Body size="compact" className="mt-2 text-default-11">
              Point your assistant at the server and it reads the design system directly. No local
              install, no copy-pasted context.
            </Body>
            <Link
              href="/docs/mcp"
              className="mt-4 flex w-fit items-center gap-1.5 text-body-compact text-brand-11 underline-offset-4 hover:underline"
            >
              Set up MCP
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>

          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {TOOLS.map((tool) => (
              <div key={tool.name}>
                <dt>
                  <Code size="compact" className="text-default-12">
                    {tool.name}
                  </Code>
                </dt>
                <dd className="mt-1 text-body-compact text-default-11">{tool.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
