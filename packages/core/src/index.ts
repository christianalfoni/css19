import * as React from "react";

import type { CSSProp, GlobalCSS } from "./types";
import { createStyleSheet } from "./createStyleSheet.js";
import { hash } from "./hash.js";

export function css<T extends CSSProp>(css: T): T & { toString(): string } {
  // We generate the hash when actually used to avoid situations where
  // a ton of hashes are generated when booting up the app. It rather
  // generates during composition or reconciliation, which spreads out
  // the has computation
  Object.defineProperty(css, "toString", {
    enumerable: false,
    configurable: false,
    get() {
      return `.css-${hash(css)}`;
    },
  });

  // We type this as a string so that you can use the object as keys in other objects.
  // TypeScript will probably be able to infer this at some point.
  return css;
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
