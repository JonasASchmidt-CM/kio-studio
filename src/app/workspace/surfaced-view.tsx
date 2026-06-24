import type { SurfacedView as SurfacedViewModel, ViewId } from '@/app/layout/framework'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

/**
 * The main working area when a specific UI is surfaced (preview / experiment /
 * settings). A title bar with actions, then the view body. Closing returns the
 * chat to the centre (home).
 */
export function SurfacedView({ view, onClose }: { view: SurfacedViewModel; onClose: () => void }) {
  return (
    <section aria-label={view.title} className="flex min-h-0 flex-1 flex-col">
      <header className="border-border flex h-12 shrink-0 items-center justify-between gap-3 border-b px-5">
        <h1 className="text-lg font-semibold">{view.title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button size="sm">{view.id === 'settings' ? 'Save' : 'Publish'}</Button>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">{viewBody(view.id)}</div>
    </section>
  )
}

function viewBody(id: ViewId) {
  if (id === 'experiment') return <ExperimentMock />
  if (id === 'settings') return <SettingsMock />
  if (id === 'governance') return <GovernanceMock />
  return <ContentMock />
}

function GovernanceMock() {
  const checks = [
    { t: 'GDPR consent banner', s: 'pass', d: 'Consent captured before non-essential cookies.' },
    { t: 'WCAG 2.1 AA', s: 'pass', d: 'Automated + manual a11y checks passing.' },
    { t: 'Data residency (EU)', s: 'warn', d: 'One asset served from a non-EU CDN edge.' },
    { t: 'Audit log retention', s: 'pass', d: 'Changes logged with author and timestamp.' },
  ]
  const tone: Record<string, string> = {
    pass: 'bg-success/15 text-success',
    warn: 'bg-warning/15 text-warning',
    fail: 'bg-destructive/15 text-destructive',
  }
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      {checks.map((c) => (
        <div
          key={c.t}
          className="border-border bg-card flex items-start justify-between gap-4 rounded-xl border p-4"
        >
          <div className="flex flex-col">
            <span className="font-medium">{c.t}</span>
            <span className="text-muted-foreground text-sm">{c.d}</span>
          </div>
          <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold capitalize', tone[c.s])}>
            {c.s}
          </span>
        </div>
      ))}
    </div>
  )
}

function ContentMock() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
        <div className="bg-muted/60 border-border flex items-center gap-1.5 border-b px-3 py-2">
          <span className="bg-destructive/70 size-2.5 rounded-full" />
          <span className="bg-warning/70 size-2.5 rounded-full" />
          <span className="bg-success/70 size-2.5 rounded-full" />
          <span className="text-muted-foreground ml-2 text-xs">coremedia.com / home</span>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="h-32 rounded-lg bg-[image:var(--brand-gradient)]" />
          <div className="bg-muted h-5 w-2/3 rounded" />
          <div className="bg-muted h-4 w-full rounded" />
          <div className="bg-muted h-4 w-5/6 rounded" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-muted h-20 rounded-lg" />
            <div className="bg-muted h-20 rounded-lg" />
            <div className="bg-muted h-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExperimentMock() {
  const variants = [
    { k: 'A', label: 'Control', pct: 44, win: false },
    { k: 'B', label: 'Variant B', pct: 56, win: true },
  ]
  return (
    <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
      {variants.map((v) => (
        <div
          key={v.k}
          className={cn(
            'border-border bg-card flex flex-col gap-3 rounded-xl border p-5 shadow-sm',
            v.win && 'ring-success/50 ring-2',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{v.label}</span>
            {v.win && (
              <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-xs font-semibold">
                Winning
              </span>
            )}
          </div>
          <div className="bg-muted h-24 rounded-lg" />
          <div className="flex items-end justify-between">
            <span className="text-muted-foreground text-sm">Conversion</span>
            <span className="text-2xl font-semibold">{v.pct}%</span>
          </div>
          <div className="bg-muted h-2 overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full', v.win ? 'bg-success' : 'bg-primary')}
              style={{ width: `${v.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsMock() {
  const rows = [
    { t: 'Personalize homepage', d: 'Blend recents and suggestions for each user.', on: true },
    { t: 'Conversational view surfacing', d: 'Let KIO open previews and editors from chat.', on: true },
    { t: 'Email digests', d: 'Weekly summary of experiments and content.', on: false },
  ]
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-3">
      {rows.map((r) => (
        <div
          key={r.t}
          className="border-border bg-card flex items-center justify-between gap-4 rounded-xl border p-4"
        >
          <div className="flex flex-col">
            <span className="font-medium">{r.t}</span>
            <span className="text-muted-foreground text-sm">{r.d}</span>
          </div>
          <span
            className={cn(
              'flex h-6 w-10 shrink-0 items-center rounded-full px-0.5 transition-colors',
              r.on ? 'bg-success justify-end' : 'bg-muted justify-start',
            )}
          >
            <span className="size-5 rounded-full bg-white shadow" />
          </span>
        </div>
      ))}
    </div>
  )
}
