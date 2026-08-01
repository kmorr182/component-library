import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/icons'
import styles from './Alert.module.css'

export type AlertVariant = 'positive' | 'neutral' | 'negative'

const VARIANT_ICON: Record<AlertVariant, IconName> = {
  positive: 'check-circle',
  neutral: 'info',
  negative: 'alert-circle',
}

export interface AlertProps {
  /** Tone of the alert. @default 'neutral' */
  variant?: AlertVariant
  /** Optional bold heading shown above the message. */
  title?: string
  /** Alert message content. */
  children: ReactNode
  /** Renders a dismiss button that calls this when clicked. */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. @default 'Dismiss' */
  dismissLabel?: string
  className?: string
}

export function Alert({
  variant = 'neutral',
  title,
  children,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
}: AlertProps) {
  return (
    <div
      className={[styles.alert, styles[variant], className].filter(Boolean).join(' ')}
      role={variant === 'negative' ? 'alert' : 'status'}
    >
      <Icon name={VARIANT_ICON[variant]} size={20} className={styles.icon} />
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        <div className={styles.message}>{children}</div>
      </div>
      {onDismiss && (
        <button type="button" className={styles.dismiss} onClick={onDismiss} aria-label={dismissLabel}>
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  )
}
