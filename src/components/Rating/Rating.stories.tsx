import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Rating } from './Rating'

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInitialValue: Story = {
  args: { defaultValue: 3 },
}

export const Disabled: Story = {
  args: { defaultValue: 2, disabled: true },
}

export const ReadOnlyWholeNumber: Story = {
  args: { readOnly: true, value: 4 },
}

export const ReadOnlyFractional: Story = {
  args: { readOnly: true, value: 3.5 },
}

export const LargerStars: Story = {
  args: { size: 36 },
}

export const Controlled: Story = {
  render: () => {
    function ControlledExample() {
      const [value, setValue] = useState(2)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Rating value={value} onChange={setValue} />
          <span>Selected: {value}</span>
        </div>
      )
    }
    return <ControlledExample />
  },
}

export const QuarterStarPrecision: Story = {
  args: { defaultValue: 3.25, step: 0.25 },
}

export const ControlledDecimal: Story = {
  render: () => {
    function ControlledDecimalExample() {
      const [value, setValue] = useState(3.5)
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Rating value={value} onChange={setValue} step={0.25} />
          <span>Selected: {value}</span>
        </div>
      )
    }
    return <ControlledDecimalExample />
  },
}
