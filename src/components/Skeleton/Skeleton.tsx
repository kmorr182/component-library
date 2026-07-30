import type { CSSProperties } from 'react'
import styles from './Skeleton.module.css'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps {
  /** Shape of the placeholder. @default 'text' */
  variant?: SkeletonVariant
  /** Width (any CSS size unit). Defaults to '100%' for 'text', 40 otherwise. */
  width?: number | string
  /** Height (any CSS size unit). Defaults to one line-height for 'text', 40 otherwise. */
  height?: number | string
  className?: string
  style?: CSSProperties
}

export function Skeleton({ variant = 'text', width, height, className, style }: SkeletonProps) {
  const resolvedWidth = width ?? (variant === 'text' ? '100%' : 40)
  const resolvedHeight = height ?? (variant === 'text' ? undefined : 40)

  return (
    <span
      aria-hidden="true"
      className={[styles.skeleton, styles[variant], className].filter(Boolean).join(' ')}
      style={{ width: resolvedWidth, height: resolvedHeight, ...style }}
    />
  )
}
