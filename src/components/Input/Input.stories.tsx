import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHelperText: Story = {
  args: { helperText: "We'll never share your email." },
}

export const WithError: Story = {
  args: { errorText: 'Please enter a valid email address.', defaultValue: 'not-an-email' },
}

export const Required: Story = {
  args: { required: true },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'disabled@example.com' },
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
  ),
}

export const Search: Story = {
  args: { type: 'search', label: 'Search', placeholder: 'Search products...', defaultValue: 'sneakers' },
}

export const Password: Story = {
  args: { type: 'password', label: 'Password', defaultValue: 'hunter2' },
}

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'you@example.com' },
}

export const WithIcon: Story = {
  args: { icon: 'info', label: 'Reference number' },
}
