# @css19/themes

## Install

```shell
npm install @css19/themes
```

**NOTE!** Requires React 19

## Configure

```tsx
import { createThemes, ThemesProvider, useThemes } from "@css19/themes";

const tokens = {
  colors: {
    primary: "pink",
  },
}

const [themes, variables] = createThemes(tokens, {
  light: {
    colorScheme: 'light'
  },
  dark: {
    colorScheme: 'dark',
    colors: {
      primary: "royalblue",
    },
  }
})

function App() {
  return (
    <ThemesProvider
      // Mount the themes
      themes={themes}
      // This callback runs in an isolated script tag scope to ensure the theme is
      // activated before your app mounts. Use the themes, preferred system preference of
      // "light" or "dark" or local storage, to decide what theme to activate. This callback runs again
      // if system preference changes or using the "useThemes" hook
      setTheme={(themes, preferred) => themes[preferred]}
    >
      <h1 style={{ color: variables.colors.primary }}>Hello World</h1>
      <SomeNestedComponent />
    </ThemesProvider>
  );
}

function SomeNestedComponent() {
  const themes = useThemes();

  return (
    // Override theme in a section of the page
    <div className={themes.themes.dark}>
      <h2>Current theme is: {themes.current}</2>
      <button onClick={() => themes.update()}>Update theme</button>
    </div>
  );
}
```

**Note!** Calling `themes.update` will run the `setTheme` callback of the provider again. That means you will need to provide the updated theme through local storage etc.

## How it works

The `createThemes` function takes tokens and generates variable overrides for the defined themes. The themes provider is used to mount these variable overrides. This works with client and server. With multiple themes you will be able to activate the current theme based on system preference or any other reference you customise. Using the `light` and `dark` color scheme allows for usage of the `light-dark()` CSS utility.

This package can be used with ANY CSS solution in React.
