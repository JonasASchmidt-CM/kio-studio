import type { ChatMessage, ViewId } from '@/app/layout/framework'
import { KioAvatar } from '@/shared/brand/kio-avatar'

import { ChatTranscript } from './chat-transcript'
import { PromptBox } from './prompt-box'

/** Suggested first moves, surfaced as gradient-bordered chips on the blank slate. */
const SUGGESTIONS = [
  'Help me get started',
  'Create a new article',
  'Create or optimize SEO metadata',
  'Apply taxonomy tags',
  'Generate image metadata',
  'Optimize content for AI',
] as const

/**
 * The chat's "start" state — KIO centred in the main area as a personalized
 * blank slate (avatar, greeting, suggestion chips), with the prompt pinned at
 * the bottom (Figma "Chat Area" initial state, 146:4541). Once a conversation
 * begins, the greeting gives way to the transcript; the prompt stays pinned.
 */
export function ChatHome({
  messages,
  onSend,
  onClearChat,
  onOpenArtifact,
}: {
  messages: ChatMessage[]
  onSend: (text: string) => void
  onClearChat: () => void
  onOpenArtifact: (id: ViewId) => void
}) {
  const started = messages.length > 0

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--kio-color-neutral-50)]">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
        {started ? (
          <div className="flex flex-1 flex-col py-8">
            <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col justify-center py-10">
            <div className="mx-auto flex w-full max-w-[548px] flex-col items-center gap-8 text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center">
                  {/* #ffffff corona — radial highlight lifting the avatar off the off-white canvas */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#ffffff_30%,transparent_72%)]"
                  />
                  <KioAvatar size={80} className="relative z-10" />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-[1.75rem] font-bold leading-tight">Good morning, Mira.</h1>
                  <p className="text-lg">I am KIO, your AI assistant. What can I do for you?</p>
                </div>
              </div>
              <ul className="flex flex-wrap justify-center gap-3">
                {SUGGESTIONS.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSend(label)}
                      className="group focus-visible:ring-ring rounded-full bg-[image:var(--brand-gradient)] p-px transition-transform focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
                    >
                      <span className="bg-background group-hover:bg-muted block rounded-full px-3 py-1.5 text-sm transition-colors">
                        {label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="sticky bottom-0 bg-[var(--kio-color-neutral-50)] pt-2 pb-6">
          <PromptBox onSend={onSend} placeholder="What can I do for you … ?" showBookmark />
          <div className="text-muted-foreground mt-3 flex items-center justify-between gap-3 px-1 text-xs">
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
    </div>
  )
}
