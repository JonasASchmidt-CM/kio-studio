import { ChatActionButton } from './chat-action-button'

export function ChatDirectActions({ suggestions, onSend }: { suggestions: readonly string[], onSend: (label: string) => void }) {
  return (
    <ul className="flex flex-wrap gap-[var(--kio-spacing-button-gap)] items-center justify-center w-full" style={{ contain: 'layout' }}>
      {suggestions.map((label) => (
        <li key={label}>
          <ChatActionButton label={label} onAction={() => onSend(label)} />
        </li>
      ))}
    </ul>
  )
}
