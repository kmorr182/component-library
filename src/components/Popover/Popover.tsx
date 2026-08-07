import { cloneElement, useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { MouseEvent as ReactMouseEvent, ReactElement, ReactNode } from 'react'
import styles from './Popover.module.css'

type Placement = 'top' | 'bottom' | 'left' | 'right'

/** Gap between the trigger and the popover, and the minimum margin kept from the viewport edge, in pixels. */
const GAP = 8

export interface PopoverProps {
  /** The element that opens the popover when clicked. Must forward its ref to a focusable element. */
  trigger: ReactElement
  /** Content shown inside the popover while open. */
  children: ReactNode
  /** Current open state (controlled). Use with `onOpenChange`. */
  open?: boolean
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean
  /** Called when the trigger is clicked, or the popover is dismissed via outside click / Escape. */
  onOpenChange?: (open: boolean) => void
  className?: string
  /** This is a fix for using Popover within a Google map, since the default document.body
   * default makes the popover pop up behind the map view.
   *  
   * Portals the popover content here instead of `document.body`, and keeps it within this
   * element's bounds instead of the viewport's — e.g. to nest it inside a themed subtree, or any
   * other container its CSS custom properties (or clipping) shouldn't escape. Must itself be (or
   * have an ancestor that's) `position: relative/absolute/fixed/sticky`, since that's what the
   * content's `position: absolute` resolves against. @default document.body
   */
  container?: Element
}

interface Position {
  top: number
  left: number
}

/** Picks whichever side of the trigger has the most room within `boundsRect`, then positions the
 * popover there, clamped so it never runs past `boundsRect`'s edges. `relativeToBounds` controls
 * whether the result is expressed relative to `boundsRect`'s own top-left (for a custom
 * `container`, which is itself the positioning context) or as page coordinates (for the default
 * `document.body` portal, where position: absolute resolves against the whole scrollable page). */
function computePosition(triggerRect: DOMRect, contentRect: DOMRect, boundsRect: DOMRect, relativeToBounds: boolean): Position {
  const space: Record<Placement, number> = {
    top: triggerRect.top - boundsRect.top,
    bottom: boundsRect.bottom - triggerRect.bottom,
    left: triggerRect.left - boundsRect.left,
    right: boundsRect.right - triggerRect.right,
  }

  const placement = (Object.keys(space) as Placement[]).reduce((best, candidate) =>
    space[candidate] > space[best] ? candidate : best,
  )

  let top: number
  let left: number

  if (placement === 'top' || placement === 'bottom') {
    top = placement === 'top' ? triggerRect.top - contentRect.height - GAP : triggerRect.bottom + GAP
    left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2
  } else {
    left = placement === 'left' ? triggerRect.left - contentRect.width - GAP : triggerRect.right + GAP
    top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2
  }

  left = Math.max(boundsRect.left + GAP, Math.min(left, boundsRect.right - contentRect.width - GAP))
  top = Math.max(boundsRect.top + GAP, Math.min(top, boundsRect.bottom - contentRect.height - GAP))

  if (relativeToBounds) {
    return { top: top - boundsRect.top, left: left - boundsRect.left }
  }
  return { top: top + window.scrollY, left: left + window.scrollX }
}

export function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, className, container }: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen

  const contentId = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [position, setPosition] = useState<Position | null>(null)
  // Portals need `document`, which doesn't exist during SSR - only render one after mounting client-side.
  const [mounted, setMounted] = useState(false)

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  useEffect(() => setMounted(true), [])

  // Runs synchronously after the (invisible) content is laid out, so the position is correct
  // before the browser paints - no visible jump from a wrong initial spot.
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || !contentRef.current) {
      setPosition(null)
      return
    }
    const boundsRect = container
      ? container.getBoundingClientRect()
      : new DOMRect(0, 0, window.innerWidth, window.innerHeight)
    setPosition(
      computePosition(
        triggerRef.current.getBoundingClientRect(),
        contentRef.current.getBoundingClientRect(),
        boundsRect,
        Boolean(container),
      ),
    )
  }, [isOpen, container])

  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node
      const insideTrigger = wrapperRef.current?.contains(target)
      const insideContent = contentRef.current?.contains(target)
      if (!insideTrigger && !insideContent) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, setOpen])

  // cloneElement's typings can't express "inject a ref onto whatever element type
  // `trigger` turns out to be", so the extra-props object needs an escape hatch here.
  const clonedTrigger = cloneElement(trigger, {
    ref: triggerRef,
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? contentId : undefined,
    onClick: (event: ReactMouseEvent) => {
      ;(trigger.props as { onClick?: (event: ReactMouseEvent) => void }).onClick?.(event)
      setOpen(!isOpen)
    },
  } as object)

  return (
    <div ref={wrapperRef} className={[styles.root, className].filter(Boolean).join(' ')}>
      {clonedTrigger}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            ref={contentRef}
            id={contentId}
            role="dialog"
            aria-modal="false"
            className={styles.content}
            // Positioned once measured; kept invisible (but still laid out, so it can be measured) until then.
            style={position ? { top: position.top, left: position.left } : { top: 0, left: 0, visibility: 'hidden' }}
          >
            {children}
          </div>,
          container ?? document.body,
        )}
    </div>
  )
}
