import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-default-8 focus-visible:ring-default-7 aria-invalid:ring-error-7 aria-invalid:border-error-8 rounded-field border border-transparent bg-clip-padding text-label font-medium focus-visible:ring-3 aria-invalid:ring-3 active:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex flex-row shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative overflow-hidden after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:opacity-0 after:transition-opacity hover:after:opacity-100",
  {
    variants: {
      variant: {
        default: "bg-default-9 border-black-a5 text-default-1 shadow-[0px_3px_4px_-1px_var(--black-a2),inset_0px_2px_1px_0px_var(--white-a3)] after:bg-white-a2",
        primary: "bg-gradient-to-t from-brand-10 to-brand-9 border-brand-8 text-white-a12 shadow-[0px_3px_4px_-1px_var(--black-a2),inset_0px_2px_1px_0px_var(--white-a3)] after:bg-white-a2",
        secondary: "bg-gradient-to-t from-default-3 to-default-1 border-default-7 text-default-12 after:bg-black-a1",
        ghost: "text-default-12 hover:bg-black-a1 aria-expanded:bg-black-a1",
        destructive: "bg-error-3 text-error-11 after:bg-black-a1",
        link: "text-link-11 underline-offset-4 hover:underline",
      },
      size: {
        default: "gap-1.5 py-2 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        compact: "gap-1 py-1 px-2 text-label-compact has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        icon: "size-field [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
