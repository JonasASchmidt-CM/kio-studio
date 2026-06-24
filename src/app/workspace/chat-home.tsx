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
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--kio-color-neutral-50)] shadow-[inset_0_4px_12px_rgba(0,0,0,0.24)]">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
        {started ? (
          <div className="flex flex-1 flex-col py-8">
            <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-[32px] px-[60px]" style={{ contain: 'layout' }}>
            <div className="flex flex-col gap-[24px] items-center w-full" style={{ contain: 'layout' }}>
              <div className="flex flex-col gap-[24px] items-center" style={{ contain: 'layout' }}>
                <div className="relative flex items-center justify-center size-[80px]">
                  {/* #ffffff corona — radial highlight lifting the avatar off the off-white canvas */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#ffffff_30%,transparent_72%)]"
                  />
                  <KioAvatar size={80} className="relative z-10" />
                </div>
                <div className="flex flex-col gap-[8px] items-center w-full text-center" style={{ contain: 'layout' }}>
                  <h1 className="text-[36px] font-bold leading-[1.3] font-heading bg-clip-text text-transparent bg-[linear-gradient(145.83423563990908deg,rgb(213,80,244)_2.0327%,rgb(96,82,254)_98.789%)]">Good morning, Mira.</h1>
                  <p className="text-[20px] font-normal leading-[1.5] text-black">I am KIO, your AI assistant. What can I do for you?</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-[12px] items-center justify-center w-full" style={{ contain: 'layout' }}>
                {SUGGESTIONS.map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSend(label)}
                      className="border border-solid border-[#d550f4] flex items-center justify-center px-[16px] py-[8px] rounded-[16px] focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none transition-all hover:bg-[#d550f4] hover:bg-opacity-15"
                    >
                      <p className="text-[14px] font-normal leading-[1.1] whitespace-nowrap text-center bg-clip-text text-transparent bg-[linear-gradient(133.65366819109892deg,rgb(213,80,244)_2.0327%,rgb(96,82,254)_98.789%)]">
                        {label}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="sticky bottom-0 bg-[var(--kio-color-neutral-50)] pt-2 pb-6">
          <PromptBox onSend={onSend} placeholder="What can I do for you … ?" showBookmark />
          <div className="text-muted-foreground font-heading mt-3 flex items-center justify-between gap-3 px-1 text-xs">
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
