import * as React from "react";
import hash from "hash-sum";
import type { CSSProp, GlobalCSS } from "./types";
import { createStyleSheet } from "./createStyleSheet.js";

export function css<T extends CSSProp>(css: T): T & { toString(): string } {
  const cssHash = hash(css);

  css.toString = () => ".css-" + cssHash;

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
