import type { ComponentProps } from 'react'
import { useState } from 'react'

import { KioLogoMark } from '@/shared/brand/kio-logo-mark'
import { UserAvatar } from '@/shared/brand/user-avatar'
import { ChevronDownIcon, NotificationsIcon } from '@/shared/icons'
import { Popover } from '@/shared/ui/popover'
import { cn } from '@/shared/lib/utils'

/**
 * Sticky App Header — the global top bar of the KIO Studio app shell.
 *
 * Source: the "Sticky App Header" component in the KIO Studio Design System
 * Figma (node 172:3511), rebuilt against our token system. It realises the
 * header described in the Confluence "App Layout Framework & Interaction
 * Hypothesis": app identity (left) and global context (right) — site/locale
 * context, notifications, user menu — each opening a popover on click.
 *
 * Not-yet-tokenised brand values (the gradient) live as placeholder CSS vars in
 * src/index.css (CoreMedia brand-token phase, TODO.md).
 */
export function AppHeader({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      data-slot="app-header"
      className={cn(
        'sticky top-0 z-50 flex h-13 w-full min-w-[640px] items-center justify-between gap-4 px-4 py-2.5',
        'bg-[image:var(--brand-gradient)] text-white shadow-lg',
        className,
      )}
      {...props}
    >
      <AppIdentity />
      <div data-slot="global-context" className="flex items-center justify-end gap-6">
        <SiteLocaleSelector />
        <HeaderSeparator />
        <NotificationButton count={9} />
        <HeaderSeparator />
        <UserMenuButton name="User N." online />
      </div>
    </header>
  )
}

/** App identity — logomark + product wordmark (left cluster). */
export function AppIdentity({ product = 'KIO Studio' }: { product?: string }) {
  return (
    <div data-slot="app-identity" className="flex items-center gap-3">
      <KioLogoMark aria-hidden className="h-7 w-6 shrink-0 text-white" />
      <span className="text-xl leading-tight font-semibold whitespace-nowrap">{product}</span>
    </div>
  )
}

interface Site {
  id: string
  label: string
  locale: string
}

const SITES: Site[] = [
  { id: 'com', label: 'CoreMedia.com', locale: 'EN-US' },
  { id: 'de', label: 'CoreMedia.de', locale: 'DE-DE' },
  { id: 'fr', label: 'CoreMedia.fr', locale: 'FR-FR' },
]


/** Dropdown panel content for the site/locale picker. */
export function HeaderSitePickerPanel({
  sites,
  activeSiteId,
  onSelect,
}: {
  sites: { id: string; label: string; locale: string }[]
  activeSiteId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="w-72">
      <div className="border-border border-b px-3 py-2">
        <div className="text-sm font-semibold tracking-[0.01em]">Preferred site</div>
        <div className="text-muted-foreground text-xs tracking-[0.01em]">The site &amp; locale KIO works in by default.</div>
      </div>
      <ul className="py-1" role="listbox" aria-label="Preferred site">
        {sites.map((s) => {
          const active = s.id === activeSiteId
          return (
            <li key={s.id}>
              <button
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => onSelect(s.id)}
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  active ? 'bg-muted font-medium' : 'hover:bg-muted',
                )}
              >
                <span className="tracking-[0.01em]">
                  {s.label}
                  <span className="text-muted-foreground"> · {s.locale}</span>
                </span>
                {active && <span className="text-primary text-xs font-semibold tracking-[0.01em]">Current</span>}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="border-border border-t px-3 py-3">
        <button type="button" className="border-primary text-primary hover:bg-primary/5 w-full rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          All sites
        </button>
      </div>
    </div>
  )
}

/** Preferred-site / locale context — the global site KIO works in by default. */
export function SiteLocaleSelector() {
  const [open, setOpen] = useState(false)
  const [siteId, setSiteId] = useState('com')
  const site = SITES.find((s) => s.id === siteId) ?? SITES[0]!

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      ariaLabel="Preferred site and locale"
      trigger={
        <button type="button" className={headerControl('gap-1 px-1.5 py-1 hover:text-foreground')}>
          <span className="text-sm font-semibold whitespace-nowrap tracking-[0.01em]">
            {site.label} · {site.locale}
          </span>
          <ChevronDownIcon size={20} className="shrink-0" />
        </button>
      }
    >
      <HeaderSitePickerPanel
        sites={SITES}
        activeSiteId={siteId}
        onSelect={(id) => { setSiteId(id); setOpen(false) }}
      />
    </Popover>
  )
}

