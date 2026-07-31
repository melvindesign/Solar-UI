"use client"

import { Select as SelectPrimitive } from "radix-ui"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Check, CaretDown, CaretUp } from "@phosphor-icons/react/dist/ssr"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border border-transparent [background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-default-8),var(--color-default-6))_border-box] data-placeholder:text-default-11 text-default-12 font-light tracking-[0.4px] focus-visible:ring-3 focus-visible:ring-default-7 aria-invalid:ring-3 aria-invalid:ring-error-7 aria-invalid:[background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-error-7),var(--color-error-7))_border-box] disabled:[background:var(--color-default-3)] gap-1.5 rounded-field py-2 pr-2 pl-2.5 text-label transition-colors select-none data-[size=default]:h-field data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <CaretDown className="text-default-11 size-4 pointer-events-none" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  align = "start",
  sideOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Content>, "position">) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-default-2 text-default-12 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-default-6 min-w-36 rounded-lg shadow-md ring-1 duration-100 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position="popper"
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="min-w-(--radix-select-trigger-width)">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-default-11 px-1.5 py-1 text-label-compact", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-default-3 focus:text-default-12 not-data-[variant=destructive]:focus:**:text-default-12 gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-label [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-default-6 -mx-1 my-1 h-px pointer-events-none", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("bg-default-2 z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <CaretUp
      />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("bg-default-2 z-10 flex cursor-default items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <CaretDown
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}

