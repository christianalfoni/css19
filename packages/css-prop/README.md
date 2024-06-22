# @css19/css-prop

## Intall

```shell
npm install @css19/css-prop
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

## How it works

When the `css` prop is active on an element `@css19/css-prop` will create a hash from the object. Order of keys does not matter, if the object looks the same, the hash is the same. By using the new [style tag and hoisting](https://react.dev/reference/react-dom/components/style) feature of React 19, your CSS is will "just work" both client and server side.

Each element gets only a single CSS classname that references the styling generated related to the element. React 19 automatically de-duplicates styles. This ensures no presedence issues and co location of styling for each element.
