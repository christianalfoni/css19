# @css19/tokens

## Install

```shell
npm install @css19/tokens
```

**NOTE!** Requires React 19

## Configure

```tsx
import { createTokens } from "@css19/tokens";

const [tokens, style] = createTokens({
  colors: {
    /**
     * My token documentation
     */
    primary: "red",
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
      </div>
    </>
  );
}
```

## How it works

The `createTokens` function converts your tokens into CSS variables. The `style` tag is used to mount these variable into your application. This works with client and server.

Using a token reference allows you to use TypeScript features like documenting the tokens, finding all tokens by reference and even rename symbol to refactor tokens across your project.

This package can be used with ANY CSS solution in React.
