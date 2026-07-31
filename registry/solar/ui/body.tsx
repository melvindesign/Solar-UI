import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const bodyVariants = cva(
  "font-body text-default-12",
  {
    variants: {
      size: {
        default: "text-body tracking-body font-normal",
        compact: "text-body-compact tracking-body font-normal",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const sizeTagMap = {
  default: "p",
  compact: "small",
} as const

type BodyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof bodyVariants> & {
    asChild?: boolean
  }

function Body({
  className,
  size = "default",
  asChild = false,
  ...props
}: BodyProps) {
  const Comp = (asChild ? Slot.Root : sizeTagMap[size ?? "default"]) as React.ElementType

  return (
    <Comp
      data-slot="body"
      data-size={size}
      className={cn(bodyVariants({ size }), className)}
      {...props}
    />
  )
}

export { Body, bodyVariants }
