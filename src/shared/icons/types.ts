import type { SVGProps } from 'react'

/**
 * Shared props for KIO icon components.
 *
 * Per DECISIONS.md D5, icons are our own SVG React components (Material motifs),
 * NOT `@mui/icons-material`. Icons are decorative by default (`aria-hidden`);
 * pass `aria-hidden={false}` + an accessible label when an icon is meaningful.
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
  /** Width/height in px (icons are square). Defaults to 24. */
  size?: number
}
