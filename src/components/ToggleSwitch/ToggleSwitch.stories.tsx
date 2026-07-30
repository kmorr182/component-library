import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ToggleSwitch } from './ToggleSwitch'

const meta = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  tags: ['autodocs'],
  args: {
    label: 'Enable notifications',
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof ToggleSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const NoLabel: Story = {
  args: { label: undefined, 'aria-label': 'Enable notifications' },
}

export const Small: Story = {
  args: { size: 'sm' },
}
