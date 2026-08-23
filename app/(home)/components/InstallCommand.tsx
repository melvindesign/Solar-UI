'use client'

import { Button } from '@/components/ui/button'
import { Check, Copy } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

const COMMAND = 'npx shadcn@latest add https://www.solar-ui.com/r/button.json'

export default function InstallCommand() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COMMAND)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex h-field w-full items-center gap-2 rounded-field border border-transparent pl-3 pr-1 font-mono [background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-default-8),var(--color-default-6))_border-box]">
      <span className="min-w-0 flex-1 select-all truncate text-label font-light tracking-[0.4px] text-default-12">
        {COMMAND}
      </span>
      <Button
        variant="ghost"
        size="compact"
        onClick={handleCopy}
        aria-label="Copy install command"
      >
        {copied ? <Check size={15} className="text-success-9" /> : <Copy size={15} />}
      </Button>
    </div>
  )
}
