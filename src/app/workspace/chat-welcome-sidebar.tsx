import { KioSparkleMark } from '@/shared/brand/kio-sparkle-mark'

export function ChatWelcomeSidebar() {
  return (
    <div className="flex flex-col gap-5">
      <KioSparkleMark width={58} />
      <div className="flex flex-col gap-3">
        <h1 className="text-foreground font-heading text-[1.75rem] font-semibold leading-tight">
          Good morning, Mira.
        </h1>
        <p className="text-foreground font-heading text-base font-medium">
          Here are some ways I can assist you:
        </p>
      </div>
    </div>
  )
}
