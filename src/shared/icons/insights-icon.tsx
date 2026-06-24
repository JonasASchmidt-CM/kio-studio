import type { IconProps } from './types'

/** "Insights" (bar chart, used for experiments) — Material motif, self-owned SVG (D5). */
export function InsightsIcon({ size = 24, ...props }: IconProps) {
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
      <path d="M5 9.2h3V19H5zm5.6-4.2h2.8v14h-2.8zm5.6 8H19v6h-2.8z" />
    </svg>
  )
}
