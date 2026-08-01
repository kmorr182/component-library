import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert } from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    children: 'Your changes have been saved.',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['positive', 'neutral', 'negative'],
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Positive: Story = {
  args: { variant: 'positive', title: 'Success', children: 'Your rating was posted.' },
}

export const Neutral: Story = {
  args: { variant: 'neutral', title: 'Heads up', children: "We'll notify you when a reply is posted." },
}

export const Negative: Story = {
  args: { variant: 'negative', title: 'Something went wrong', children: 'There was an error on our end. Please retry.' },
}

export const WithoutTitle: Story = {
  args: { variant: 'neutral', children: 'Location saved to your favorites.' },
}

export const Dismissible: Story = {
  render: (args) => {
    function DismissibleExample() {
      const [visible, setVisible] = useState(true)
      if (!visible) return <button onClick={() => setVisible(true)}>Show alert</button>
      return <Alert {...args} onDismiss={() => setVisible(false)} />
    }
    return <DismissibleExample />
  },
  args: { variant: 'positive', title: 'Success', children: 'Your rating was posted.' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Alert variant="positive" title="Success">Your rating was posted.</Alert>
      <Alert variant="neutral" title="Heads up">We&apos;ll notify you when a reply is posted.</Alert>
      <Alert variant="negative" title="Something went wrong">Select a star rating before posting.</Alert>
    </div>
  ),
}
