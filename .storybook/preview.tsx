import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts.css'
import '../src/styles/tokens.css'
import { ThemeProvider } from '../src/theme/ThemeProvider'
import type { Theme } from '../src/theme/ThemeContext'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    options: {
      // Alphabetize sidebar groups (e.g. Components/Alert before Components/Button).
      // Stories within the same title keep their declared order (Default first, etc.)
      // since localeCompare returns 0 for equal titles and Array#sort is stable.
      storySort: (a, b) => a.title.localeCompare(b.title, undefined, { numeric: true }),
    },
  },

  // Pinned to 'light' rather than 'system' — without this, stories fell back to the
  // viewing device's OS-level prefers-color-scheme/prefers-contrast (see tokens.css),
  // so the same story could render completely differently on desktop vs. a phone with
  // Dark Mode on. The toolbar control below still lets you preview the other themes.
  initialGlobals: {
    theme: 'light',
  },

  globalTypes: {
    theme: {
      description: 'Theme applied to every story',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'high-contrast', icon: 'contrast', title: 'High contrast' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => (
      <ThemeProvider theme={context.globals.theme as Theme} storageKey={false}>
        <div
          style={{
            minHeight: '100vh',
            padding: 16,
            background: 'var(--ruk-color-bg)',
            color: 'var(--ruk-color-text)',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
