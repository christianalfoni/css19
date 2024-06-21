import { CSSProp } from "./types";

export function createStyleSheet(hash: string, css: CSSProp, isRoot = false) {
  let styleSheet = "";
  let nested = "";

  for (let rule in css) {
    if (rule[0] === "@") {
      nested += `\n${rule} {\n  .${hash} {\n  ${createStyleSheet(
        hash,
        css[rule as keyof CSSProp] as CSSProp
      )}  }\n}`;
      continue;
    }

    if (typeof css[rule as keyof CSSProp] === "object") {
      nested += `\n.${hash}${rule} {\n${createStyleSheet(
        hash,
        css[rule as keyof CSSProp] as CSSProp
      )}}`;
      continue;
    }

    if (!styleSheet && isRoot) {
      styleSheet += `.${hash} {\n`;
    }

    styleSheet += `  ${rule.replace(
      /[A-Z]/g,
      (match) => "-" + match.toLowerCase()
    )}: ${css[rule as keyof CSSProp]};\n`;
  }

  if (styleSheet && isRoot) {
    styleSheet += "}";
  }

  return styleSheet + nested;
}
