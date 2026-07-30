import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import { iconPaths } from './icons'
import type { IconName } from './icons'

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: {
    size: 24,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Star: Story = {
  args: { name: 'star' },
}

export const AllIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {(Object.keys(iconPaths) as IconName[]).map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <Icon {...args} name={name} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const CustomColor: Story = {
  args: { name: 'info', style: { color: '#2563eb' } },
}
