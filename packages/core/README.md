# @css19/core

## Intall

```shell
npm install @css19/core
```

**NOTE!** Requires React 19

## Configure

_tsconfig.json_

```json
{
  "compilerOptions": {
    "jsxImportSource": "@css19/css-prop"
  }
}
```

## Usage

The CSS object follows the [nested CSS spec](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector). That means any attributes, pseudos etc. needs to use the `&` to add it to the actual element consuming the style definition.

```tsx
function App() {
  return (
    <div>
      <h1
        css={{
          color: "red",
          ":hover": {
            color: "blue",
          },
        }}
      >
        Hello World
      </h1>
    </div>
  );
}
```

Any element now has a typed `css` property where you can use any kind of CSS selector.

You can define style definitions outside components using the `css` function. This provides typing and you can use the object as an override reference.

```tsx
import { css } from "@css/css-prop";

const headerCss = css({
  color: "tomato",
});

function App() {
  return (
    <div
      css={{
        [headerCss]: {
          fontSize: "48px",
          color: "royalblue",
        },
      }}
    >
      <h1 css={headerCss}>Hello World</h1>
    </div>
  );
}
```

You can also define global css using `globalCss`, which returns a style element you need to mount.

```tsx
import { globalCss } from "@css/css-prop";

const globalStyle = globalCss({
  "@keyframes fade": {
    from: { color: "red" },
    to: { color: "blue" },
  },
});

function App() {
  return (
    <>
      {globalStyle}
      <div>
        <h1>Hello World</h1>
      </div>
   <>
  )
}
```

## How it works

When the `css` prop is active on an element `@css19/css-prop` will create a hash from the object. Order of keys does not matter, if the objects represents the same styling, the hash is the same. By using the new [style tag and hoisting](https://react.dev/reference/react-dom/components/style) feature of React 19, your CSS is will "just work" both client and server side.

Each element gets only a single CSS classname that references the styling generated related to the element. React 19 automatically de-duplicates styles. This ensures no presedence issues and styling for each element will be co located.
