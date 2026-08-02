import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover } from './Popover'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    trigger: <Button>Open popover</Button>,
    children: <div>This is some popover content.</div>,
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** No `placement` prop to set - the popover measures the room on each side of the trigger
 * against the viewport and opens toward whichever side has the most space. */
export const AutoPlacement: Story = {
  name: 'Automatic placement',
  render: () => (
    <>
      <div style={{ position: 'fixed', top: 8, left: 8 }}>
        <Popover trigger={<Button size="sm">top-left</Button>}>
          <p style={{ margin: 0 }}>No room above or to the left, so this opens down and right.</p>
        </Popover>
      </div>
      <div style={{ position: 'fixed', top: 8, right: 8 }}>
        <Popover trigger={<Button size="sm">top-right</Button>}>
          <p style={{ margin: 0 }}>No room above or to the right, so this opens down and left.</p>
        </Popover>
      </div>
      <div style={{ position: 'fixed', bottom: 8, left: 8 }}>
        <Popover trigger={<Button size="sm">bottom-left</Button>}>
          <p style={{ margin: 0 }}>No room below or to the left, so this opens up and right.</p>
        </Popover>
      </div>
      <div style={{ position: 'fixed', bottom: 8, right: 8 }}>
        <Popover trigger={<Button size="sm">bottom-right</Button>}>
          <p style={{ margin: 0 }}>No room below or to the right, so this opens up and left.</p>
        </Popover>
      </div>
    </>
  ),
}

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [open, setOpen] = useState(false)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <Popover trigger={<Button>{open ? 'Close' : 'Open'} popover</Button>} open={open} onOpenChange={setOpen}>
            <p style={{ margin: 0 }}>Controlled from outside.</p>
          </Popover>
          <span style={{ fontSize: 13, color: 'var(--ruk-color-text-muted)' }}>open: {String(open)}</span>
        </div>
      )
    }
    return <ControlledExample />
  },
}
