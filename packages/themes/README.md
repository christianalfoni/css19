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

const [themes, style] = createThemes(tokens, {
  fun: {
    colors: {
      primary: "pink",
    },
  },
});

function App() {
  return (
    <>
      {style}
      <div>
        <h1
          style={{
            color: tokens.colors.primary,
          }}
        >
          Hello World
        </h1>
        <div className={themes.fun}>
          <h4
            style={{
              color: tokens.colors.primary,
            }}
          >
            The world is a fun place
          </h4>
        </div>
      </div>
    </>
  );
}
```

You can also generate light and dark themes, simply by prefixing the name of them with `light` or `dark`. This will allow you to use `light-dark(A, B)` utility in your CSS.

```tsx
import { createThemes } from "@css19/themes";
import { tokens } from "./tokens";

const [themes, style] = createThemes(tokens, {
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
});

function App() {
  return (
    <>
      {style}
      <div className={themes.light}>
        <h1
          css={{
            color: tokens.colors.primary,
            textDecoration: "light-dark(underline, none)",
          }}
        >
          Hello World
        </h1>
      </div>
    </>
  );
}
```

If you want to control your theme globally based on system preference or custom persistence of theme choice, you can pass a callback which runs on the client.

```tsx
import { createThemes } from "@css19/themes";
import { tokens } from "./tokens";

const [themes, style] = createThemes(
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
```

You can choose to return any of the themes here. For example if any of them are stored in local storage or passed from the server as a global payload to the page. This ensures that the global classname is applied before any server rendered HTML appears and there is no difference in client side rendering.

## How it works

The `createThemes` function takes tokens and generates variable overrides for the defined themes. The `style` tag is used to mount these variable overrides into your application. This works with client and server. Any `light` or `dark` prefix will also add the `color-scheme` property for usage with the `light-dark()` CSS utility. Use `setGlobalTheme` when you want to fully control what theme is activated in the client without affecting server side rendering.

This package can be used with ANY CSS solution in React.
