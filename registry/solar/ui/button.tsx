import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:ring-default-8 aria-invalid:ring-error-7 aria-invalid:border-error-8 border border-transparent bg-clip-padding text-label leading-none tracking-body font-medium focus-visible:ring-2 aria-invalid:ring-3 active:translate-y-px [&_svg:not([class*='size-'])]:size-4 group/button inline-flex flex-row shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-default-9 hover:bg-default-10 border-black-a5 text-default-1 shadow-[0px_1px_2px_0px_var(--black-a2),inset_0px_2px_1px_0px_var(--white-a3)]",
        primary: "bg-gradient-to-t from-brand-10 to-brand-9 hover:bg-none hover:bg-brand-10 border-brand-8 text-white-a12 shadow-[0px_1px_2px_0px_var(--black-a2),inset_0px_2px_1px_0px_var(--white-a3)]",
        secondary: "bg-gradient-to-t from-default-3 to-default-1 hover:bg-none hover:bg-default-4 border-default-8 text-default-12",
        ghost: "text-default-12 hover:bg-default-4 aria-expanded:bg-default-4",
        destructive: "bg-error-3 hover:bg-error-4 text-error-11",
        link: "text-brand-11 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "rounded-field min-h-field gap-2 py-1 px-[calc(var(--padding-field)-1px)] [&>svg]:mx-(--padding-xs)",
        compact:
          "rounded-field min-h-badge gap-2 py-1 px-[calc(var(--padding-badge)-1px)] [&>svg]:mx-(--padding-xs) [&_svg:not([class*='size-'])]:size-2.5",
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
