import type { ComponentType } from 'react'
import { useState } from 'react'

import type { ContextItem, ViewId } from './framework'
import type { IconProps } from '@/shared/icons'
import { AutoAwesomeIcon, ChevronDownIcon, FolderIcon, SettingsIcon } from '@/shared/icons'
import { cn } from '@/shared/lib/utils'

/**
 * Right contextual sidebar — persists what the conversation produced (artifacts,
 * context pulled, settings changed) so they're reachable without scrolling back
 * (Confluence app-layout framework).
 *
 * Visibility rules (per product direction):
 *  - Hidden entirely while there's nothing to show (e.g. the fresh homepage).
 *  - Appears as a collapsed icon rail once items exist; expandable on demand.
 */
const KIND_ICON: Record<ContextItem['kind'], ComponentType<IconProps>> = {
  artifact: AutoAwesomeIcon,
  context: FolderIcon,
  setting: SettingsIcon,
}

const KIND_LABEL: Record<ContextItem['kind'], string> = {
  artifact: 'Artifact',
  context: 'Context',
  setting: 'Setting',
}

export function ContextSidebar({
  items,
  onOpen,
}: {
  items: ContextItem[]
  onOpen: (id: ViewId) => void
}) {
  const [expanded, setExpanded] = useState(false)

  // Nothing to show yet → don't take up any space.
  if (items.length === 0) return null

  return (
    <aside
      aria-label="Conversation activity"
      data-slot="context-sidebar"
      className={cn(
        'border-border bg-card flex shrink-0 flex-col border-l transition-[width] duration-200',
        expanded ? 'w-72' : 'w-14',
      )}
    >
      <div
        className={cn(
          'border-border flex h-12 shrink-0 items-center border-b',
          expanded ? 'justify-between px-4' : 'justify-center px-2',
        )}
      >
        {expanded && <h2 className="font-semibold">Activity</h2>}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse activity' : 'Expand activity'}
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring grid size-9 place-items-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <ChevronDownIcon
            size={18}
            className={cn('transition-transform', expanded ? '-rotate-90' : 'rotate-90')}
          />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <ul className={cn('flex flex-col gap-1', !expanded && 'items-center')}>
          {items.map((it) => {
            const Icon = KIND_ICON[it.kind]
            const vid = it.viewId
            const chip = (
              <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-lg">
                <Icon size={16} />
              </span>
            )

            if (!expanded) {
              return (
                <li key={it.id}>
                  {vid ? (
                    <button
                      type="button"
                      onClick={() => onOpen(vid)}
                      title={it.label}
                      aria-label={`${KIND_LABEL[it.kind]}: ${it.label}`}
                      className="hover:bg-muted focus-visible:ring-ring grid place-items-center rounded-lg p-1 focus-visible:ring-2 focus-visible:outline-none"
                    >
                      {chip}
                    </button>
                  ) : (
                    <div className="p-1" title={it.label}>
                      {chip}
                    </div>
                  )}
                </li>
              )
            }

            const inner = (
              <>
                {chip}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">{it.label}</span>
                  <span className="text-muted-foreground text-xs">{KIND_LABEL[it.kind]}</span>
                </span>
              </>
            )
            return (
              <li key={it.id}>
                {vid ? (
                  <button
                    type="button"
                    onClick={() => onOpen(vid)}
                    className="hover:bg-muted focus-visible:ring-ring flex w-full items-center gap-3 rounded-lg p-2 text-left focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {inner}
                  </button>
                ) : (
                  <div className="flex w-full items-center gap-3 rounded-lg p-2">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
