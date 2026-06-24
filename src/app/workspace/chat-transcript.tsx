import type { ChatMessage, ViewId } from '@/app/layout/framework'
import { VIEW_TITLES } from '@/app/layout/framework'
import { AutoAwesomeIcon } from '@/shared/icons'
import { cn } from '@/shared/lib/utils'

/**
 * Chat transcript. KIO turns that surfaced a UI carry a link back to it
 * (Confluence: the protocol retains a link to the surfaced artifact).
 */
export function ChatTranscript({
  messages,
  onOpenArtifact,
}: {
  messages: ChatMessage[]
  onOpenArtifact: (id: ViewId) => void
}) {
  return (
    <ol className="flex flex-col gap-4">
      {messages.map((m) => {
        const art = m.artifactViewId
        return (
          <li key={m.id} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
            {m.role === 'kio' && (
              <span className="bg-primary/10 text-primary mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg">
                <AutoAwesomeIcon size={16} />
              </span>
            )}
            <div
              className={cn(
                'flex max-w-[85%] flex-col items-start gap-2 rounded-2xl px-3.5 py-2.5 text-base',
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
              )}
            >
              <span>{m.text}</span>
              {art && (
                <button
                  type="button"
                  onClick={() => onOpenArtifact(art)}
                  className="border-border bg-background text-foreground hover:bg-muted/60 focus-visible:ring-ring inline-flex w-fit items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
                >
                  <AutoAwesomeIcon size={14} className="text-primary" />
                  {VIEW_TITLES[art]}
                </button>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