/** Notification indicator + popover list. Hover darkens the unread badge. */
export function NotificationButton({ count = 0 }: { count?: number }) {
  const hasUnread = count > 0
  return (
    <Popover
      ariaLabel="Notifications"
      trigger={
        <button
          type="button"
          aria-label={hasUnread ? `Notifications, ${count} unread` : 'Notifications'}
          className={headerControl('group relative size-6')}
        >
          <NotificationsIcon size={24} className="transition-colors group-hover:text-foreground" />
          {hasUnread && (
            <span
              aria-hidden
              className="bg-destructive absolute -top-1.5 left-3.5 min-w-4 rounded-full px-1 py-px text-center text-xs leading-none font-bold text-primary-foreground shadow-sm tracking-[0.01em]"
            >
              {count > 99 ? '99+' : count}
            </span>
          )}
        </button>
      }
    >
      <HeaderNotificationsPanel count={count} />
    </Popover>
  )
}

/** User element — name + avatar with online status + popover menu. */
export function UserMenuButton({ name, online = false }: { name: string; online?: boolean }) {
  return (
    <Popover
      ariaLabel={`User menu for ${name}`}
      trigger={
        <button type="button" aria-label={`User menu for ${name}`} className={headerControl('group gap-2')}>
          <span className="text-sm font-semibold whitespace-nowrap tracking-[0.01em] transition-colors group-hover:text-foreground">
            {name}
          </span>
          <span className="relative size-8 shrink-0">
            <span className="block size-8 overflow-hidden rounded-full bg-primary-foreground/20 ring-1 ring-primary-foreground/50">
              <UserAvatar className="size-full" />
            </span>
            {online && (
              <span
                aria-hidden
                className="bg-success absolute bottom-0 left-0 size-[9px] rounded-full ring-1 ring-primary-foreground"
              />
            )}
          </span>
        </button>
      }
    >
      <HeaderUserMenuPanel name={name} />
    </Popover>
  )
}

export function HeaderNotificationsPanel({ count }: { count: number }) {
  const items = [
    { id: 1, title: 'Workspace "Campaign Q4" shared with you', meta: '2 minutes ago' },
    { id: 2, title: 'System update successfully completed', meta: '1 hour ago' },
    { id: 3, title: 'New comment on "Homepage Redesign"', meta: '5 hours ago' },
  ]
  return (
    <div className="w-60">
      <div className="border-border flex items-start justify-between border-b px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold tracking-[0.01em]">Notifications</span>
          <span className="text-muted-foreground text-xs tracking-[0.01em]">From humans and agents.</span>
        </div>
        {count > 0 && (
          <span className="bg-destructive rounded-full px-1.5 text-xs font-bold text-primary-foreground tracking-[0.01em]">{count}</span>
        )}
      </div>
      <ul className="py-1">
        {items.map((n) => (
          <li key={n.id}>
            <button type="button" className="hover:bg-muted flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <span className="text-sm tracking-[0.01em]">{n.title}</span>
              <span className="text-muted-foreground text-xs tracking-[0.01em]">{n.meta}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="border-border border-t px-3 py-3">
        <button type="button" className="border-primary text-primary hover:bg-primary/5 w-full rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          View all notifications
        </button>
      </div>
    </div>
  )
}

export function HeaderUserMenuPanel({ name }: { name: string }) {
  const actions = ['Profile', 'Personalization settings', 'Log out']
  return (
    <div className="w-56" role="menu" aria-label={`Actions for ${name}`}>
      <div className="border-border border-b px-4 py-3">
        <div className="text-sm font-semibold tracking-[0.01em]">{name}</div>
        <div className="text-muted-foreground text-xs tracking-[0.01em]">user.n@coremedia.com</div>
      </div>
      <ul className="py-1">
        {actions.map((a) => (
          <li key={a}>
            <button type="button" role="menuitem" className="hover:bg-muted w-full rounded-md px-3 py-2 text-left text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              {a}
            </button>
          </li>
        ))}
      </ul>
      <div className="border-border border-t px-3 py-3">
        <button type="button" className="border-primary text-primary hover:bg-primary/5 w-full rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.01em] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
          Account settings
        </button>
      </div>
    </div>
  )
}

function HeaderSeparator() {
  return <span aria-hidden className="h-6 w-px shrink-0 bg-white/20" />
}

/**
 * Shared styling for the header's interactive controls: white-on-gradient with
 * a high-contrast focus ring (WCAG 2.1 AA — DECISIONS.md D6). Hover background
 * is opt-in via `extra` (notification/user instead darken their indicators).
 */
function headerControl(extra: string) {
  return cn(
    'inline-flex shrink-0 items-center rounded-md text-white transition-colors outline-none',
    'focus-visible:ring-2 focus-visible:ring-white/70',
    extra,
  )
}
