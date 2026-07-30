import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { variant: 'text' },
  render: (args) => (
    <div style={{ width: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton {...args} />
      <Skeleton {...args} width="90%" />
      <Skeleton {...args} width="60%" />
    </div>
  ),
}

export const Circular: Story = {
  args: { variant: 'circular', width: 48, height: 48 },
}

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: 240, height: 140 },
}

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton variant="rectangular" width="100%" height={140} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton variant="circular" width={36} height={36} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
    </div>
  ),
}
