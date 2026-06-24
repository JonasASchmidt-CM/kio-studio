// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=206-265
// source=src/app/workspace/prompt-box.tsx
// component=PromptBox
import figma from 'figma'

export default {
  example: figma.code`<PromptBox onSend={() => {}} placeholder="What can I do for you … ?" showBookmark />`,
  imports: ['import { PromptBox } from "@/app/workspace/prompt-box"'],
  id: 'prompt-box',
  metadata: { nestable: false },
}
