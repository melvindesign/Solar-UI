import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(
        "gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2 group/item-group flex w-full flex-col",
        className
      )}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-2", className)}
      {...props}
    />
  )
}

const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-lg border border-transparent text-label transition-colors duration-100 outline-none focus-visible:border-default-8 focus-visible:ring-[3px] focus-visible:ring-default-7 [a]:transition-colors [a]:hover:bg-default-3",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-default-6",
        muted: "bg-default-2",
      },
      size: {
        default: "gap-4 p-4",
        compact: "gap-2.5 py-2 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-9 rounded-md border border-default-6 bg-default-2 [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm group-data-[size=compact]/item:size-8 group-data-[size=xs]/item:size-6 [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "gap-1 group-data-[size=xs]/item:gap-0 flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none",
        className
      )}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "gap-2 text-label leading-snug font-medium underline-offset-4 line-clamp-1 flex w-fit items-center",
        className
      )}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-default-11 text-left text-body-compact leading-normal group-data-[size=xs]/item:text-label-compact line-clamp-2 font-normal [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-brand-11",
        className
      )}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("gap-2 flex items-center", className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "gap-2 flex basis-full items-center justify-between",
        className
      )}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "gap-2 flex basis-full items-center justify-between",
        className
      )}
      {...props}
    />
  )
}

export {
  Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator,
  ItemTitle
}

