# react-ui-kit

A small React component library: **Button**, **Input**, **Icon**, **ToggleSwitch**, **Rating**, **Spinner**, **Skeleton**, **Popover**, and **MapMarker**.

- TypeScript, with generated `.d.ts` types
- Styled with CSS Modules, themeable via CSS custom properties
- Built-in `light` / `dark` / `high-contrast` themes via `<ThemeProvider>` (see [Theming](#theming))
- Self-hosted variable typeface + type scale (see [Typography](#typography))
- Built with Vite in library mode (ESM + CJS)
- Developed and documented with Storybook

## Development

```bash
npm install
npm run storybook   # interactive dev/preview environment at http://localhost:6006
npm run build        # builds the library to dist/
npm run lint
```

## Using the library in another project

After building (or publishing) the package:

```bash
npm install react-ui-kit
```

```tsx
import { Button, Input, Icon, ToggleSwitch, Rating, Spinner, Skeleton, Popover, MapMarker } from 'react-ui-kit'
import 'react-ui-kit/styles.css'
```

The stylesheet import is required once, anywhere in your app's entry point — it defines the
component styles and the default design tokens (CSS custom properties prefixed `--ruk-*`,
see [src/styles/tokens.css](src/styles/tokens.css)). Override any token in your own CSS to
theme the components, e.g.:

```css
:root {
  --ruk-color-primary: #7c3aed;
}
```

## Theming

The library ships three built-in themes — `light`, `dark`, and `high-contrast` — plus a
`system` option that follows the OS's light/dark preference. Wrap any part of your app in
`<ThemeProvider>` to apply one:

```tsx
import { ThemeProvider, useTheme } from 'react-ui-kit'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <YourApp />
    </ThemeProvider>
  )
}

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  // theme: what's set ('system' | 'light' | 'dark' | 'high-contrast')
  // resolvedTheme: 'system' resolved to the OS's actual light/dark preference
  return <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>Toggle</button>
}
```

- **Controlled or uncontrolled** — pass `theme` + `onThemeChange` to own the state yourself, or
  let `ThemeProvider` manage it internally starting from `defaultTheme` (default: `'system'`).
- **Persisted** — the choice is saved to `localStorage` (key `'ruk-theme'` by default; pass a
  different `storageKey`, or `storageKey={false}` to disable persistence).
- **Composable** — `ThemeProvider` renders no visible box (`display: contents`), so nesting one
  inside another themes just that subtree differently from the rest of the app.
- **Framework-agnostic escape hatch** — under the hood a theme is just a `data-ruk-theme="..."`
  attribute; you can set it yourself on any element without React if you prefer.

No `<ThemeProvider>` at all? Components still work, defaulting to the `light` palette, or `dark`
automatically via `prefers-color-scheme` if no explicit theme is set anywhere in the tree.

## Typography

Components use **[Atkinson Hyperlegible Next](https://github.com/googlefonts/atkinson-hyperlegible-next)**,
designed by the Braille Institute with legibility as the explicit goal. It's free (SIL Open Font
License — see [src/styles/fonts/OFL.txt](src/styles/fonts/OFL.txt)) and self-hosted as
base64-embedded `woff2` in the shipped stylesheet, so using this library adds no external
font-CDN request.

The `--ruk-font-family` token controls it everywhere; override it to swap typefaces entirely. A full
type scale is available as tokens for your own headings/body text, not just internal component use:

| Token | Size |
| --- | --- |
| `--ruk-font-size-xs` | 12px |
| `--ruk-font-size-sm` | 13px |
| `--ruk-font-size-md` | 15px (body default) |
| `--ruk-font-size-lg` | 17px |
| `--ruk-font-size-xl` | 20px |
| `--ruk-font-size-2xl` | 24px |
| `--ruk-font-size-3xl` | 30px |
| `--ruk-font-size-4xl` | 36px |
| `--ruk-font-size-5xl` | 48px |

Plus `--ruk-line-height-{tight,snug,normal,relaxed}` and `--ruk-font-weight-{extralight,regular,semibold}`
(the font is a variable font spanning weight 200–800, so any numeric weight in that range works, not
just these three). See the `Foundations/Typography` page in Storybook for a live specimen.

## Components

- **Button** — `variant` (`primary` | `secondary` | `outline` | `ghost` | `danger`), `size` (`sm` | `md` | `lg`), `fullWidth`, plus all native `<button>` props.
- **Input** — `label`, `helperText`, `errorText`, `size`, `fullWidth`, plus all native `<input>` props.
- **Icon** — a small built-in icon set (`name`) or pass custom SVG children; `size` in pixels.
- **ToggleSwitch** — accessible switch (`role="switch"`), `label`, `size` (`sm` | `md`), controlled (`checked`/`onChange`) or uncontrolled (`defaultChecked`).
- **Rating** — 5-star rating (`max` to change the count). Interactive by default (`value`/`onChange` or `defaultValue`, keyboard-accessible radio group); pass `readOnly` for a static display that also supports fractional values (e.g. `value={3.5}`).
- **Spinner** — a rotating hourglass (`size`, `label` for the screen-reader-only status text). `variant="plain"` (default) spins continuously; `variant="sand"` flips, pauses, and drains sand from the top bulb to the bottom in sync. Colored via `currentColor`/`--ruk-color-primary` (sand stays its own brown/white regardless). Respects `prefers-reduced-motion` by slowing rather than removing the animation.
- **Skeleton** — a shimmering placeholder block. `variant` (`text` | `circular` | `rectangular`), `width`/`height`. Compose several to build loading states for cards, lists, avatars, etc. — see the `CardPlaceholder` story.
- **Popover** — a generic trigger + floating content primitive. `trigger` (a single ref-forwarding element, e.g. `<MapMarker />` or `<Button />`), `placement` (`top` | `bottom` | `left` | `right`), controlled (`open`/`onOpenChange`) or uncontrolled (`defaultOpen`). Closes on outside click or Escape (returning focus to the trigger).
- **MapMarker** — a clickable pin-shaped marker (`label` for its accessible name, `size`). Renders as a `<button>` with a forwarded ref, so it works directly as a `Popover` `trigger`: `<Popover trigger={<MapMarker label="..." />}>...</Popover>`.

See each component's Storybook stories (`src/components/*/*.stories.tsx`) for live, interactive examples.
