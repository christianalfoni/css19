import * as React from "react";
import ReactJSXRuntime from "react/jsx-runtime";
import hash from "hash-sum";
import { createStyleSheet } from "./createStyleSheet.js";
export type { CSSPropJSX as JSX } from "./types";

export const Fragment = ReactJSXRuntime.Fragment;

export function jsx(type: any, props: Record<string, any>, key: string) {
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

    return ReactJSXRuntime.jsx(
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
      key
    );
  }

  return ReactJSXRuntime.jsx(type, props, key);
}

export function jsxs(type: any, props: Record<string, any>, key: string) {
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

    return ReactJSXRuntime.jsxs(
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
      key
    );
  }

  return ReactJSXRuntime.jsxs(type, props, key);
}
