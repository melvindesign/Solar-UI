import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Solar UI',
    template: '%s – Solar UI'
  },
  description: 'A modern UI component library built with React, Tailwind CSS and shadcn/ui'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <SpeedInsights />
      <Analytics />
</>
  )
}
