import type { IconProps } from './types'

/** "History" (past conversations / recents) — Material clock-rewind motif, self-owned SVG (D5). */
export function HistoryIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M0.833328 3.33334V8.33334H5.83333" />
      <path d="M2.925 12.5C3.46533 14.0336 4.48945 15.3502 5.84305 16.2511C7.19665 17.1521 8.8064 17.5888 10.4298 17.4954C12.0531 17.402 13.6021 16.7835 14.8434 15.7331C16.0847 14.6828 16.951 13.2575 17.3118 11.672C17.6727 10.0865 17.5084 8.42664 16.8439 6.94259C16.1793 5.45855 15.0504 4.23067 13.6274 3.44398C12.2043 2.65729 10.5641 2.3544 8.9539 2.58094C7.34371 2.80748 5.85076 3.55119 4.7 4.70001L0.833328 8.33334" />
      <path d="M10 5.83334V10.8333L13.3333 12.5" />
    </svg>
  )
}
