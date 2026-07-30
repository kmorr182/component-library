import type { CSSProperties } from 'react'
import styles from './Spinner.module.css'

export type SpinnerVariant = 'plain' | 'sand'

const GLASS_PATH = 'M5,3 L19,3 C19,7 13,8 13,12 C13,16 19,17 19,21 L5,21 C5,17 11,16 11,12 C11,8 5,7 5,3 Z'

export interface SpinnerProps {
  /** Diameter of the spinner (any CSS size unit). @default 32 */
  size?: number | string
  /** Accessible label announced to screen readers while the spinner is visible. @default 'Loading…' */
  label?: string
  /** 'sand' shows a hollow glass with sand draining from the top bulb to the bottom as it spins. @default 'plain' */
  variant?: SpinnerVariant
  className?: string
  style?: CSSProperties
}

export function Spinner({ size = 32, label = 'Loading…', variant = 'plain', className, style }: SpinnerProps) {
  return (
    <div
      role="status"
      className={[styles.spinner, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...style }}
    >
      <svg
        viewBox="0 0 24 24"
        className={`${styles.hourglass} ${variant === 'sand' ? styles.spinSand : styles.spinPlain}`}
        aria-hidden="true"
      >
        {variant === 'sand' ? (
          <>
            <path className={styles.glassBackground} d={GLASS_PATH} />
            <path
              className={styles.sandTop}
              d="M12,11 C12,9 9.5,8.5 9.5,6.5 L14.5,6.5 C14.5,8.5 12,9 12,11 Z"
            />
            <path className={styles.sandBottom} d="M12,13 L7,20 L17,20 Z" />
            <path className={styles.glassOutline} d={GLASS_PATH} />
          </>
        ) : (
          <path className={styles.glassSolid} d={GLASS_PATH} />
        )}
      </svg>
      <span className={styles.srOnly}>{label}</span>
    </div>
  )
}
