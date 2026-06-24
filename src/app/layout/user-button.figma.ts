// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=186-4203
// source=src/app/layout/app-header.tsx
// component=UserMenuButton
import figma from 'figma'
const instance = figma.selectedInstance

const name = instance.getString('userName')
const online = instance.getBoolean('online')

export default {
  example: figma.code`<UserMenuButton name="${name}" ${online ? 'online' : ''} />`,
  imports: ['import { UserMenuButton } from "@/app/layout/app-header"'],
  id: 'user-menu-button',
  metadata: { nestable: true },
}
