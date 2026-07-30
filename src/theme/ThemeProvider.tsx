import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import type { Theme, ThemeContextValue, ThemeName } from './ThemeContext'

export interface ThemeProviderProps {
  /** Current theme (controlled). Use with `onThemeChange`. */
  theme?: Theme
  /** Initial theme for uncontrolled usage. @default 'system' */
  defaultTheme?: Theme
  /** Called whenever the theme changes, e.g. via `setTheme` from `useTheme()`. */
  onThemeChange?: (theme: Theme) => void
  /** localStorage key used to persist the theme choice across reloads. Pass `false` to disable persistence. @default 'ruk-theme' */
  storageKey?: string | false
  children?: ReactNode
}

const THEME_NAMES: Theme[] = ['light', 'dark', 'high-contrast', 'system']

function isTheme(value: string | null): value is Theme {
  return value !== null && (THEME_NAMES as string[]).includes(value)
}

function readStoredTheme(storageKey: string | false): Theme | undefined {
  if (storageKey === false || typeof window === 'undefined') return undefined
  try {
    const stored = window.localStorage.getItem(storageKey)
    return isTheme(stored) ? stored : undefined
  } catch {
    return undefined
  }
}

function useSystemColorScheme(): 'light' | 'dark' {
  const [scheme, setScheme] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const listener = () => setScheme(mql.matches ? 'dark' : 'light')
    listener()
    mql.addEventListener('change', listener)
    return () => mql.removeEventListener('change', listener)
  }, [])

  return scheme
}

/**
 * Applies one of the library's themes ('light', 'dark', 'high-contrast', or the OS-driven
 * 'system') to everything rendered inside it, via a `data-ruk-theme` attribute (see
 * src/styles/tokens.css). Nest providers to theme a subtree differently from the rest of the app.
 */
export function ThemeProvider({
  theme,
  defaultTheme = 'system',
  onThemeChange,
  storageKey = 'ruk-theme',
  children,
}: ThemeProviderProps) {
  const isControlled = theme !== undefined
  const [internalTheme, setInternalTheme] = useState<Theme>(() => readStoredTheme(storageKey) ?? defaultTheme)
  const currentTheme = isControlled ? theme : internalTheme
  const systemScheme = useSystemColorScheme()
  const resolvedTheme: ThemeName = currentTheme === 'system' ? systemScheme : currentTheme

  const setTheme = useCallback(
    (next: Theme) => {
      if (!isControlled) {
        setInternalTheme(next)
        if (storageKey !== false && typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(storageKey, next)
          } catch {
            // localStorage unavailable (e.g. privacy mode) - the choice just won't persist.
          }
        }
      }
      onThemeChange?.(next)
    },
    [isControlled, storageKey, onThemeChange],
  )

  const contextValue = useMemo<ThemeContextValue>(
    () => ({ theme: currentTheme, resolvedTheme, setTheme }),
    [currentTheme, resolvedTheme, setTheme],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {/* display: contents keeps this element out of layout - CSS variables still inherit down to children. */}
      <div data-ruk-theme={resolvedTheme} style={{ display: 'contents' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
