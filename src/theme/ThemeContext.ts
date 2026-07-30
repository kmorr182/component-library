import { createContext, useContext } from 'react'

/** A concrete, renderable theme. */
export type ThemeName = 'light' | 'dark' | 'high-contrast'
/** A theme choice, including 'system' which resolves to the OS's light/dark preference. */
export type Theme = ThemeName | 'system'

export interface ThemeContextValue {
  /** The theme as set; may be 'system'. */
  theme: Theme
  /** 'system' resolved to the OS's current light/dark preference; otherwise same as `theme`. */
  resolvedTheme: ThemeName
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Reads the current theme and a `setTheme` function from the nearest `<ThemeProvider>`. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>')
  }
  return ctx
}
