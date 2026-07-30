import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './ToggleSwitch.module.css'

export type ToggleSwitchSize = 'sm' | 'md'

const THUMB_ICON_SIZE: Record<ToggleSwitchSize, number> = {
  sm: 10,
  md: 14,
}

export interface ToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered next to the switch. */
  label?: string
  /** Size of the switch. @default 'md' */
  size?: ToggleSwitchSize
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(
  ({ label, size = 'md', className, id, disabled, ...rest }, ref) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    return (
      <label
        htmlFor={inputId}
        className={[styles.wrapper, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
      >
        <input ref={ref} type="checkbox" role="switch" id={inputId} disabled={disabled} className={styles.input} {...rest} />
        <span className={[styles.track, styles[size]].filter(Boolean).join(' ')}>
          <span className={styles.thumb}>
            <Icon name="close" size={THUMB_ICON_SIZE[size]} className={`${styles.thumbIcon} ${styles.iconOff}`} />
            <Icon name="check" size={THUMB_ICON_SIZE[size]} className={`${styles.thumbIcon} ${styles.iconOn}`} />
          </span>
        </span>
        {label && <span className={styles.label}>{label}</span>}
      </label>
    )
  },
)

ToggleSwitch.displayName = 'ToggleSwitch'
