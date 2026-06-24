import type { ChatMessage, ViewId } from '@/app/layout/framework'
import { HistoryIcon } from '@/shared/icons'

import { ChatDirectActions } from './chat-direct-actions'
import { ChatPromptSubline } from './chat-prompt-subline'
import { ChatTranscript } from './chat-transcript'
import { ChatWelcomeSidebar } from './chat-welcome-sidebar'
import { PromptBox } from './prompt-box'

const SUGGESTIONS = [
  'Help me get started',
  'Create a new article',
  'Create or optimize SEO metadata',
  'Apply taxonomy tags',
  'Generate image metadata',
  'Optimize content for AI',
] as const

export function ChatSidebar({ messages, onSend, onClearChat, onHistory, onOpenArtifact }: { messages: ChatMessage[], onSend: (text: string) => void, onClearChat: () => void, onHistory: () => void, onOpenArtifact: (id: ViewId) => void }) {
  const started = messages.length > 0
  return (
    <aside aria-label="KIO Copilot" data-slot="chat-sidebar" className="flex w-[392px] shrink-0 flex-col p-4">
      <div className="bg-card flex min-h-0 flex-1 flex-col rounded-2xl p-6 shadow-card">
        <div className="flex items-center">
          <button type="button" onClick={onHistory} aria-label="Chat history" className="text-muted-foreground hover:text-foreground focus-visible:ring-ring -m-1 rounded-md p-1 transition-colors focus-visible:ring-2 focus-visible:outline-none">
            <HistoryIcon size={20} />
          </button>
        </div>
        <div className="mt-8 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {started ? (
            <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
          ) : (
            <div className="flex flex-col gap-8">
              <ChatWelcomeSidebar />
              <ChatDirectActions suggestions={SUGGESTIONS} onSend={onSend} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 pt-8">
          <PromptBox onSend={onSend} placeholder="What can I do for you … ?" showBookmark variant="filled" />
          <ChatPromptSubline started={started} onClearChat={onClearChat} />
        </div>
      </div>
    </aside>
  )
}
