import * as React from "react";
import ReactJSXRuntimeDev from "react/jsx-dev-runtime";
import hash from "hash-sum";
import { createStyleSheet } from "./createStyleSheet";

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
  if (props.css) {
    const cssHash = React.useMemo(() => hash(props.css), [props.css]);
    const style = React.useMemo(
      () =>
        React.createElement("style", {
          href: cssHash,
          precedence: "low",
          dangerouslySetInnerHTML: {
            __html: createStyleSheet(`css-${cssHash}`, props.css, true),
          },
        }),
      [cssHash]
    );

    return ReactJSXRuntimeDev.jsxDEV(
      Fragment,
      {
        children: [
          React.createElement(type, {
            ...props,
            className: `css-${cssHash} ${props.className || ""}`,
            css: undefined,
          }),
          style,
        ],
      },
      key,
      isStaticChildren,
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
