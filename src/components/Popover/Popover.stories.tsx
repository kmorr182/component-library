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
    children: <p style={{ margin: 0 }}>This is some popover content.</p>,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 64, padding: 48 }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Popover key={placement} trigger={<Button variant="secondary">{placement}</Button>} placement={placement}>
          <p style={{ margin: 0 }}>Placed to the {placement}.</p>
        </Popover>
      ))}
    </div>
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
