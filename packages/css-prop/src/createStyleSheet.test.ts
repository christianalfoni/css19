// sum.test.js
import { expect, test } from "vitest";
import { createStyleSheet } from "./createStyleSheet";

test("base rules", () => {
  const style = createStyleSheet(
    "css-123",
    {
      color: "blue",
    },
    true
  );
  expect(style).toBe(`.css-123 {
  color: blue;
}
`);
});

test("pseudo rules", () => {
  const style = createStyleSheet(
    "css-123",
    {
      color: "blue",
      ":hover": {
        color: "red",
      },
    },
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
    "css-123",
    {
      color: "blue",
      "&:hover": {
        color: "red",
      },
    },
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
    "css-123",
    {
      "@media (max-width: 500px)": {
        color: "red",
      },
      color: "blue",
    },
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
