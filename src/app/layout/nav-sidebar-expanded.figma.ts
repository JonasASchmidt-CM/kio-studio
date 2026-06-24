// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=56-135
// source=src/app/layout/nav-sidebar.tsx
// component=NavSidebar
import figma from 'figma'

export default {
  example: figma.code`<NavSidebar expanded onToggle={() => {}} primary={PRIMARY_NAV} secondary={SECONDARY_NAV} activeViewId={null} atHome onSelect={() => {}} />`,
  imports: [
    'import { NavSidebar } from "@/app/layout/nav-sidebar"',
    'import { PRIMARY_NAV, SECONDARY_NAV } from "@/app/layout/framework"',
  ],
  id: 'nav-sidebar-expanded',
  metadata: { nestable: false },
}
