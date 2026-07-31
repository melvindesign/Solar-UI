import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"

const titleVariants = cva(
  "font-header text-default-12",
  {
    variants: {
      size: {
        "1": "text-title-1 tracking-display-tight font-semibold",
        "2": "text-title-2 tracking-display-tight font-semibold",
        "3": "text-title-3 tracking-display-normal font-medium",
        "4": "text-title-4 tracking-display-normal font-medium",
        "5": "text-title-5 tracking-display-loose font-medium",
        "6": "text-title-6 tracking-display-loose font-medium",
      },
    },
    defaultVariants: {
      size: "2",
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

type TitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof titleVariants> & {
    asChild?: boolean
  }

function Title({
  className,
  size = "2",
  asChild = false,
  ...props
}: TitleProps) {
  const Tag = (asChild ? Slot.Root : sizeTagMap[size ?? "2"]) as React.ElementType

  return (
    <Tag
      data-slot="title"
      data-size={size}
      className={cn(titleVariants({ size }), className)}
      {...props}
    />
  )
}

export { Title, titleVariants }
