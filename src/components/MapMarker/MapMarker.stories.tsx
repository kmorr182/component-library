import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { MapMarker } from './MapMarker'
import { Popover } from '../Popover/Popover'

const meta = {
  title: 'Components/MapMarker',
  component: MapMarker,
  args: {
    label: 'Downtown Location',
    onClick: fn(),
  },
} satisfies Meta<typeof MapMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
      <MapMarker {...args} size={24} />
      <MapMarker {...args} size={32} />
      <MapMarker {...args} size={40} />
      <MapMarker {...args} size={56} />
    </div>
  ),
}

export const Active: Story = {
  args: { active: true },
}

export const Selected: Story = {
  args: { selected: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Cluster: Story = {
  args: { count: 12, label: '12 locations' },
}

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <MapMarker {...args} />
      <MapMarker {...args} active />
      <MapMarker {...args} selected />
      <MapMarker {...args} disabled />
      <MapMarker {...args} count={12} label="12 locations" />
    </div>
  ),
}

export const OnAMap: Story = {
  name: 'On a map (visual context)',
  render: (args) => (
    <div
      style={{
        position: 'relative',
        width: 320,
        height: 220,
        borderRadius: 8,
        background: 'var(--ruk-color-surface)',
        border: '1px solid var(--ruk-color-border)',
      }}
    >
      <div style={{ position: 'absolute', left: '45%', top: '55%', transform: 'translate(-50%, -100%)' }}>
        <MapMarker {...args} />
      </div>
    </div>
  ),
}

/** The primary use case: clicking the marker opens a Popover with details about the place. */
export const WithPopover: Story = {
  name: 'With a Popover',
  render: () => (
    <Popover trigger={<MapMarker label="Downtown Location" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <strong>Downtown Location</strong>
        <span style={{ color: 'var(--ruk-color-text-muted)' }}>Open now · 24 hr</span>
      </div>
    </Popover>
  ),
}
