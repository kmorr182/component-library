import type { Preview } from '@storybook/react-vite'
import '../src/styles/fonts.css'
import '../src/styles/tokens.css'

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
};

export default preview;