import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full min-w-0 rounded-field border border-transparent px-3 py-3 text-label font-light tracking-[0.4px] transition-colors outline-none placeholder:text-default-11 text-default-12 [background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-default-8),var(--color-default-6))_border-box] focus-visible:ring-3 focus-visible:ring-default-7 aria-invalid:ring-3 aria-invalid:ring-error-7 aria-invalid:[background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-error-7),var(--color-error-7))_border-box] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:[background:var(--color-default-3)] field-sizing-content min-h-16",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
