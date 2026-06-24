// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=186-4197
// source=src/app/layout/app-header.tsx
// component=NotificationButton
import figma from 'figma'
const instance = figma.selectedInstance

// count drives both the badge number and hasUnread visibility in code (count > 0)
const count = instance.getString('notificationCount')

export default {
  example: figma.code`<NotificationButton count={${count}} />`,
  imports: ['import { NotificationButton } from "@/app/layout/app-header"'],
  id: 'notification-button',
  metadata: { nestable: true },
}
