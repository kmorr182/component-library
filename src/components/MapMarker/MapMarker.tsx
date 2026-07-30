import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import styles from './MapMarker.module.css'

export interface MapMarkerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Diameter of the marker (any CSS size unit). @default 40 */
  size?: number | string
  /** Accessible label for what this marker represents (e.g. a place name). The marker has no visible text of its own. */
  label: string
}

/**
 * A clickable map pin marker. Renders as a <button>, so it works as a Popover `trigger` out of the box:
 * `<Popover trigger={<MapMarker label="..." />}>...</Popover>`.
 *
 * The marker is positioned by its own box (default 40x40) — if you're placing it over map coordinates,
 * anchor by its bottom-center point (the pin's tip), e.g. `transform: translate(-50%, -100%)`.
 */
export const MapMarker = forwardRef<HTMLButtonElement, MapMarkerProps>(
  ({ size = 40, label, className, style, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={[styles.marker, className].filter(Boolean).join(' ')}
        style={{ width: size, height: size, ...style }}
        {...rest}
      >
        <svg viewBox="0 0 250 250" className={styles.icon} aria-hidden="true">
          <path d="M115.17,101.24H82.36c-5.53,0-10.02-4.49-10.02-10.02V58.4c0-5.53,4.49-10.02,10.02-10.02h32.81c5.53,0,10.02,4.49,10.02,10.02v32.81C125.19,96.75,120.7,101.24,115.17,101.24z" />
          <path d="M124.75,55.42H72.78c-4.16,0-7.52-3.37-7.52-7.52v-5.43c0-4.16,3.37-7.52,7.52-7.52h51.98c4.16,0,7.52,3.37,7.52,7.52v5.43C132.28,52.05,128.91,55.42,124.75,55.42z" />
          <path d="M184.78,102.71c0-5.18-105.01-4.47-105.01,0c0,20.51,13.03,38.13,31.65,45.8v11.12l-10.05,7.64c-3.18,2.42,0.8,15.16,7.16,15.16l23.74,32.47l23.74-32.47c6.37,0,10.34-12.74,7.16-15.16l-10.05-7.64v-11.12C171.75,140.84,184.78,123.23,184.78,102.71z" />
        </svg>
      </button>
    )
  },
)

MapMarker.displayName = 'MapMarker'
