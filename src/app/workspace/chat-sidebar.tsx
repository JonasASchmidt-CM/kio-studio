import type { ChatMessage, ViewId } from '@/app/layout/framework'
import { KioSparkleMark } from '@/shared/brand/kio-sparkle-mark'
import { HistoryIcon } from '@/shared/icons'

import { ChatTranscript } from './chat-transcript'
import { PromptBox } from './prompt-box'

/** Suggested first moves, as gradient-bordered chips (left-aligned in the panel). */
const SUGGESTIONS = [
  'Help me get started',
  'Create a new article',
  'Create or optimize SEO metadata',
  'Apply taxonomy tags',
  'Generate image metadata',
  'Optimize content for AI',
] as const

/**
 * The floating "KIO Copilot" chat sidebar (Figma Design System node 174:3892) —
 * a rounded, shadowed panel holding the chat while the workspace shows a surfaced
 * view. Personalized blank slate (sparkle avatar, greeting, suggestion chips)
 * until a conversation begins, then the transcript; prompt pinned at the bottom.
 */
export function ChatSidebar({
  messages,
  onSend,
  onClearChat,
  onHistory,
  onOpenArtifact,
}: {
  messages: ChatMessage[]
  onSend: (text: string) => void
  onClearChat: () => void
  onHistory: () => void
  onOpenArtifact: (id: ViewId) => void
}) {
  const started = messages.length > 0

  return (
    <aside aria-label="KIO Copilot" data-slot="chat-sidebar" className="flex w-[392px] shrink-0 flex-col p-4">
      <div className="bg-card flex min-h-0 flex-1 flex-col rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
        <div className="flex items-center">
          <button
            type="button"
            onClick={onHistory}
            aria-label="Chat history"
            className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -m-1 rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <HistoryIcon size={20} />
          </button>
        </div>

        <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {started ? (
            <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
          ) : (
            <div className="flex flex-col gap-8">
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
              <ul className="flex flex-wrap gap-3">
                {SUGGESTIONS.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSend(label)}
                      className="group focus-visible:ring-ring rounded-full bg-[image:var(--brand-gradient)] p-px transition-transform focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
                    >
                      <span className="bg-card group-hover:bg-muted block rounded-full px-3 py-1.5 text-sm transition-colors">
                        {label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-8">
          <PromptBox onSend={onSend} placeholder="What can I do for you … ?" showBookmark variant="filled" />
          <div className="text-muted-foreground font-heading flex items-center justify-between gap-3 px-1 text-xs">
            <span>AI makes mistakes, always check.</span>
            {started && (
              <button
                type="button"
                onClick={onClearChat}
                className="hover:text-foreground focus-visible:ring-ring rounded-sm underline underline-offset-2 focus-visible:ring-2 focus-visible:outline-none"
              >
                Clear Chat
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
