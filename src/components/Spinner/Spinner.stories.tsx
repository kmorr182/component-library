import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './Spinner'
import { Button } from '../Button/Button'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['plain', 'sand'],
    },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sand: Story = {
  args: { variant: 'sand' },
}

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Spinner variant="plain" size={48} />
      <Spinner variant="sand" size={48} />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
      <Spinner size={64} />
    </div>
  ),
}

export const CustomColor: Story = {
  args: { style: { color: 'var(--ruk-color-star-active)' } },
}

export const InsideAButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner size={16} style={{ color: 'currentcolor' }} label="Saving" />
      Saving…
    </Button>
  ),
}
