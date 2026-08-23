'use client'

import {
  AppleLogo,
  ArrowsDownUp,
  CaretDown,
  DotsThree,
  Eye,
  EyeSlash
} from '@phosphor-icons/react/dist/ssr'
import * as React from 'react'
import { Area, AreaChart } from 'recharts'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Body } from '@/components/ui/body'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Title } from '@/components/ui/title'
import { AnimatedList } from '../../../components/ui/animated-list'
import { MagicCard } from '../../../components/ui/magic-card'

// ─── Invoice Table ────────────────────────────────────────────────────────────

const invoices = [
  { id: 'INV-001', email: 'ken99@example.com', amount: '$316.00' },
  { id: 'INV-002', email: 'carmella@example.com', amount: '$242.00' },
  { id: 'INV-003', email: 'silas22@example.com', amount: '$837.00' },
]

function InvoiceTable() {
  const [filter, setFilter] = React.useState('')
  const [selected, setSelected] = React.useState<string[]>([])

  const filtered = invoices.filter((i) =>
    i.email.toLowerCase().includes(filter.toLowerCase()),
  )
  const allSelected =
    filtered.length > 0 && filtered.every((i) => selected.includes(i.id))

  const toggleAll = () => {
    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !filtered.some((i) => i.id === id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...filtered.map((i) => i.id)])])
    }
  }

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder="Filters emails"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='w-[300px]'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <InputGroup className="w-34.5 cursor-pointer">
              <InputGroupInput readOnly value="Columns" className="pointer-events-none cursor-pointer" />
              <InputGroupAddon align="inline-end">
                <CaretDown size={12} />
              </InputGroupAddon>
            </InputGroup>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked>Invoice</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Email</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked>Amount</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-default-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={() => toggleAll()}
                />
              </TableHead>
              <TableHead>Invoice</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Email
                  <ArrowsDownUp size={12} className="text-default-9" />
                </div>
              </TableHead>
              <TableHead className="text-right pr-2">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row) => (
              <TableRow
                key={row.id}
                data-state={selected.includes(row.id) ? 'selected' : undefined}
              >
                <TableCell className="pl-3">
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={() => toggle(row.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell className="text-default-11">{row.email}</TableCell>
                <TableCell className="pr-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span>{row.amount}</span>
                    <Button variant="ghost" className="size-6">
                      <DotsThree size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-default-11">
        <span>
          {selected.length} of {filtered.length} row(s) selected
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" size="compact">
            Previous
          </Button>
          <Button variant="secondary" size="compact">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Login Form Card ──────────────────────────────────────────────────────────

function LoginFormCard() {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <Card className='bg-default-1 p-0'>
      <MagicCard mode='orb' glowFrom='var(--color-default-3)'glowTo='var(--color-default-1)'>
        <CardHeader className='pt-4'>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pb-4">
          <Field>
            <FieldLabel htmlFor="demo-email">Email</FieldLabel>
            <Input
              id="demo-email"
              placeholder="address.email@example.com"
              autoComplete="off"
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="demo-password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="demo-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                readOnly
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Button className="w-full">Log in</Button>
          <Button variant="secondary" className="w-full gap-2">
            <AppleLogo size={16} />
            Login with Apple
          </Button>
          <p className="text-center text-sm text-default-11">
            Don&apos;t have an account?{' '}
            <span className="cursor-pointer text-default-12 underline underline-offset-2">
              Sign up
            </span>
          </p>
        </CardContent>
      </MagicCard>
    </Card>
  )
}

// ─── Activity Feed (custom Tailwind) ─────────────────────────────────────────

const activities = [
  {
    id: 9,
    title: 'New workspace created',
    badge: { label: 'Acme Corp', variant: 'outline' as const },
    time: '4 days ago',
    dot: 'bg-default-8',
    indicator: false,
  },
  {
    id: 8,
    title: 'User role updated',
    link: 'marc@company.com',
    time: '3 days ago',
    dot: 'bg-default-8',
    indicator: false,
  },
  {
    id: 7,
    title: 'Integration connected',
    badge: { label: 'Stripe', variant: 'primary' as const },
    time: '2 days ago',
    dot: 'bg-success-9',
    indicator: false,
  },
  {
    id: 6,
    title: 'Comment added',
    link: 'alex@company.com',
    time: '2 days ago',
    dot: 'bg-default-8',
    indicator: false,
  },
    {
    id: 5,
    title: 'Subscription renewed',
    badge: { label: 'Pro plan', variant: 'primary' as const },
    time: 'Yesterday',
    dot: 'bg-default-8',
    indicator: false,
  },
    {
    id: 4,
    title: 'Export failed – Q3 Report.csv',
    time: '3h ago',
    dot: 'bg-error-9',
    indicator: false,
  },
    {
    id: 3,
    title: 'New member',
    link: 'lucie@company.com',
    time: '1h ago',
    dot: 'bg-default-8',
    indicator: false,
  },
    {
    id: 2,
    title: 'Payment overdue',
    badge: { label: 'Stellar app', variant: 'outline' as const },
    time: '10 min ago',
    dot: 'bg-default-8',
    indicator: false,
  },
  {
    id: 1,
    title: 'Invoice sent',
    badge: { label: 'Acme Corp', variant: 'outline' as const },
    time: 'Just now',
    dot: 'bg-brand-9',
    indicator: true,
  },
]

function ActivityFeed() {
  return (
    <div className="flex flex-col overflow-hidden max-h-[375px] gap-1">
      <AnimatedList delay={3000}>
      {activities.map((item, index) => (
        <div key={item.id} className="flex items-start gap-3">
          {/* Timeline dot + connecting line */}
          <div className="flex flex-col items-center pt-1">
            <div className={`h-2 w-2 shrink-0 rounded-full ${item.dot}`} />
            {index < activities.length - 1 && (
              <div className="my-1 min-h-4 w-px flex-1 bg-default-6" />
            )}
          </div>

          {/* Row content */}
          <div className="flex flex-col min-w-0 flex-1 items-start justify-between pb-4">
            <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm text-default-12">
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant={item.badge.variant} className="shrink-0">
                  {item.badge.label}
                </Badge>
              )}
              {item.link && (
                <span className="cursor-pointer truncate text-brand-11 underline underline-offset-2">
                  {item.link}
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="whitespace-nowrap text-xs text-default-11">{item.time}</span>
              {item.indicator && (
                <div className="h-1.5 w-1.5 rounded-full bg-brand-9" />
              )}
            </div>
          </div>
        </div>
      ))}
      </AnimatedList>
    </div>
  )
}

// ─── Active Users Card ────────────────────────────────────────────────────────

const usersData = [
  { v: 2100 }, { v: 1800 }, { v: 2600 }, { v: 2200 },
  { v: 2900 }, { v: 2700 }, { v: 3100 }, { v: 2950 }, { v: 3574 },
]

const usersConfig = {
  v: { label: 'Users', color: 'var(--color-brand-9)' },
} satisfies ChartConfig

function ActiveUsersCard() {
  return (
    <Card
      className="p-0"
      style={{ background: 'radial-gradient(ellipse at 73% 10%, var(--color-brand-2) 0%, var(--color-default-1) 100%)' }}
    >
      <div className="flex items-start">
        <div className='flex flex-col align-between flex-1 p-2'>
          <Body>Active users</Body>
          <div className='flex flex-col'>
            <Label size={"compact"} className='text-default-11'>+ 26%</Label>
            <Title size={"1"}>3 574</Title>
          </div>
        </div>
        <div className='flex-1 flex items-end h-full'>
          <ChartContainer config={usersConfig} className="h-16 w-full pt-2 shrink-0">
            <AreaChart data={usersData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-brand-9)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-brand-9)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--color-brand-9)"
                strokeWidth={2}
                fill="url(#usersGrad)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </div>
    </Card>
  )
}

