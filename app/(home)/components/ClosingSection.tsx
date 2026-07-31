'use client'

import { Body } from '@/components/ui/body'
import { Button } from '@/components/ui/button'
import { Display } from '@/components/ui/display'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ArrowUpRight, Check, Copy, FigmaLogo } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useRef, useState } from 'react'

const FIGMA_URL = 'https://www.figma.com/community/file/1617663822970891226'
const REGISTRY_COMMAND = 'npx shadcn@latest add https://www.solar-ui.com/r/solar-ui.json'
const MCP_ENDPOINT = 'https://solar-ui.com/api/mcp'

function CopyField({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <InputGroup className="font-mono">
      <InputGroupInput readOnly value={value} aria-label={label} className="select-all" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={handleCopy}
          size="icon-sm"
          aria-label={copied ? `${label} copied` : `Copy ${label}`}
        >
          <span key={String(copied)} className="animate-token-line motion-reduce:animate-none">
            {copied ? <Check size={15} className="text-success-9" /> : <Copy size={15} />}
          </span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

function Door({
  heading,
  body,
  children,
}: {
  heading: string
  body: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 py-8 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
      <div>
        <h3 className="text-title-6 font-medium text-default-12">{heading}</h3>
        <Body size="compact" className="mt-1.5 text-default-11">
          {body}
        </Body>
      </div>
      <div className="mt-auto">{children}</div>
    </div>
  )
}

export default function ClosingSection() {
  return (
    <section className="border-t border-default-6 bg-default-2">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-24">
        <div className="max-w-2xl">
          <Display size="2" className="text-balance">
            Three ways in
          </Display>
          <Body className="mt-4 max-w-[52ch] text-default-11">
            The system is one thing, reachable from wherever you work. Take the code, open the file,
            or hand the endpoint to your assistant.
          </Body>
        </div>

        <div className="mt-12 grid divide-y divide-default-6 border-y border-default-6 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-8">
          <Door
            heading="Your codebase"
            body="Components are copied into your project through the shadcn registry. No package, no lock-in."
          >
            <CopyField value={REGISTRY_COMMAND} label="install command" />
          </Door>

          <Door
            heading="Your design file"
            body="Every component, color token and type style, published on Figma Community."
          >
            <Button variant="secondary" className="w-full" asChild>
              <Link href={FIGMA_URL} target="_blank" rel="noopener noreferrer">
                <FigmaLogo size={16} />
                Open in Figma
                <ArrowUpRight size={14} aria-hidden />
              </Link>
            </Button>
          </Door>

          <Door
            heading="Your assistant"
            body="The MCP endpoint. Point Claude, Cursor or Copilot at it and they read the system directly."
          >
            <CopyField value={MCP_ENDPOINT} label="MCP endpoint" />
          </Door>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button variant="primary" asChild>
            <Link href="/docs/overview/installation">Start installing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/docs/components/button">
              Browse the components
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
