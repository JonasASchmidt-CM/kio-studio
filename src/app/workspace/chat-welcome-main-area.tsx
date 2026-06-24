import { KioAvatar } from '@/shared/brand/kio-avatar'

export function ChatWelcomeMainArea() {
  return (
    <div className="flex flex-col items-center gap-[var(--kio-spacing-avatar-gap)]" style={{ contain: 'layout' }}>
      <div className="relative flex items-center justify-center size-[80px]">
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#ffffff_30%,transparent_72%)]"
        />
        <KioAvatar size={80} className="relative z-10" />
      </div>
      <div className="flex flex-col gap-[var(--kio-spacing-text-gap)] items-center w-full text-center" style={{ contain: 'layout' }}>
        <h1 className="text-[length:var(--kio-font-size-heading-blank-slate)] font-bold leading-[var(--kio-font-line-height-heading)] font-heading bg-clip-text text-transparent bg-[image:var(--kio-gradient-heading-blank-slate)]">
          Good morning, Mira.
        </h1>
        <p className="text-[length:var(--kio-font-size-body-lg)] font-normal leading-[var(--kio-font-line-height-normal)] text-foreground">
          I am KIO, your AI assistant. What can I do for you?
        </p>
      </div>
    </div>
  )
}
