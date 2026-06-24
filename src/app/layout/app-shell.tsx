import { useState } from 'react'

import { ChatHome } from '@/app/workspace/chat-home'
import { SurfacedView as SurfacedViewPanel } from '@/app/workspace/surfaced-view'

import { AppHeader } from './app-header'
import { ChatRail } from './chat-rail'
import { ContextSidebar } from './context-sidebar'
import type { ChatMessage, ContextItem, NavItem, SurfacedView, ViewId } from './framework'
import { PRIMARY_NAV, SECONDARY_NAV, VIEW_TITLES, uid } from './framework'
import { NavSidebar } from './nav-sidebar'

/**
 * AppShell — the KIO Studio app-layout framework and its core interactions
 * (Confluence "App Layout Framework & Interaction Hypothesis").
 *
 * Holds the shell state: nav collapsed/expanded, the chat protocol, the
 * currently-surfaced view, and the conversation's activity. The load-bearing
 * interaction: when a UI is surfaced (by a nav click OR conversationally), the
 * main area shows it and the chat relocates from the centre to a left rail;
 * "Home" / "Back to home" / "Close" return the chat to the centre.
 */
export function AppShell() {
  const [navExpanded, setNavExpanded] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [view, setView] = useState<SurfacedView | null>(null)
  const [context, setContext] = useState<ContextItem[]>([])

  function surface(viewId: ViewId, source: SurfacedView['source']) {
    setView({ id: viewId, title: VIEW_TITLES[viewId], source })
    const kind: ContextItem['kind'] =
      viewId === 'settings' ? 'setting' : source === 'nav' ? 'context' : 'artifact'
    setContext((prev) =>
      prev.some((c) => c.viewId === viewId && c.kind === kind)
        ? prev
        : [{ id: uid('ctx'), kind, label: VIEW_TITLES[viewId], viewId }, ...prev],
    )
  }

  function handleSend(text: string) {
    // Conversational trigger: KIO answers and surfaces a view, linked in the chat.
    const viewId = inferView(text)
    setMessages((prev) => [
      ...prev,
      { id: uid('msg'), role: 'user', text },
      {
        id: uid('msg'),
        role: 'kio',
        text: `Opening ${VIEW_TITLES[viewId].toLowerCase()} in the workspace so we can work on it together.`,
        artifactViewId: viewId,
      },
    ])
    surface(viewId, 'chat')
  }

  function handleNav(item: NavItem) {
    if (!item.viewId) {
      setView(null) // Home → chat returns to the centre
      return
    }
    surface(item.viewId, 'nav')
  }

  return (
    <div className="bg-background text-foreground flex h-dvh flex-col overflow-hidden">
      <AppHeader />
      <div className="flex min-h-0 flex-1">
        <NavSidebar
          expanded={navExpanded}
          onToggle={() => setNavExpanded((v) => !v)}
          primary={PRIMARY_NAV}
          secondary={SECONDARY_NAV}
          activeViewId={view?.id ?? null}
          atHome={view === null}
          onSelect={handleNav}
        />
        {view && (
          <ChatRail
            messages={messages}
            onSend={handleSend}
            onReturnHome={() => setView(null)}
            onOpenArtifact={(id) => surface(id, 'chat')}
          />
        )}
        <main data-slot="workspace" className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {view ? (
            <SurfacedViewPanel view={view} onClose={() => setView(null)} />
          ) : (
            <ChatHome
              messages={messages}
              onSend={handleSend}
              onClearChat={() => setMessages([])}
              onOpenArtifact={(id) => surface(id, 'chat')}
            />
          )}
        </main>
        <ContextSidebar items={context} onOpen={(id) => surface(id, 'chat')} />
      </div>
    </div>
  )
}

/** Demo heuristic: pick which view a prompt surfaces. */
function inferView(text: string): ViewId {
  const t = text.toLowerCase()
  if (/experiment|a\/b|variant|test/.test(t)) return 'experiment'
  if (/setting|personali|rule|config|prefer/.test(t)) return 'settings'
  return 'content'
}
