import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'component-library',
  brandUrl: 'https://github.com/kmorr182/component-library',
  brandImage: 'component-library-storybook.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
});
