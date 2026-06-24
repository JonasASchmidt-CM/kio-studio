import type { SVGProps } from 'react'

/**
 * KIO send glyph — the brand-gradient paper-plane that submits a prompt.
 *
 * Exact vector exported from the KIO Studio Design Concept Figma (node 146:4575)
 * via the Figma Desktop Bridge. Gradient stops resolve to the brand tokens
 * (magenta → violet) so the send affordance carries the brand expression and
 * follows the brand-token phase (DESIGN.md "tokens are the contract").
 *
 * A brand graphic (gradient-filled), kept out of the flat `shared/icons` set
 * (DECISIONS.md D5). Decorative by default — its button carries the label.
 */
export function KioSendGlyph({ size = 18, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.469 17.4221L17.9323 1.26055C18.2305 0.508551 17.4915 -0.230484 16.7395 0.0677227L0.577924 6.53104C-0.0379384 6.7709 -0.193525 7.5618 0.266751 8.02207L3.24882 11.0171C3.57296 11.3412 4.09158 11.3801 4.45462 11.0949L14.84 3.16L6.89862 13.5389C6.61986 13.9084 6.65876 14.427 6.98289 14.7512L9.97793 17.7332C10.4382 18.1935 11.2291 18.0379 11.469 17.4221Z"
        fill="url(#kio-send-gradient)"
      />
      <defs>
        <linearGradient
          id="kio-send-gradient"
          x1="0.55063"
          y1="-1.23493"
          x2="19.7215"
          y2="0.977625"
          gradientUnits="userSpaceOnUse"
        >
          <stop style={{ stopColor: 'var(--kio-color-brand-accent-from)' }} />
          <stop offset="1" style={{ stopColor: 'var(--kio-color-brand-accent-to)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}
