import type { Meta, StoryObj } from '@storybook/react-vite'

const SCALE = [
  { token: '--ruk-font-size-xs', label: '0.75rem / 12px' },
  { token: '--ruk-font-size-sm', label: '0.8125rem / 13px' },
  { token: '--ruk-font-size-md', label: '0.9375rem / 15px — body default' },
  { token: '--ruk-font-size-lg', label: '1.0625rem / 17px' },
  { token: '--ruk-font-size-xl', label: '1.25rem / 20px' },
  { token: '--ruk-font-size-2xl', label: '1.5rem / 24px' },
  { token: '--ruk-font-size-3xl', label: '1.875rem / 30px' },
  { token: '--ruk-font-size-4xl', label: '2.25rem / 36px' },
  { token: '--ruk-font-size-5xl', label: '3rem / 48px' },
]

const meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'var(--ruk-font-family)' }}>
      {SCALE.map(({ token, label }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <code style={{ width: 200, flexShrink: 0, fontSize: 12, color: 'var(--ruk-color-text-muted)' }}>{token}</code>
          <span style={{ fontSize: `var(${token})`, lineHeight: 'var(--ruk-line-height-snug)' }}>
            The quick brown fox jumps over the lazy dog. over the lazy dog.
          </span>
          <span style={{ fontSize: 12, color: 'var(--ruk-color-text-muted)', whiteSpace: 'nowrap' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
}

export const Weights: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        fontFamily: 'var(--ruk-font-family)',
        fontSize: 'var(--ruk-font-size-xl)',
      }}
    >
      <span style={{ fontWeight: 'var(--ruk-font-weight-extralight)' }}>Extralight 200 — The quick brown fox jumps over the lazy dog.</span>
      <span style={{ fontWeight: 'var(--ruk-font-weight-regular)' }}>Regular 400 — The quick brown fox jumps over the lazy dog.</span>
      <span style={{ fontWeight: 'var(--ruk-font-weight-semibold)' }}>Semibold 600 — The quick brown fox jumps over the lazy dog.</span>
    </div>
  ),
}

export const WhyThisFont: Story = {
  name: 'Why this font',
  render: () => (
    <div
      style={{
        maxWidth: 520,
        fontFamily: 'var(--ruk-font-family)',
        fontSize: 'var(--ruk-font-size-lg)',
        lineHeight: 'var(--ruk-line-height-relaxed)',
        color: 'var(--ruk-color-text)',
      }}
    >
      <p>
       <strong>Atkinson Hyperlegible Next</strong> was chosen as the primary typeface for its outstanding readability and approachable personality. 
       Originally designed by the Braille Institute with legibility as its primary goal, it helps reinforce the brand's commitment to being clean, trustworthy, accessible, and easy to use. 
       Its rounded letterforms create a friendly, welcoming feel while maintaining a modern, polished appearance, resulting in a visual voice that feels clear, reliable, and inviting across both digital and print experiences. 
       As an added benefit, the font is open source under the SIL Open Font License and is self-hosted, eliminating the need for external font requests.

      </p>
    </div>
  ),
}
