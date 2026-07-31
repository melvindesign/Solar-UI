"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "hover:text-default-12 focus-visible:border-default-8 focus-visible:ring-default-7 aria-invalid:ring-error-7 aria-invalid:border-error-8 gap-1 rounded-field text-label font-medium transition-all [&_svg:not([class*='size-'])]:size-4 group/toggle inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-transparent hover:bg-black-a1 dark:hover:bg-white-a1 data-[state=on]:bg-black-a1 dark:data-[state=on]:bg-white-a1 data-[state=on]:shadow-[inset_0px_2px_3px_0px_var(--black-a3)] dark:data-[state=on]:shadow-[inset_0px_2px_3px_0px_var(--black-a9)]",
        outline:
          "border border-default-8 bg-gradient-to-t from-default-3 to-default-1 after:absolute after:inset-0 after:rounded-[inherit] after:bg-black-a1 dark:after:bg-white-a1 after:opacity-0 after:pointer-events-none after:transition-opacity hover:after:opacity-100 data-[state=on]:after:opacity-100 data-[state=on]:shadow-[inset_0px_2px_3px_0px_var(--black-a3)] dark:data-[state=on]:shadow-[inset_0px_2px_3px_0px_var(--black-a12)]",
      },
      size: {
        default: "h-8 min-w-8 px-2",
        compact: "h-7 min-w-7 px-1.5 text-label-compact",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
