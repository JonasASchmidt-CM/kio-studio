// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=203-485
// source=src/app/workspace/chat-sidebar.tsx
// component=ChatSidebar
import figma from 'figma'

export default {
  example: figma.code`<ChatSidebar messages={[]} onSend={() => {}} onClearChat={() => {}} onHistory={() => {}} onOpenArtifact={() => {}} />`,
  imports: ['import { ChatSidebar } from "@/app/workspace/chat-sidebar"'],
  id: 'chat-sidebar',
  metadata: { nestable: false },
}
