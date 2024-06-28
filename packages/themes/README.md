# @css19/themes

## Install

```shell
npm install @css19/themes
```

**NOTE!** Requires React 19

## Configure

```tsx
import { createThemes } from "@css19/themes";
import { tokens } from "./tokens";

const [themes, themesProvider] = createThemes(
  // Pass tokens from any tokens package
  tokens,
  // Define your theme overrides
  {
    light: {
      colors: {
        primary: "pink",
      },
    },
    dark: {
      colors: {
        primary: "blue",
      },
    },
  },
  // Return the theme you want to activate globally. Here you can also choose any
  // theme you stored in local storage for example
  (systemPreference, themes) => themes[systemPreference]
);
```

Theme names prefixed with `light` or `dark` will also get the related color scheme. This will allow you to use `light-dark(A, B)` utility in your CSS. The returned `themes` can be used to change themes in certain parts of the component tree.

```tsx
import { createThemes } from "@css19/themes";
import { tokens } from "./tokens";

const [themes, themesProvider] = createThemes(
  tokens,
  {
    light: {
      colors: {
        primary: "pink",
      },
    },
    dark: {
      colors: {
        primary: "blue",
      },
    },
  },
  (preferred, themes) => themes[preferred]
);

function App() {
  return (
    <>
      {themesProvider}
      <h1
        css={{
          color: tokens.colors.primary,
          textDecoration: "light-dark(underline, none)",
        }}
      >
        Hello World
      </h1>
      <div className={themes.dark}>Hello dark</div>
    </>
  );
}
```

## How it works

The `createThemes` function takes tokens and generates variable overrides for the defined themes. The `themesProvider` is used to mount these variable overrides and the related JavaScript to configure your global style based on system preferences. This works with client and server. Any `light` or `dark` prefix will also add the `color-scheme` property for usage with the `light-dark()` CSS utility.

This package can be used with ANY CSS solution in React.
