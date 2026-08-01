import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from './TextArea'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    label: 'Comment',
    placeholder: 'Share your experience...',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: 'Minimum 20 characters.' },
}

export const WithError: Story = {
  args: { errorText: 'Please share a bit more detail.', defaultValue: 'Too short.' },
}

export const Required: Story = {
  args: { required: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "This field can't be edited." },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <TextArea {...args} size="sm" label="Small" />
      <TextArea {...args} size="md" label="Medium" />
      <TextArea {...args} size="lg" label="Large" />
    </div>
  ),
}

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => (
    <div style={{ width: 400 }}>
      <TextArea {...args} />
    </div>
  ),
}