// ─── Transaction Card ─────────────────────────────────────────────────────────

function TransactionCard() {
  return (
    <Card className='bg-default-1 p-2'>
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar size="default">
            <AvatarFallback>PM</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="text-xs text-default-11">Account</span>
            <span className="truncate text-sm font-medium text-default-12">
              pay-manager@acme.com
            </span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-default-11">4 Nov 25</span>
      </div>
      <Title size="4">
        $1 312
      </Title>
      <div className="flex flex-wrap gap-1.5">
        <Badge variant="default">Revenue</Badge>
        <Badge variant="primary">Accomodation</Badge>
        <Badge variant="destructive">Fee</Badge>
      </div>
    </Card>
  )
}

// ─── Command Demo ─────────────────────────────────────────────────────────────

function CommandDemo() {
  return (
    <Command className="border border-default-6 shadow-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Translator</CommandItem>
          <CommandItem>Note</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Billing
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Notifications
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Logout
            <CommandShortcut>⌘Q</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ShowcaseSection() {
  return (
    <section className="relative pb-5">
      {/* Orange glow at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-96"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-brand-5), transparent)',
          opacity: 0.3,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4">
        {/*
          Grid layout:
          - Mobile (1 col): all stacked
          - Tablet (2 cols, md): DataTable full width, items in pairs
          - Desktop (3 cols, lg): DataTable spans 2 cols × 2 rows (left block)
                                  KPI cards in col 3 (rows 1–2)
                                  Login / Activity / Command in row 3
        */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* DataTable: 2×2 block on desktop, full width on tablet */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
            <InvoiceTable />
          </div>

          {/* KPI Card 1 — col 3 row 1 on desktop */}
          <ActiveUsersCard />

          {/* KPI Card 2 — col 3 row 2 on desktop */}
          <TransactionCard />

          {/* Login Form — bottom-left */}
          <LoginFormCard />

          {/* Activity Feed — bottom-center */}
          <ActivityFeed />

          {/* Command — bottom-right */}
          <CommandDemo />
        </div>
      </div>
    </section>
  )
}
