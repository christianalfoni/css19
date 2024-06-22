import * as React from "react";
import ReactJSXRuntimeDev from "react/jsx-dev-runtime";
import hash from "hash-sum";
import { createStyleSheet } from "./createStyleSheet.js";

export const Fragment = ReactJSXRuntimeDev.Fragment;

/** Create a JSX element that accepts a `css` prop to generate atomic class names. */
export function jsxDEV(
  type: any,
  props: Record<string, any>,
  key: string,
  isStaticChildren: boolean,
  source: any,
  self: any
): React.JSX.Element {
  if (props.css && typeof type === "string") {
    const cssHash = hash(props.css);
    const style = React.createElement(
      "style",
      {
        href: cssHash,
        precedence: "low",
      },
      createStyleSheet(`css-${cssHash}`, props.css, true)
    );

    return ReactJSXRuntimeDev.jsxDEV(
      Fragment,
      {
        children: [
          React.createElement(
            type,
            {
              ...props,
              className: `css-${cssHash} ${props.className || ""}`,
              css: undefined,
              children: undefined,
            },
            ...(Array.isArray(props.children)
              ? props.children
              : [props.children])
          ),
          style,
        ],
      },
      key,
      true,
      source,
      self
    );
  }

  return ReactJSXRuntimeDev.jsxDEV(
    type,
    props,
    key,
    isStaticChildren,
    source,
    self
  );
}
