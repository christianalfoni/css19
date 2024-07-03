# @css19/themes

## Install

```shell
npm install @css19/themes
```

**NOTE!** Requires React 19

## Configure

### Single theme consumption

```tsx
import { createTheme, createThemeProvider } from "@css19/themes";

const tokens = {
  colors: {
    primary: "red",
  },
};

const theme = createTheme("light", tokens, {});

const [variables, ThemeProvider] = createThemeProvider(theme);

function App() {
  return (
    <ThemeProvider>
      <h1 style={{ color: variables.colors.primary }}>Hello World</h1>
    </ThemeProvider>
  );
}
```

### Multi theme consumption

```tsx
import { createTheme, createThemesProvider } from '@css19/themes'

const tokens = {
  colors: {
    primary: 'red'
  }
}

const light = createTheme('light', tokens, {})
const dark = createTheme('dark', tokens, {
  colors: {
    primary: 'blue'
  }
})

const [variables, ThemeProvider, useThemes] = createThemesProvider(
  { light, dark },
  // This callback runs in an isolated script tag scope to ensure the theme is
  // activated before your app mounts. Use the themes, preferred system preference of
  // "light" or "dark" or local storage, to decide what theme to activate. This callback runs again
  // if system preference changes or using the "useThemes" hook
  (themes, preferred) => themes[preferred]
)

function App() {
  return (
    <ThemesProvider>
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

The `createTheme` function takes tokens and generates variable overrides for the defined themes. `createThemesProvider` will map these variables, deduplicate and allow you to consume them in your app. This works with client and server. With multiple themes you will be able to activate the current theme based on system preference or any other reference you customise. Using the `light` and `dark` color scheme allows for usage of the `light-dark()` CSS utility.

This package can be used with ANY CSS solution in React.
