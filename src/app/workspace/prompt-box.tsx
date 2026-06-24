import { useState } from 'react'

import { KioSendGlyph } from '@/shared/brand/kio-send-glyph'
import { BookmarksIcon } from '@/shared/icons'
import { cn } from '@/shared/lib/utils'

/**
 * The chat prompt input — KIO's primary entry point. Enter sends; Shift+Enter
 * newlines. Visual per the "Chat Area" blank-slate design (Figma 146:4541): a
 * soft-filled field with the brand-gradient send glyph and, on the home prompt,
 * a bookmark toggle for saving the conversation.
 */
export function PromptBox({
  onSend,
  placeholder = 'Ask KIO to create, find, or change something…',
  size = 'lg',
  showBookmark = false,
}: {
  onSend: (text: string) => void
  placeholder?: string
  size?: 'lg' | 'sm'
  showBookmark?: boolean
}) {
  const [value, setValue] = useState('')
  const [bookmarked, setBookmarked] = useState(false)

  function submit() {
    const text = value.trim()
    if (!text) return
    onSend(text)
    setValue('')
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className={cn(
        'bg-card focus-within:ring-ring/40 flex items-center gap-2 rounded-xl shadow-sm focus-within:ring-2',
        size === 'lg' ? 'py-2.5 pr-3.5 pl-4' : 'p-2 pl-3',
      )}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
        rows={1}
        placeholder={placeholder}
        aria-label="Message KIO"
        className="placeholder:text-muted-foreground max-h-40 flex-1 resize-none bg-transparent py-1.5 text-base outline-none"
      />
      <div className="flex items-center gap-1">
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send message"
          className="focus-visible:ring-ring grid size-7 shrink-0 place-items-center rounded-md transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-40"
        >
          <KioSendGlyph size={18} />
        </button>
        {showBookmark && (
          <>
            <span aria-hidden className="bg-border h-4 w-px shrink-0" />
            <button
              type="button"
              aria-label="Bookmark this conversation"
              aria-pressed={bookmarked}
              onClick={() => setBookmarked((v) => !v)}
              className={cn(
                'focus-visible:ring-ring grid size-7 shrink-0 place-items-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none',
                bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <BookmarksIcon size={20} />
            </button>
          </>
        )}
      </div>
    </form>
  )
}
