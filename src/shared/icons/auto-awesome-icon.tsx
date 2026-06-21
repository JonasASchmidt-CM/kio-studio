import type { IconProps } from './types'

/**
 * "Auto Awesome" (sparkle) — a Material motif, hand-authored as our own SVG
 * (DECISIONS.md D5). Placeholder geometry for the scaffold; the brand/icon phase
 * replaces these paths with the exact Material motifs exported from Figma.
 *
 * `currentColor` makes the icon inherit text color, so it themes from tokens
 * (e.g. `className="text-primary"`).
 */
export function AutoAwesomeIcon({ size = 24, ...props }: IconProps) {
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
      <path d="M12 1.5l2.1 6.4 6.4 2.1-6.4 2.1L12 18.5l-2.1-6.4L3.5 10l6.4-2.1L12 1.5zM19 16l.9 2.6 2.6.9-2.6.9L19 23l-.9-2.6-2.6-.9 2.6-.9L19 16z" />
    </svg>
  )
}
