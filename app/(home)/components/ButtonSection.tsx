import { Button } from '@/components/ui/button'
import { CaretRight, Envelope } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

const VARIANTS = ['default', 'primary', 'secondary', 'ghost', 'destructive', 'link'] as const

export default function ButtonSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-header text-display-3 leading-snug font-medium text-default-12">
          One component, every state accounted for
        </h2>
        <p className="mt-3 max-w-xl font-body text-body leading-relaxed text-default-11">
          Six variants, two densities, icons on either side — all driven by the same tokens
          as the rest of the system.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Panel label="Variants">
            {VARIANTS.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </Panel>

          <Panel label="Sizes">
            <Button>Default</Button>
            <Button size="compact">Compact</Button>
            <Button variant="secondary" size="compact">
              Compact secondary
            </Button>
          </Panel>

          <Panel label="With icons">
            <Button variant="primary">
              <Envelope />
              Email
            </Button>
            <Button variant="secondary">
              Continue
              <CaretRight />
            </Button>
            <Button variant="ghost" aria-label="Email">
              <Envelope />
            </Button>
          </Panel>

          <Panel label="States">
            <Button disabled>Disabled</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="link" asChild>
              <Link href="/docs/components/button">See all examples</Link>
            </Button>
          </Panel>
        </div>
      </div>
    </section>
  )
}

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-default-6 bg-default-1 p-6">
      <div className="text-label font-medium tracking-body text-default-11">{label}</div>
      <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
