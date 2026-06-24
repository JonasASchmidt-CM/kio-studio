import type { ReactElement, ReactNode } from 'react'

import { Popover as BasePopover } from '@base-ui/react/popover'

import { cn } from '@/shared/lib/utils'

/**
 * Popover — shadcn-style wrapper over the Base UI Popover primitive (we own it,
 * DECISIONS.md D2). `trigger` is your own element (e.g. a header button); Base
 * UI merges open/close + ARIA onto it. Opens on click, closes on outside-click
 * / Escape. Pass `open`/`onOpenChange` to control it (e.g. to close on select).
 */
export function Popover({
  trigger,
  children,
  ariaLabel,
  align = 'end',
  className,
  open,
  onOpenChange,
}: {
  trigger: ReactElement
  children: ReactNode
  ariaLabel?: string
  align?: 'start' | 'center' | 'end'
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  return (
    <BasePopover.Root open={open} onOpenChange={onOpenChange}>
      <BasePopover.Trigger render={trigger} />
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" align={align} sideOffset={8} className="z-50">
          <BasePopover.Popup
            aria-label={ariaLabel}
            className={cn(
              'border-border bg-popover text-popover-foreground min-w-56 overflow-hidden rounded-xl border shadow-lg outline-none',
              className,
            )}
          >
            {children}
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  )
}
