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

## How it works

The `createThemes` function takes tokens and generates variable overrides for the defined themes. The `style` tag is used to mount these variable overrides on the related theme class into your application. This works with client and server.

This package can be used with ANY CSS solution in React.
