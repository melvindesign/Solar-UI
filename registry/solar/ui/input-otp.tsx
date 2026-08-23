"use client"

import { OTPInput, OTPInputContext } from "input-otp"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Minus } from "@phosphor-icons/react/dist/ssr"

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "cn-input-otp flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      spellCheck={false}
      className={cn(
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "rounded-field border border-transparent flex items-center [background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-default-8),var(--color-default-6))_border-box] has-aria-invalid:ring-3 has-aria-invalid:ring-error-7 has-aria-invalid:[background:linear-gradient(to_top,var(--color-default-2),var(--color-default-1))_padding-box,linear-gradient(to_bottom,var(--color-error-7),var(--color-error-7))_border-box]",
        className
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "size-[39px] border-r border-default-7 last:border-r-0 text-label font-light tracking-[0.4px] text-default-12 transition-all outline-none first:rounded-l-lg last:rounded-r-lg data-[active=true]:ring-3 data-[active=true]:ring-default-7 data-[active=true]:z-10 relative flex items-center justify-center data-[active=true]:aria-invalid:ring-error-7 aria-invalid:border-error-8 data-[active=true]:aria-invalid:border-error-8",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      className="[&_svg:not([class*='size-'])]:size-4 flex items-center"
      role="separator"
      {...props}
    >
      <Minus
      />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }

