import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const displayVariants = cva(
  "font-header text-default-12",
  {
    variants: {
      size: {
        "1": "text-display-1 tracking-display-tight font-semibold",
        "2": "text-display-2 tracking-display-tight font-semibold",
        "3": "text-display-3 tracking-display-normal font-medium",
        "4": "text-display-4 tracking-display-normal font-medium",
        "5": "text-display-5 tracking-display-loose font-medium",
        "6": "text-display-6 tracking-display-loose font-medium",
      },
    },
    defaultVariants: {
      size: "1",
    },
  }
)

const sizeTagMap = {
  "1": "h1",
  "2": "h2",
  "3": "h3",
  "4": "h4",
  "5": "h5",
  "6": "h6",
} as const

type DisplayProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof displayVariants> & {
    asChild?: boolean
  }

function Display({
  className,
  size = "1",
  asChild = false,
  ...props
}: DisplayProps) {
  const Tag = (asChild ? Slot.Root : sizeTagMap[size ?? "1"]) as React.ElementType

  return (
    <Tag
      data-slot="display"
      data-size={size}
      className={cn(displayVariants({ size }), className)}
      {...props}
    />
  )
}

export { Display, displayVariants }
