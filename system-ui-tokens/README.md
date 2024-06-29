# @css19/system-ui-tokens

## Install

```shell
npm install @css19/system-ui-tokens
```

**NOTE!** Requires @css19/core

## Configure

```tsx
import { createTokens } from "@css19/system-ui-tokens";

const [systemUi, tokens, style] = createTokens({
  // These categories maps to specific CSS properties, where
  // tokens are enforced. See source code for mappings
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

const headerCss = systemUi({
  color: "primary",
  border: `1px solid ${tokens.colors.primary}`,
});

function App() {
  return (
    <>
      {style}
      <div>
        <h1 css={headerCss}>Hello World</h1>
      </div>
    </>
  );
}
```

## How it works

The `createTokens` function converts your tokens into CSS variables. The `style` tag is used to mount these variable into your application. This works with client and server. The `systemUi` function is a wrapper around the `css` function from `@css19/core`, where token values are converted to the respective token variable.

Using a token reference allows you to use TypeScript features like documenting the tokens, finding all tokens by reference and even rename symbol to refactor tokens across your project.

This package can be used with ANY CSS solution in React.
