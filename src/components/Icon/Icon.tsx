import type { SVGProps } from 'react'
import { iconPaths } from './icons'
import type { IconName } from './icons'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Name of a built-in icon. Ignored if `children` is provided. */
  name?: IconName
  /** Width/height of the icon in pixels (or any CSS size unit). @default 20 */
  size?: number | string
}

export function Icon({ name, size = 20, children, 'aria-label': ariaLabel, ...rest }: IconProps) {
  const content = children ?? (name ? iconPaths[name] : null)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      {content}
    </svg>
  )
}
