import type { NavItem, ViewId } from './framework'
import { ChevronDownIcon } from '@/shared/icons'
import { cn } from '@/shared/lib/utils'

/**
 * Left navigation — always visible, collapsible between an icon rail and a
 * labelled column (Confluence app-layout framework). The collapse/expand arrow
 * lives at the bottom, below the secondary group. Collapsed, each item shows
 * its label as a hover overlay (a stand-in for the future sub-nav drawers).
 */
export function NavSidebar({
  expanded,
  onToggle,
  primary,
  secondary,
  activeViewId,
  atHome,
  onSelect,
}: {
  expanded: boolean
  onToggle: () => void
  primary: NavItem[]
  secondary: NavItem[]
  activeViewId: ViewId | null
  atHome: boolean
  onSelect: (item: NavItem) => void
}) {
  return (
    <nav
      aria-label="Main"
      data-slot="nav-sidebar"
      className={cn(
        'border-border bg-card flex shrink-0 flex-col border-r transition-[width] duration-200',
        expanded ? 'w-60' : 'w-16',
      )}
    >
      <ul className="flex flex-1 flex-col gap-1 px-3 py-3">
        {primary.map((item) => (
          <li key={item.id}>
            <NavButton
              item={item}
              expanded={expanded}
              active={item.viewId ? item.viewId === activeViewId : atHome}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>

      <ul className="border-border flex flex-col gap-1 border-t px-3 py-2">
        {secondary.map((item) => (
          <li key={item.id}>
            <NavButton
              item={item}
              expanded={expanded}
              active={item.viewId === activeViewId}
              onSelect={onSelect}
            />
          </li>
        ))}
      </ul>

      <div className={cn('border-border flex border-t p-3', expanded ? 'justify-end' : 'justify-center')}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={expanded ? 'Collapse navigation' : 'Expand navigation'}
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring grid size-9 place-items-center rounded-md focus-visible:ring-2 focus-visible:outline-none"
        >
          <ChevronDownIcon
            size={18}
            className={cn('transition-transform', expanded ? 'rotate-90' : '-rotate-90')}
          />
        </button>
      </div>
    </nav>
  )
}

function NavButton({
  item,
  expanded,
  active,
  onSelect,
}: {
  item: NavItem
  expanded: boolean
  active: boolean
  onSelect: (item: NavItem) => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-current={active ? 'page' : undefined}
      title={expanded ? undefined : item.label}
      className={cn(
        'group focus-visible:ring-ring relative flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-sm outline-none focus-visible:ring-2',
        active
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon size={20} className="shrink-0" />
      {expanded ? (
        <span className="truncate">{item.label}</span>
      ) : (
        <span className="bg-foreground text-background pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 rounded-md px-2 py-1 text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100">
          {item.label}
        </span>
      )}
    </button>
  )
}
