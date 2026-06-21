import { Button } from '@/shared/ui/button'
import { AutoAwesomeIcon } from '@/shared/icons'

/**
 * App shell — the composition root for KIO Studio.
 *
 * Intentionally minimal: it exists to prove the design-token pipeline runs
 * end to end. The primary Button and the header icon both draw their colour
 * from the seeded `color.brand.primary` token via:
 *   tokens.json → Style Dictionary → CSS vars → Tailwind/shadcn theme.
 *
 * Real navigation, routing, and providers live under `src/app/providers/`
 * and feature slices under `src/features/` as the product grows.
 */
function App() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col">
      <header className="border-border flex items-center gap-2 border-b px-6 py-4">
        <AutoAwesomeIcon size={20} className="text-primary" />
        <span className="font-semibold">KIO Studio</span>
        <span className="bg-muted text-muted-foreground ml-1 rounded-md px-2 py-0.5 text-xs">
          scaffold
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start gap-6 px-6 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Design token pipeline is live</h1>
          <p className="text-muted-foreground">
            These controls are themed by <code>tokens/tokens.json</code> → Style Dictionary → CSS
            variables → Tailwind/shadcn on Base UI. The primary colour is the seeded{' '}
            <code>color.brand.primary</code> token.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </main>

      <footer className="border-border text-muted-foreground border-t px-6 py-4 text-sm">
        KIO Studio — AI-first frontend client for the CoreMedia CMS engine.
      </footer>
    </div>
  )
}

export default App
