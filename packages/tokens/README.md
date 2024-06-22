# @css19/tokens

## Install

```shell
npm install @css19/tokens
```

**NOTE!** Requires React 19

## Configure

```tsx
import { createTokens } from "@css19/tokens";

const { tokens, themes, style } = createTokens({
  tokens: {
    colors: {
      /**
       * My token documentation
       */
      primary: "red",
    },
  },
  themes: {
    fun: {
      colors: {
        primary: "pink",
      },
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

## How it works

The `createTokens` function converts your tokens into CSS variables and themes into CSS variable overrides. The `style` tag is used to mount these variable into your application. This works with client and server.

Using a tokens reference allows you to use TypeScript features like documenting the tokens, finding all tokens by reference and even rename symbol.

This package can be used with ANY CSS solution in React.
