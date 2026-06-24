// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=209-148
// source=src/app/workspace/chat-action-button.tsx
// component=ChatActionButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('characters')

export default {
  example: figma.code`<ChatActionButton label="${label}" onAction={() => {}} />`,
  imports: ['import { ChatActionButton } from "@/app/workspace/chat-action-button"'],
  id: 'chat-action-button',
  metadata: { nestable: true },
}
