import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/icons'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'

const ICON_SIZE: Record<InputSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const CONTAINER_SIZE_CLASS: Record<InputSize, string> = {
  sm: styles.containerSm,
  md: styles.containerMd,
  lg: styles.containerLg,
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label rendered above the field. */
  label?: string
  /** Helper text shown below the field when there is no error. */
  helperText?: string
  /** Error message shown below the field; also puts the input in an error state. */
  errorText?: string
  /** Size of the field. @default 'md' */
  size?: InputSize
  /** Stretches the field to fill its container's width. */
  fullWidth?: boolean
  /** Icon shown at the start of the field. Defaults to a search icon when `type="search"`. */
  icon?: IconName
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      fullWidth = false,
      icon,
      required,
      id,
      className,
      type = 'text',
      maxLength,
      value,
      defaultValue,
      onChange,
      readOnly,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    forwardedRef,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`
    const hasError = Boolean(errorText)

    const innerRef = useRef<HTMLInputElement>(null)
    const setRefs = (el: HTMLInputElement | null) => {
      innerRef.current = el
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef) forwardedRef.current = el
    }

    const [length, setLength] = useState(() => String(value ?? defaultValue ?? '').length)
    const [revealed, setRevealed] = useState(false)

    useEffect(() => {
      if (value !== undefined) setLength(String(value).length)
    }, [value])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setLength(event.target.value.length)
      onChange?.(event)
    }

    const handleClear = () => {
      const el = innerRef.current
      if (!el) return
      const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      nativeSetter?.call(el, '')
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.focus()
    }

    const isSearch = type === 'search'
    const isPassword = type === 'password'
    const leadingIcon = icon ?? (isSearch ? 'search' : undefined)
    const showClear = isSearch && length > 0 && !readOnly
    const showPasswordToggle = isPassword
    const hasTrailingAction = showClear || showPasswordToggle
    const effectiveType = isPassword ? (revealed ? 'text' : 'password') : type

    const describedBy =
      [ariaDescribedBy, hasError ? errorId : undefined, !hasError && helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const containerClassNames = [styles.inputContainer, CONTAINER_SIZE_CLASS[size]].filter(Boolean).join(' ')

    const inputClassNames = [
      styles.input,
      styles[size],
      hasError ? styles.error : '',
      leadingIcon ? styles.hasLeadingIcon : '',
      hasTrailingAction ? styles.hasTrailingAction : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
        {label && (
          <label className={styles.label} htmlFor={inputId}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <div className={containerClassNames}>
          {leadingIcon && <Icon name={leadingIcon} size={ICON_SIZE[size]} className={styles.leadingIcon} />}
          <input
            ref={setRefs}
            id={inputId}
            type={effectiveType}
            className={inputClassNames}
            required={required}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            {...rest}
          />
          {showClear && (
            <button type="button" className={styles.trailingAction} onClick={handleClear} aria-label="Clear">
              <Icon name="close" size={ICON_SIZE[size]} />
            </button>
          )}
          {showPasswordToggle && (
            <button
              type="button"
              className={styles.trailingAction}
              onClick={() => setRevealed((prev) => !prev)}
              aria-label={revealed ? 'Hide password' : 'Show password'}
              aria-pressed={revealed}
            >
              <Icon name={revealed ? 'eye-off' : 'eye'} size={ICON_SIZE[size]} />
            </button>
          )}
        </div>
        {hasError ? (
          <span id={errorId} className={styles.errorText} role="alert">
            {errorText}
          </span>
        ) : (
          helperText && (
            <span id={helperId} className={styles.helperText}>
              {helperText}
            </span>
          )
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
