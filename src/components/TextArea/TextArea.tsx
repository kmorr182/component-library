import { forwardRef, useEffect, useId, useState } from 'react'
import type { ChangeEvent, TextareaHTMLAttributes } from 'react'
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
  /** Shows a live "n / max" character counter below the field. Requires `maxLength`. */
  showCharacterCount?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      errorText,
      size = 'md',
      fullWidth = false,
      showCharacterCount = false,
      required,
      id,
      className,
      maxLength,
      value,
      defaultValue,
      onChange,
      'aria-describedby': ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const helperId = `${textareaId}-helper`
    const errorId = `${textareaId}-error`
    const countId = `${textareaId}-count`
    const hasError = Boolean(errorText)

    const [length, setLength] = useState(() => String(value ?? defaultValue ?? '').length)

    useEffect(() => {
      if (value !== undefined) setLength(String(value).length)
    }, [value])

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setLength(event.target.value.length)
      onChange?.(event)
    }

    const showCount = showCharacterCount && maxLength !== undefined

    const describedBy =
      [
        ariaDescribedBy,
        hasError ? errorId : undefined,
        !hasError && helperText ? helperId : undefined,
        showCount ? countId : undefined,
      ]
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
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {(hasError || helperText || showCount) && (
          <div className={styles.footer}>
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
            {showCount && (
              <span
                id={countId}
                className={[styles.characterCount, length >= maxLength ? styles.characterCountLimit : '']
                  .filter(Boolean)
                  .join(' ')}
                aria-live="polite"
              >
                {length} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
