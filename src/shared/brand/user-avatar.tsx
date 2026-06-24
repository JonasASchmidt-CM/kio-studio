import type { SVGProps } from 'react'

/**
 * Illustrated placeholder user portrait — a flat, self-contained avatar (no
 * external image, privacy by design). Fills its container; put it inside a
 * `rounded-full overflow-hidden` box. Swap for a real photo when available.
 */
export function UserAvatar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="User avatar" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="64" height="64" fill="#FCE3C9" />
      {/* shoulders / turtleneck — brand violet */}
      <path d="M11 64c0-12 9.4-19 21-19s21 7 21 19z" fill="#5852FF" />
      {/* neck */}
      <rect x="27.5" y="37" width="9" height="13" rx="4.5" fill="#E7AC85" />
      {/* head */}
      <circle cx="32" cy="29" r="14.5" fill="#F2C7A0" />
      {/* hair */}
      <path d="M17 28c0-9.5 6.4-15.5 15-15.5S47 18.5 47 28c0-3.4-3-5.4-6.4-5.4-2.3 0-3.6 1.1-8.6 1.1s-6.3-1.1-8.6-1.1C19.9 22.6 17 24.6 17 28z" fill="#23262E" />
      {/* sunglasses */}
      <rect x="21.5" y="26.5" width="8.5" height="6.2" rx="3.1" fill="#15161A" />
      <rect x="34" y="26.5" width="8.5" height="6.2" rx="3.1" fill="#15161A" />
      <rect x="29.8" y="28.8" width="4.4" height="2" rx="1" fill="#15161A" />
      {/* smile */}
      <path d="M27.5 36.5c2.3 2.2 6.7 2.2 9 0" stroke="#C98A63" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
