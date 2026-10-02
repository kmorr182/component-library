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

    motion: {
      description: 'Preview components as if the OS-level "reduce motion" setting were on',
      toolbar: {
        title: 'Motion',
        icon: 'accessibility',
        items: [
          { value: 'no-preference', icon: 'play', title: 'Motion: no preference' },
          { value: 'reduce', icon: 'stop', title: 'Motion: reduce' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      // Full-viewport height makes sense on a story's own Canvas tab (fills the themed
      // background edge-to-edge), but the same fixed height inside the embedded Docs page
      // just leaves a tall empty box around small components. Only force it in Canvas.
      const isDocs = context.viewMode === 'docs'

      return (
        <ThemeProvider theme={context.globals.theme as Theme} storageKey={false}>
          <div
            data-ruk-motion={context.globals.motion === 'reduce' ? 'reduce' : undefined}
            style={{
              minHeight: isDocs ? undefined : '100vh',
              padding: 16,
              background: 'var(--ruk-color-bg)',
              color: 'var(--ruk-color-text)',
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      )
    },
  ],
};

export default preview;
