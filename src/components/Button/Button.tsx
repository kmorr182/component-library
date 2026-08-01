import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default 'primary' */
  variant?: ButtonVariant
  /** Size of the button. @default 'md' */
  size?: ButtonSize
  /** Stretches the button to fill its container's width. */
  fullWidth?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className, type = 'button', ...rest }, ref) => {
    const classNames = [styles.button, styles[variant], styles[size], fullWidth ? styles.fullWidth : '', className]
      .filter(Boolean)
      .join(' ')

    return <button ref={ref} type={type} className={classNames} {...rest} />
  },
)

Button.displayName = 'Button'
