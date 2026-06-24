// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=186-4183
// source=src/app/layout/app-header.tsx
// component=AppIdentity
import figma from 'figma'
const instance = figma.selectedInstance

const product = instance.getString('product')

export default {
  example: figma.code`<AppIdentity product="${product}" />`,
  imports: ['import { AppIdentity } from "@/app/layout/app-header"'],
  id: 'app-identity',
  metadata: { nestable: true },
}
