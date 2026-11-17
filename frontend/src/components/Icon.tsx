import type { SVGProps } from 'react'

export type IconName = 'cart' | 'menu' | 'user'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

function Icon({ name, ...props }: IconProps) {
  const sharedProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 2,
    viewBox: '0 0 24 24',
    'aria-hidden': true as const,
    ...props,
  }

  if (name === 'cart') {
    return (
      <svg {...sharedProps}>
        <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.4L22 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
    )
  }

  if (name === 'menu') {
    return (
      <svg {...sharedProps}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )
  }

  return (
    <svg {...sharedProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  )
}

export default Icon
