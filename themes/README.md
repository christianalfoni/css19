# @css19/themes

## Install

```shell
npm install @css19/themes
```

**NOTE!** Requires React 19

## Configure

### Single theme

```tsx
import { createTheme, ThemeProvider } from "@css19/themes";

const [myTheme, variables] = createTheme("light", {
  // Define a group of variables
  colors: {
    // Name your variables and give a value
    primary: "pink",
  },
});

function App() {
  return (
    // Mount your theme to start using your variables
    <ThemeProvider theme={myTheme}>
      <h1 style={{ color: variables.colors.primary }}>Hello World</h1>
    </ThemeProvider>
  );
}
```

### Multiple themes

```tsx
import { createTheme, ThemesProvider, useThemes } from "@css19/themes";

const [light, variables] = createTheme("light", {
  colors: {
    primary: "pink",
  },
});

const dark = createTheme(variables, "dark", {
  colors: {
    primary: "royalblue",
  },
});

function App() {
  return (
    <ThemesProvider
      // Mount the themes
      themes={{ light, dark }}
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
      <button onClick={() => themes.setTheme()}>Update theme</button>
    </div>
  );
}
```

**Note!** Calling `themes.setTheme` will run the `setTheme` callback of the provider again. That means you will need to provide the updated theme through local storage etc.

## How it works

The `createTheme` function takes tokens and generates variable overrides for the defined themes. The theme providers is used to mount these variable overrides. This works with client and server. With multiple themes you will be able to activate the current theme based on system preference or any other reference you customise. Using the `light` and `dark` color scheme allows for usage of the `light-dark()` CSS utility.

This package can be used with ANY CSS solution in React.
