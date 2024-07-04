import * as React from "react";

import type { CSSProp, GlobalCSS, CSSSelectors } from "./types.js";
import { createStyleSheet } from "./createStyleSheet.js";
import { hash } from "./hash.js";

export type { CSSProp, GlobalCSS, CSSSelectors };

export function css<T extends CSSProp>(css: T): T & { toString(): string } {
  // We generate the hash when actually used to avoid situations where
  // a ton of hashes are generated when booting up the app. It rather
  // generates during composition or reconciliation, which spreads out
  // the computation
  Object.defineProperty(css, "toString", {
    enumerable: false,
    configurable: false,
    get() {
      return `.css-${hash(css)}`;
    },
  });

  return css;
}

export function globalCss<T extends GlobalCSS>(css: T) {
  const cssHash = hash(css);

  return React.createElement(
    "style",
    {
      href: cssHash,
      precedence: "low",
    },
    createStyleSheet(css, "")
  );
}

export function scopedCss<T extends CSSProp>(css: T) {
  const cssHash = hash(css);
  const className = "css-" + cssHash;

  return [
    className,
    React.createElement(
      "style",
      {
        href: cssHash,
        precedence: "low",
      },
      createStyleSheet(css, className, true)
    ),
  ] as const;
}

export type Variables = Record<string, Record<string, string>>;

export function createVariables<T extends Variables>(
  variables: T
): [T, React.ReactNode] {
  const variableReferences = {} as any;

  for (const variableGroup in variables) {
    for (const variable in variables[variableGroup]) {
      if (!variableReferences[variableGroup]) {
        variableReferences[variableGroup] = {} as any;
      }
      variableReferences[variableGroup][
        variable
      ] = `var(--${variableGroup}-${variable})`;
    }
  }

  let rootVariables = ":root {\n";

  for (let variableGroup in variables) {
    for (let variable in variables[variableGroup]) {
      rootVariables += `  --${variableGroup}-${variable}: ${variables[variableGroup][variable]};\n`;
    }
  }

  rootVariables += "}\n";

  const style = React.createElement(
    "style",
    {
      href: "css-variables",
      precedence: "low",
    },
    rootVariables
  );

  return [variableReferences, style];
}
