// sum.test.js
import { expect, test } from "vitest";
import { createStyleSheet } from "./createStyleSheet";

test("base rules", () => {
  const style = createStyleSheet(
    {
      color: "blue",
    },
    "css-123",
    true
  );
  expect(style).toBe(`.css-123 {
  color: blue;
}
`);
});

test("pseudo rules", () => {
  const style = createStyleSheet(
    {
      color: "blue",
      ":hover": {
        color: "red",
      },
    },
    "css-123",
    true
  );
  expect(style).toBe(`.css-123 {
  color: blue;
  :hover {
    color: red;
  }
}
`);
});

test("pseudo parent rules", () => {
  const style = createStyleSheet(
    {
      color: "blue",
      "&:hover": {
        color: "red",
      },
    },
    "css-123",
    true
  );

  expect(style).toBe(`.css-123 {
  color: blue;
  &:hover {
    color: red;
  }
}
`);
});

test("media query", () => {
  const style = createStyleSheet(
    {
      "@media (max-width: 500px)": {
        color: "red",
      },
      color: "blue",
    },
    "css-123",
    true
  );
  console.log(style);
  expect(style).toBe(`.css-123 {
  color: blue;
}

@media (max-width: 500px) {
  .css-123 {
    color: red;
  }
}
`);
});

test("keyframes", () => {
  const style = createStyleSheet(
    {
      "@keyframes pulse": {
        from: { color: "red" },
        to: { color: "blue" },
      },
    },
    "",
    true
  );
  console.log(style);
  expect(style).toBe(`@keyframes pulse {
  from {
    color: red;
  }
  to {
    color: blue;
  }
}
`);
});

test("general global styles", () => {
  const style = createStyleSheet(
    {
      ".foo": {
        color: "blue",
      },
    },
    "",
    true
  );
  console.log(style);
  expect(style).toBe(`  .foo {
    color: blue;
  }
`);
});
