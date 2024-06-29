// "scope" is a className, or empty string when global
export function createStyleSheet(css: any, scope: string, isRoot = false) {
  let styleSheet = "";
  let mediaQueries = "";

  for (let rule in css) {
    if (rule === "toString") {
      continue;
    }

    if (rule.startsWith("@keyframes")) {
      // We resolve keyframes here, though only GlobalCSS is typed with it
      styleSheet += `${rule} {\n${createStyleSheet(css[rule], scope)}}\n`;
      continue;
    }

    if (rule[0] === "@" && scope) {
      // Media queries requires the hash classname to be nested
      mediaQueries += `\n${rule} {\n  .${scope} {\n  ${createStyleSheet(
        css[rule],
        scope
      )}  }\n}\n`;
      continue;
    }

    if (rule[0] === "@") {
      // When global, we drop the hash classname
      mediaQueries += `\n${rule} {\n  ${createStyleSheet(
        css[rule],
        scope
      )}  }\n`;
      continue;
    }

    // Generate the nested CSS Props
    if (typeof css[rule] === "object") {
      styleSheet += `  ${rule} {\n  ${createStyleSheet(css[rule], scope)}  }\n`;
      continue;
    }

    if (!styleSheet && scope && isRoot) {
      styleSheet += `.${scope} {\n`;
    }

    // Convert camel case to hyphen and insert value
    styleSheet += `  ${rule.replace(
      /[A-Z]/g,
      (match) => "-" + match.toLowerCase()
    )}: ${css[rule]};\n`;
  }

  if (styleSheet && scope && isRoot) {
    styleSheet += "}\n";
  }

  return styleSheet + mediaQueries;
}
