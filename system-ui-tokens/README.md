# @css19/system-ui-tokens

## Install

```shell
npm install @css19/system-ui-tokens
```

**NOTE!** Requires @css19/css

## Configure

```tsx
import { createTokens } from "@css19/system-ui-tokens";

const [systemUi, tokens, style] = createTokens({
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

function App() {
  return (
    <>
      {style}
      <div>
        <h1
          css={systemUi({
            // The mapped tokens ensures type safety and restricts to only using tokens
            // on mapped CSS properties
            color: "primary",
            // You can still use the tokens for manual composition
            border: `1px solid ${tokens.colors.primary}`,
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

The `createTokens` function converts your tokens into CSS variables. The `style` tag is used to mount these variable into your application. This works with client and server. The `systemUi` function only translates token values into the respective token variables.

This package requires `@css19/css`
