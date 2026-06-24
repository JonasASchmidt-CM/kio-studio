import type { ChatMessage, ViewId } from '@/app/layout/framework'

import { ChatDirectActions } from './chat-direct-actions'
import { ChatPromptSubline } from './chat-prompt-subline'
import { ChatTranscript } from './chat-transcript'
import { ChatWelcomeMainArea } from './chat-welcome-main-area'
import { PromptBox } from './prompt-box'

const SUGGESTIONS = [
  'Help me get started',
  'Create a new article',
  'Create or optimize SEO metadata',
  'Apply taxonomy tags',
  'Generate image metadata',
  'Optimize content for AI',
] as const

export function ChatHome({ messages, onSend, onClearChat, onOpenArtifact }: { messages: ChatMessage[], onSend: (text: string) => void, onClearChat: () => void, onOpenArtifact: (id: ViewId) => void }) {
  const started = messages.length > 0
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-[var(--kio-color-neutral-50)] shadow-[inset_0_4px_12px_rgba(0,0,0,0.24)]">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6">
        {started ? (
          <div className="flex flex-1 flex-col py-8">
            <ChatTranscript messages={messages} onOpenArtifact={onOpenArtifact} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-[var(--kio-spacing-blank-slate-gap)] px-[var(--kio-spacing-blank-slate-padding)]" style={{ contain: 'layout' }}>
            <ChatWelcomeMainArea />
            <ChatDirectActions suggestions={SUGGESTIONS} onSend={onSend} />
          </div>
        )}
        <div className="sticky bottom-0 bg-[var(--kio-color-neutral-50)] pt-2 pb-6">
          <PromptBox onSend={onSend} placeholder="What can I do for you … ?" showBookmark />
          <div className="mt-3">
            <ChatPromptSubline started={started} onClearChat={onClearChat} />
          </div>
        </div>
      </div>
    </div>
  )
}
