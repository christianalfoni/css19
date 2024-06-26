import { CSSProp } from "./types";

export function createStyleSheet(hash: string, css: CSSProp, isRoot = false) {
  let styleSheet = "";
  let mediaQueries = "";

  for (let rule in css) {
    if (rule[0] === "@") {
      // Media queries requires the hash classname to be nested
      mediaQueries += `\n${rule} {\n  .${hash} {\n  ${createStyleSheet(
        hash,
        css[rule as keyof CSSProp] as CSSProp
      )}  }\n}\n`;
      continue;
    }

    // Generate the nested CSS Props
    if (typeof css[rule as keyof CSSProp] === "object") {
      styleSheet += `  ${rule} {\n  ${createStyleSheet(
        hash,
        css[rule as keyof CSSProp] as CSSProp
      )}  }\n`;
      continue;
    }

    if (!styleSheet && isRoot) {
      styleSheet += `.${hash} {\n`;
    }

    // Convert camel case to hyphen and insert value
    styleSheet += `  ${rule.replace(
      /[A-Z]/g,
      (match) => "-" + match.toLowerCase()
    )}: ${css[rule as keyof CSSProp]};\n`;
  }

  if (styleSheet && isRoot) {
    styleSheet += "}\n";
  }

  return styleSheet + mediaQueries;
}
