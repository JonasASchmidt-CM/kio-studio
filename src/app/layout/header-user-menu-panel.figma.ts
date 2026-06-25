// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=234-171
// source=src/app/layout/app-header.tsx
// component=HeaderUserMenuPanel
import figma from 'figma'
const instance = figma.selectedInstance
const name = instance.getString('userName')
export default { example: figma.code`<HeaderUserMenuPanel name="${name}" />`, imports: ['import { HeaderUserMenuPanel } from "@/app/layout/app-header"'], id: 'header-user-menu-panel', metadata: { nestable: true } }
