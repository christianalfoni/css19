import * as React from "react";
import ReactJSXRuntime from "react/jsx-runtime";
import hash from "hash-sum";
import { createStyleSheet } from "./createStyleSheet.js";
export type { CSSPropJSX as JSX } from "./types";

export const Fragment = ReactJSXRuntime.Fragment;

function CSSElement({ props, key, type }) {
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
        React.createElement(
          type,
          {
            ...props,
            className: `css-${cssHash} ${props.className || ""}`,
            css: undefined,
            children: undefined,
          },
          ...(Array.isArray(props.children) ? props.children : [props.children])
        ),
        style,
      ],
    },
    key
  );
}

export function jsx(type: any, props: Record<string, any>, key: string) {
  if (props.css && typeof type === "string") {
    return React.createElement(CSSElement, { type, props, key });
  }

  return ReactJSXRuntime.jsx(type, props, key);
}

export function jsxs(type: any, props: Record<string, any>, key: string) {
  if (props.css) {
    const cssHash = React.useMemo(() => hash(props.css), [props.css]);
    const style = React.useMemo(
      () =>
        React.createElement(
          "style",
          {
            href: cssHash,
            precedence: "low",
          },
          createStyleSheet(`css-${cssHash}`, props.css, true)
        ),
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
