import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './ThemeContext'
import type { Theme } from './ThemeContext'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { ToggleSwitch } from '../components/ToggleSwitch/ToggleSwitch'
import { Rating } from '../components/Rating/Rating'

const meta = {
  title: 'Theme/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeProvider>

export default meta
type Story = StoryObj<typeof meta>

const THEME_OPTIONS: Theme[] = ['system', 'light', 'dark', 'high-contrast']

function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      {THEME_OPTIONS.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={theme === option ? 'primary' : 'outline'}
          onClick={() => setTheme(option)}
        >
          {option}
        </Button>
      ))}
      <span style={{ fontSize: 13, color: 'var(--ruk-color-text-muted)' }}>resolved: {resolvedTheme}</span>
    </div>
  )
}

function Showcase() {
  return (
    <div
      style={{
        width: 320,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        borderRadius: 8,
        border: '1px solid var(--ruk-color-border)',
        background: 'var(--ruk-color-bg)',
        color: 'var(--ruk-color-text)',
      }}
    >
      <ThemeSwitcher />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outine</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <Input label="Email" placeholder="you@example.com" />
      <ToggleSwitch label="Enable notifications" defaultChecked />
      <Rating defaultValue={4} />
    </div>
  )
}

/** Toggle between themes live; the whole subtree re-themes instantly. Persistence is
 * disabled here (`storageKey={false}`) so the story always starts from `defaultTheme`. */
export const Interactive: Story = {
  render: () => (
    <ThemeProvider defaultTheme="system" storageKey={false}>
      <Showcase />
    </ThemeProvider>
  ),
}

export const Light: Story = {
  render: () => (
    <ThemeProvider defaultTheme="light" storageKey={false}>
      <Showcase />
    </ThemeProvider>
  ),
}

export const Dark: Story = {
  render: () => (
    <ThemeProvider defaultTheme="dark" storageKey={false}>
      <Showcase />
    </ThemeProvider>
  ),
}

export const HighContrast: Story = {
  render: () => (
    <ThemeProvider defaultTheme="high-contrast" storageKey={false}>
      <Showcase />
    </ThemeProvider>
  ),
}
