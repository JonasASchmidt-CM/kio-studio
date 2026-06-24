import type { SVGProps } from 'react'
import { useEffect, useRef, useState } from 'react'

/**
 * KIO avatar — the friendly "smiley" face KIO presents on the chat blank slate.
 *
 * Exact vector exported from the KIO Studio Design Concept Figma (node 146:4547,
 * the "Chat Area" initial state) via the Figma Desktop Bridge. A faint neutral
 * ring frames a brand-gradient eyes-and-smile glyph. The gradient stops resolve
 * to the brand tokens (magenta → violet) so it follows the CoreMedia brand-token
 * phase automatically (DESIGN.md "tokens are the contract").
 *
 * A brand graphic (gradient-filled), deliberately kept out of `shared/icons`
 * (the flat, `currentColor` Material-motif set, DECISIONS.md D5). Natural ratio
 * is square; size via the `size` prop. Decorative by default (`aria-hidden`) —
 * the surrounding greeting carries the accessible meaning.
 */
export function KioAvatar({ size = 80, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  const [eyeShift, setEyeShift] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const angle = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2))
      setEyeShift({ x: Math.cos(angle) * 1.5, y: Math.sin(angle) * 1.5 })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.3">
        <path
          d="M40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0ZM40 8.42105C22.5594 8.42105 8.42105 22.5594 8.42105 40C8.42105 57.4406 22.5594 71.5789 40 71.5789C57.4406 71.5789 71.5789 57.4406 71.5789 40C71.5789 22.5594 57.4406 8.42105 40 8.42105Z"
          fill="var(--kio-color-neutral-400)"
        />
      </g>
      <path
        d="M7.5948 55.7818C9.55101 54.5245 12.1561 55.0911 13.4133 57.0473C19.1902 66.0355 29.1187 71.5784 40.0005 71.5784C50.6506 71.5784 60.3945 66.2709 66.2284 57.5938C67.5258 55.664 70.142 55.1513 72.0718 56.4488C74.0016 57.7463 74.5142 60.3625 73.2168 62.2923C65.8346 73.2723 53.4845 79.9994 40.0005 79.9994C26.2227 79.9994 13.6397 72.9746 6.32929 61.6004C5.072 59.6442 5.63859 57.0391 7.5948 55.7818Z"
        fill="url(#kio-avatar-gradient)"
      />
      <g transform={`translate(${eyeShift.x}, ${eyeShift.y})`}>
        <path
          d="M50.8275 27.0671C53.1529 27.0671 55.0381 28.9522 55.0381 31.2776V35.8301C55.0381 38.1555 53.1529 40.0406 50.8275 40.0406C48.5021 40.0406 46.617 38.1555 46.617 35.8301V31.2776C46.617 28.9522 48.5021 27.0671 50.8275 27.0671ZM29.1734 26.616C31.4988 26.616 33.3839 28.5011 33.3839 30.8265V35.8301C33.3839 38.1555 31.4988 40.0406 29.1734 40.0406C26.848 40.0406 24.9629 38.1555 24.9629 35.8301V30.8265C24.9629 28.5011 26.848 26.616 29.1734 26.616Z"
          fill="url(#kio-avatar-gradient)"
        />
      </g>
      <defs>
        <linearGradient
          id="kio-avatar-gradient"
          x1="7.74879"
          y1="22.9535"
          x2="79.8606"
          y2="33.5974"
          gradientUnits="userSpaceOnUse"
        >
          <stop style={{ stopColor: 'var(--kio-color-brand-accent-from)' }} />
          <stop offset="1" style={{ stopColor: 'var(--kio-color-brand-accent-to)' }} />
        </linearGradient>
      </defs>
    </svg>
  )
}
