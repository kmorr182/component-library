import { forwardRef, useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export type InputSize = 'sm' | 'md' | 'lg'

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
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      fullWidth = false,
      required,
      id,
      className,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`
    const hasError = Boolean(errorText)

    const describedBy =
      [ariaDescribedBy, hasError ? errorId : undefined, !hasError && helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const inputClassNames = [styles.input, styles[size], hasError ? styles.error : '', className]
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
        <input
          ref={ref}
          id={inputId}
          className={inputClassNames}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
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
