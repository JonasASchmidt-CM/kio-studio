// url=https://www.figma.com/design/w2XyYK1mhVb5T7JuzXUAmQ/KIO-Studio---Design-System?node-id=186-4191
// source=src/app/layout/app-header.tsx
// component=SiteLocaleSelector
import figma from 'figma'

// SiteLocaleSelector manages its own site/locale state internally — no props at this level.
// The Figma siteLabel property is a design-time preview value only.
export default {
  example: figma.code`<SiteLocaleSelector />`,
  imports: ['import { SiteLocaleSelector } from "@/app/layout/app-header"'],
  id: 'site-locale-selector',
  metadata: { nestable: true },
}
