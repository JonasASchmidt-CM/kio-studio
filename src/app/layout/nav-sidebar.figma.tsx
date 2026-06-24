import figma from '@figma/code-connect'

import { PRIMARY_NAV, SECONDARY_NAV } from './framework'
import { NavSidebar } from './nav-sidebar'

figma.connect(NavSidebar, 'https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ?node-id=56-121', {
  example: () => (
    <NavSidebar
      expanded={false}
      onToggle={() => {}}
      primary={PRIMARY_NAV}
      secondary={SECONDARY_NAV}
      activeViewId={null}
      atHome
      onSelect={() => {}}
    />
  ),
})

figma.connect(NavSidebar, 'https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ?node-id=56-135', {
  example: () => (
    <NavSidebar
      expanded
      onToggle={() => {}}
      primary={PRIMARY_NAV}
      secondary={SECONDARY_NAV}
      activeViewId={null}
      atHome
      onSelect={() => {}}
    />
  ),
})
