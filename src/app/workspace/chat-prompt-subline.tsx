export function ChatPromptSubline({ started, onClearChat }: { started: boolean, onClearChat: () => void }) {
  return (
    <div className="text-muted-foreground font-heading flex items-center justify-between gap-3 px-1 text-xs">
      <span>AI makes mistakes, always check.</span>
      {started && (
        <button type="button" onClick={onClearChat} className="hover:text-foreground focus-visible:ring-ring rounded-sm underline underline-offset-2 focus-visible:ring-2 focus-visible:outline-none">
          Clear Chat
        </button>
      )}
    </div>
  )
}
