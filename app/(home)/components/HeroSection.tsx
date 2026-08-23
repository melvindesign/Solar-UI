'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'
import { TextAnimate } from '../../../components/ui/text-animate'
import InstallCommand from './InstallCommand'

/**
 * Typography is written out here rather than pulled from Display/Body: this
 * release ships the button alone, so the text components are not in the tree.
 */
const DISPLAY_1 = 'font-header text-default-12 text-display-1 leading-tight tracking-tight font-semibold'
const BODY = 'font-body text-default-12 text-body leading-relaxed tracking-body font-normal'

export default function HeroSection() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Headline */}
        <h1 className={cn(DISPLAY_1, 'max-w-2xl flex flex-wrap')}>
          <TextAnimate as="span" animation="blurInUp" by="word" className="w-full">
            The Design System built
          </TextAnimate>
          <TextAnimate as="span" animation="blurInUp" by="word" delay={0.2}>
            for your product interfaces
          </TextAnimate>
          <motion.span
            className="text-brand-11 inline-block"
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >.</motion.span>
        </h1>

        {/* Sub-headline */}
        <TextAnimate
          as="p"
          animation="blurInUp"
          by="word"
          delay={0.5}
          className={cn(BODY, 'mt-3 text-default-11')}
        >
          Open code built on shadcn/ui. Copy it, own it, adopt it
        </TextAnimate>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="primary" asChild>
            <Link href="/docs/components/button">Read the docs</Link>
          </Button>
          <div className="w-full max-w-sm sm:w-auto sm:min-w-[380px]">
            <InstallCommand />
          </div>
        </div>
      </div>
    </section>
  )
}
