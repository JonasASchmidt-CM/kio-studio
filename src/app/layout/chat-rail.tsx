import type { ChatMessage, ViewId } from './framework'
import { ChatTranscript } from '@/app/workspace/chat-transcript'
import { PromptBox } from '@/app/workspace/prompt-box'
import { AutoAwesomeIcon } from '@/shared/icons'

/**
 * The chat docked to a left rail — its compact form once the main area is
 * showing a specific UI (Confluence: "the chat moves to a left sidebar to make
 * room"). "Back to home" returns the chat to the centre.
 */
export function ChatRail({
  messages,
  onSend,
  onReturnHome,
  onOpenArtifact,
}: {
  messages: ChatMessage[]
  onSend: (text: string) => void
  onReturnHome: () => void
  onOpenArtifact: (id: ViewId) => void
}) {
  return (
    <aside
      aria-label="KIO chat"
      data-slot="chat-rail"
      className="border-border bg-background flex w-[340px] shrink-0 flex-col border-r"
    >
      <div className="border-border flex h-12 shrink-0 items-center justify-between gap-2 border-b px-3">
        <span className="flex items-center gap-2 font-semibold">
          <AutoAwesomeIcon size={18} className="text-primary" /> KIO
        </span>
        <button
          type="button"
          onClick={onReturnHome}
          className="text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-ring rounded-md px-2 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          Back to home
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
      </div>
      <div className="border-border border-t p-3">
        <PromptBox onSend={onSend} size="sm" placeholder="Reply to KIO…" />
      </div>
    </aside>
  )
}
