import { CSSProps } from "./types";

export function createStyleSheet(hash: string, css: CSSProps, isRoot = false) {
  let styleSheet = "";
  let nested = "";

  for (let rule in css) {
    if (rule[0] === "@") {
      nested += `\n${rule} {\n  .${hash} {\n  ${createStyleSheet(
        hash,
        css[rule as keyof CSSProps] as CSSProps
      )}  }\n}`;
      continue;
    }

    if (typeof css[rule as keyof CSSProps] === "object") {
      nested += `\n.${hash}${rule} {\n${createStyleSheet(
        hash,
        css[rule as keyof CSSProps] as CSSProps
      )}}`;
      continue;
    }

    if (!styleSheet && isRoot) {
      styleSheet += `.${hash} {\n`;
    }

    styleSheet += `  ${rule}: ${css[rule as keyof CSSProps]};\n`;
  }

  if (styleSheet && isRoot) {
    styleSheet += "}";
  }

  return styleSheet + nested;
}
