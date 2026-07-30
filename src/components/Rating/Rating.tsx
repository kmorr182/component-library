import { Fragment, useId, useState } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Rating.module.css'

export interface RatingProps {
  /** Current rating (controlled). Use with `onChange`. */
  value?: number
  /** Initial rating for uncontrolled usage. @default 0 */
  defaultValue?: number
  /** Called with the new rating when the user picks a star. Not called in `readOnly` mode. */
  onChange?: (value: number) => void
  /** Number of stars. @default 5 */
  max?: number
  /** Size of each star icon in pixels. @default 24 */
  size?: number
  /** Renders a static (non-interactive) display and supports fractional values, e.g. 3.5. */
  readOnly?: boolean
  disabled?: boolean
  /** Accessible label for the rating group/image. @default 'Rating' */
  'aria-label'?: string
  className?: string
}

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  size = 24,
  readOnly = false,
  disabled = false,
  'aria-label': ariaLabel = 'Rating',
  className,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const name = useId()
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const stars = Array.from({ length: max }, (_, index) => index + 1)

  if (readOnly) {
    const percentage = (Math.max(0, Math.min(currentValue, max)) / max) * 100

    return (
      <span
        className={[styles.readOnlyGroup, className].filter(Boolean).join(' ')}
        role="img"
        aria-label={`${ariaLabel}: ${currentValue} out of ${max}`}
      >
        <span className={styles.readOnlyRow} aria-hidden="true">
          {stars.map((star) => (
            <Icon key={star} name="star" size={size} />
          ))}
        </span>
        <span className={styles.readOnlyFill} style={{ width: `${percentage}%` }} aria-hidden="true">
          {stars.map((star) => (
            <Icon key={star} name="star" size={size} />
          ))}
        </span>
      </span>
    )
  }

  const handleChange = (nextValue: number) => {
    if (!isControlled) {
      setInternalValue(nextValue)
    }
    onChange?.(nextValue)
  }

  return (
    <div
      className={[styles.group, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {[...stars].reverse().map((star) => {
        const inputId = `${name}-star-${star}`
        return (
          <Fragment key={star}>
            <input
              type="radio"
              id={inputId}
              name={name}
              className={styles.input}
              checked={currentValue === star}
              disabled={disabled}
              onChange={() => handleChange(star)}
            />
            <label htmlFor={inputId} className={styles.star} aria-label={`${star} star${star === 1 ? '' : 's'}`}>
              <Icon name="star" size={size} />
            </label>
          </Fragment>
        )
      })}
    </div>
  )
}
