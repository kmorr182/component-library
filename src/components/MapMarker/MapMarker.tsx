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
          <path
            className={styles.dark}
            d="M180.18,155.82c-9.46,5.86-19.21,11.53-30.3,14.62v-0.02c-10.36,0.46-15.37-3.24-15.37-15.98c0-7.94,3.15-21.51,15.37-26.79v-0.06C170.65,118.3,185.1,97.81,185.1,74c0-32.53-26.95-58.91-60.2-58.91c-33.25,0-60.2,26.37-60.2,58.91c0,23.81,14.45,44.31,35.23,53.59v0.04c12.25,5.27,15.4,18.86,15.4,26.81c0,12.75-5.02,16.45-15.4,15.98c0,0,0,0.01,0,0.02c-10.93-3.04-20.38-8.87-29.89-14.32c-18.92-10.85-20.77,9.23-11.49,15.88c10.94,7.83,23.15,13.73,36.04,17.32l30.31,45.6l30.31-45.6c12.99-3.61,25.29-9.57,36.29-17.49C200.69,165.2,198.89,144.24,180.18,155.82z"
          />
          <circle className={styles.light} cx="124.9" cy="74.21" r="41.57" />
          <path
            className={styles.light}
            d="M130.27,183.63c-2.47-2.1-4.24-6.65-5.25-9.29c-1.02,2.64-2.79,7.2-5.25,9.29c-4.44,3.78-7.98,5.11-12.47,3.92l-0.34,0.31l17.95,26.67l17.95-26.67l-0.3-0.27C138.1,188.7,134.65,187.36,130.27,183.63z"
          />
        </svg>
      </button>
    )
  },
)

MapMarker.displayName = 'MapMarker'
