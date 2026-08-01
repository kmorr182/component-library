import { forwardRef, useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import styles from './TextArea.module.css'

export type TextAreaSize = 'sm' | 'md' | 'lg'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visible label rendered above the field. */
  label?: string
  /** Helper text shown below the field when there is no error. */
  helperText?: string
  /** Error message shown below the field; also puts the field in an error state. */
  errorText?: string
  /** Size of the field. @default 'md' */
  size?: TextAreaSize
  /** Stretches the field to fill its container's width. */
  fullWidth?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
    const textareaId = id ?? generatedId
    const helperId = `${textareaId}-helper`
    const errorId = `${textareaId}-error`
    const hasError = Boolean(errorText)

    const describedBy =
      [ariaDescribedBy, hasError ? errorId : undefined, !hasError && helperText ? helperId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const textareaClassNames = [styles.textarea, styles[size], hasError ? styles.error : '', className]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
        {label && (
          <label className={styles.label} htmlFor={textareaId}>
            {label}
            {required && <span className={styles.requiredMark}>*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={textareaClassNames}
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

TextArea.displayName = 'TextArea'
