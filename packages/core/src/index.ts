import * as React from "react";
import hash from "hash-sum";
import type { CSSProp, GlobalCSS } from "./types";
import { createStyleSheet } from "./createStyleSheet.js";

export function css<T extends CSSProp>(css: T) {
  const cssHash = hash(css);

  css.toString = () => ".css-" + cssHash;

  // We type this as a string so that you can use the object as keys in other objects.
  // TypeScript will probably be able to infer this at some point.
  return css as T & { toString(): string } & string;
}

export function globalCss<T extends GlobalCSS>(css: T) {
  const cssHash = hash(css);

  return React.createElement(
    "style",
    {
      href: cssHash,
      precedence: "high",
    },
    createStyleSheet(css, "")
  );
}
