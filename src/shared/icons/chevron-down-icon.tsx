import type { IconProps } from './types'

/**
 * "Expand more" (chevron-down) — a Material motif, hand-authored as our own SVG
 * (DECISIONS.md D5). Used to signal an openable menu/overlay. `currentColor`
 * lets it inherit text color and theme from tokens.
 */
export function ChevronDownIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  )
}
