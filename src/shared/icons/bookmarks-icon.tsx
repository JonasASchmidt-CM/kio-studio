import type { IconProps } from './types'

/** "Bookmarks" (save the conversation) — Material motif, self-owned SVG (D5). */
export function BookmarksIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.5 5.83325V16.6416L8.99167 15.1333L8.33333 14.8499L7.675 15.1333L4.16667 16.6416V5.83325H12.5ZM15.8333 0.833252H7.49167C6.575 0.833252 5.83333 1.58325 5.83333 2.49992H14.1667C15.0833 2.49992 15.8333 3.24992 15.8333 4.16659V14.9999L17.5 15.8333V2.49992C17.5 1.58325 16.75 0.833252 15.8333 0.833252ZM12.5 4.16659H4.16667C3.25 4.16659 2.5 4.91659 2.5 5.83325V19.1666L8.33333 16.6666L14.1667 19.1666V5.83325C14.1667 4.91659 13.4167 4.16659 12.5 4.16659Z" />
    </svg>
  )
}
