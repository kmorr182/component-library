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
}

interface Position {
  top: number
  left: number
}

/** Picks whichever side of the trigger has the most room in the viewport, then positions the
 * popover there (in page coordinates), clamped so it never runs off the viewport edges. */
function computePosition(triggerRect: DOMRect, contentRect: DOMRect): Position {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const space: Record<Placement, number> = {
    top: triggerRect.top,
    bottom: viewportHeight - triggerRect.bottom,
    left: triggerRect.left,
    right: viewportWidth - triggerRect.right,
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

  left = Math.max(GAP, Math.min(left, viewportWidth - contentRect.width - GAP))
  top = Math.max(GAP, Math.min(top, viewportHeight - contentRect.height - GAP))

  return { top: top + window.scrollY, left: left + window.scrollX }
}

export function Popover({ trigger, children, open, defaultOpen = false, onOpenChange, className }: PopoverProps) {
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
    setPosition(computePosition(triggerRef.current.getBoundingClientRect(), contentRef.current.getBoundingClientRect()))
  }, [isOpen])

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
          document.body,
        )}
    </div>
  )
}
