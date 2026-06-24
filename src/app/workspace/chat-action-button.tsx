import { cn } from '@/shared/lib/utils'

/**
 * Gradient-bordered suggestion pill used on the chat blank slate.
 * Figma: "Chat - Action Button" (node 209:148), State=Default/Hover.
 */
export function ChatActionButton({
  label,
  onAction,
  className,
}: {
  label: string
  onAction: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onAction}
      className={cn(
        'border border-[color:var(--kio-color-brand-action-button-border)]',
        'flex items-center justify-center',
        'px-[var(--kio-spacing-button-padding-x)] py-[var(--kio-spacing-button-padding-y)]',
        'rounded-[var(--kio-radius-button)]',
        'transition-all hover:bg-[var(--kio-color-brand-action-button-border)]/15',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        className,
      )}
    >
      <span className="whitespace-nowrap text-center text-[length:var(--kio-font-size-button-text)] font-normal leading-[var(--kio-font-line-height-compact)] bg-clip-text text-transparent bg-[image:var(--kio-gradient-action-button-text)]">
        {label}
      </span>
    </button>
  )
}
