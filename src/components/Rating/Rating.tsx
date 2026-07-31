import type { KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent } from 'react'
import { useRef, useState } from 'react'
import { Icon } from '../Icon/Icon'
import styles from './Rating.module.css'

export interface RatingProps {
  /** Current rating (controlled). Use with `onChange`. */
  value?: number
  /** Initial rating for uncontrolled usage. @default 0 */
  defaultValue?: number
  /** Called with the new rating when the user picks a value. Not called in `readOnly` mode. */
  onChange?: (value: number) => void
  /** Number of stars. @default 5 */
  max?: number
  /** Smallest increment a rating can be adjusted by, e.g. `0.25` for quarter-star precision. @default 1 */
  step?: number
  /** Size of each star icon in pixels. @default 24 */
  size?: number
  /** Renders a static (non-interactive) display and supports fractional values, e.g. 3.5. */
  readOnly?: boolean
  disabled?: boolean
  /** Accessible label for the rating group/image. @default 'Rating' */
  'aria-label'?: string
  className?: string
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function roundToStep(value: number, step: number) {
  return Math.round(value / step) * step
}

export function Rating({
  value,
  defaultValue = 0,
  onChange,
  max = 5,
  step = 1,
  size = 24,
  readOnly = false,
  disabled = false,
  'aria-label': ariaLabel = 'Rating',
  className,
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const stars = Array.from({ length: max }, (_, index) => index + 1)

  if (readOnly) {
    const percentage = (clamp(currentValue, 0, max) / max) * 100

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

  const commit = (nextValue: number) => {
    const clamped = clamp(roundToStep(nextValue, step), 0, max)
    if (!isControlled) {
      setInternalValue(clamped)
    }
    onChange?.(clamped)
  }

  const valueFromPointerX = (clientX: number) => {
    const el = groupRef.current
    if (!el || el.clientWidth === 0) return currentValue
    const rect = el.getBoundingClientRect()
    const fraction = clamp((clientX - rect.left) / rect.width, 0, 1)
    return fraction * max
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) return
    setHoverValue(roundToStep(valueFromPointerX(event.clientX), step))
  }

  const handleMouseLeave = () => {
    setHoverValue(null)
  }

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) return
    commit(valueFromPointerX(event.clientX))
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (disabled) return
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        commit(currentValue + step)
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        commit(currentValue - step)
        break
      case 'Home':
        event.preventDefault()
        commit(0)
        break
      case 'End':
        event.preventDefault()
        commit(max)
        break
    }
  }

  const displayValue = hoverValue ?? currentValue
  const percentage = (clamp(displayValue, 0, max) / max) * 100

  return (
    <div
      ref={groupRef}
      className={[styles.group, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-valuetext={`${currentValue} out of ${max}`}
      aria-disabled={disabled || undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.row} aria-hidden="true">
        {stars.map((star) => (
          <Icon key={star} name="star" size={size} />
        ))}
      </span>
      <span className={styles.fill} style={{ width: `${percentage}%` }} aria-hidden="true">
        {stars.map((star) => (
          <Icon key={star} name="star" size={size} />
        ))}
      </span>
    </div>
  )
}
