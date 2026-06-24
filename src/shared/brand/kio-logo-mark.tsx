import type { SVGProps } from 'react'

/**
 * KIO / CoreMedia logomark — the open-"C" brand mark with its inner dot.
 *
 * Exact vector exported from the KIO Studio Design System Figma (node 172:3492)
 * via the Figma Desktop Bridge. `fill="currentColor"` so it inherits text color
 * (white on the brand-gradient header; themeable anywhere else). Natural ratio
 * is 24×28 — size it via className (e.g. `h-7 w-6`). Decorative by default
 * (aria-hidden); the surrounding control/text carries the accessible name.
 *
 * This is a brand graphic asset, deliberately kept out of `shared/icons`
 * (which is the Material-motif icon set, DECISIONS.md D5).
 */
export function KioLogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.9933 20.9183C14.0002 22.1758 10.3515 21.4273 8.14032 18.6707C5.96515 15.9621 5.96716 12.0379 8.14032 9.32927C10.3515 6.57474 14.0002 5.82622 16.9933 7.08173C18.6813 7.79032 20.628 7.451 21.9251 6.16156L24 4.09566C18.2804 -1.59904 8.81793 -1.35553 3.41911 4.8282C-1.1397 10.0478 -1.1397 17.9522 3.41911 23.1718C8.81793 29.3555 18.2804 29.599 24 23.9043L21.9251 21.8384C20.6299 20.549 18.6813 20.2077 16.9933 20.9183Z" />
      <path d="M11.7208 13.9741C11.7208 15.2535 12.7673 16.2954 14.0524 16.2954C15.3374 16.2954 16.3838 15.2535 16.3838 13.9741C16.3838 12.6946 15.3393 11.6527 14.0524 11.6527C12.7653 11.6527 11.7208 12.6946 11.7208 13.9741Z" />
    </svg>
  )
}
