# @css19/system-ui-tokens

## Install

```shell
npm install @css19/system-ui-tokens
```

**NOTE!** Requires @css19/css

## Configure

```tsx
import { createVariables } from "@css19/css";
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

const [variables, style] = createVariables(tokens);

function App() {
  return (
    <>
      {style}
      <div>
        <h1
          css={systemUi({
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
    </>
  );
}
```

## How it works

The `createSystemUi` function allows you to configure your system-ui tokens. It returns a function which restricts related CSS properties to your tokens and the tokens themselves.

This package requires `@css19/css`
