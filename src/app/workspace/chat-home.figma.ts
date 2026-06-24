// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=206-245
// source=src/app/workspace/chat-home.tsx
// component=ChatHome
import figma from 'figma'

export default {
  example: figma.code`<ChatHome messages={[]} onSend={() => {}} onClearChat={() => {}} onOpenArtifact={() => {}} />`,
  imports: ['import { ChatHome } from "@/app/workspace/chat-home"'],
  id: 'chat-home',
  metadata: { nestable: false },
}
