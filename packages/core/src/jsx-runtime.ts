import * as React from "react";
import ReactJSXRuntime from "react/jsx-runtime";
import hash from "hash-sum";
import { createStyleSheet } from "./createStyleSheet.js";
export type { CSSPropJSX as JSX } from "./types.js";

export const Fragment = ReactJSXRuntime.Fragment;

function CSSElement({
  props,
  key,
  type,
}: {
  props: Record<any, any>;
  key?: string;
  type: string;
}) {
  const cssHash = React.useMemo(
    () => (props.css.toString ? props.css.toString() : hash(props.css)),
    [props.css]
  );
  const style = React.useMemo(
    () =>
      React.createElement("style", {
        href: cssHash,
        precedence: "low",
        dangerouslySetInnerHTML: {
          __html: createStyleSheet(props.css, `css-${cssHash}`, true),
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
    /**
     * In production we wrap each CSS prop element in a component. This allows us to use
     * memo hooks to avoid generating the hash or styling unnecessarily. Using React compiler
     * the CSS prop, if static, will always be memoizable. Also we avoid reconciling the
     * style tag when the hash is the same. We do not do this during development, as it
     * creates a lot of additional components in the inspector.
     */
    return React.createElement(CSSElement, { type, props, key });
  }

  return ReactJSXRuntime.jsx(type, props, key);
}

export function jsxs(type: any, props: Record<string, any>, key: string) {
  if (props.css) {
    return React.createElement(CSSElement, { type, props, key });
  }

  return ReactJSXRuntime.jsxs(type, props, key);
}
