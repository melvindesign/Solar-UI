"use client"

import { Label as LabelPrimitive } from "radix-ui"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "font-body font-medium text-default-12 flex items-center gap-2 select-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "text-label leading-normal tracking-label",
        compact: "text-label-compact leading-normal tracking-label",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

function Label({ className, size, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ size }), className)}
      {...props}
    />
  )
}

export { Label, labelVariants }
