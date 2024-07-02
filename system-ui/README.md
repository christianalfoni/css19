# @css19/system-ui-tokens

## Install

```shell
npm install @css19/system-ui-tokens
```

**NOTE!** Requires @css19/css

## Configure

```tsx
import { createTheme, ThemeProvider } from "@css19/themes";
import { createSystemUi } from "@css19/system-ui";

const [systemUi, tokens] = createSystemUi({
  // These categories maps to specific CSS properties, where
  // tokens are enforced. See source code for the specific mappings
  colors: {
    primary: "red",
  },
  fonts: {},
  fontSizes: {},
  lineHeights: {},
  letterSpacings: {},
  sizes: {},
  space: {},
  transitions: {},
  radii: {},
  zIndices: {},
  shadows: {},
  borderWidths: {},
  borderStyles: {},
});

const [theme, variables] = createTheme("light", tokens);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1
          style={systemUi({
            // The mapped tokens ensures type safety and restricts to only using variables
            // on mapped CSS properties
            color: "primary",
            // You can still use the variables for manual composition
            border: `1px solid ${variables.colors.primary}`,
          })}
        >
          Hello World
        </h1>
      </div>
    </ThemeProvider>
  );
}
```

## How it works

The `createTokens` function converts your tokens into CSS variables. The `style` tag is used to mount these variable into your application. This works with client and server. The `systemUi` function only translates token values into the respective token variables.

This package requires `@css19/css`
