import * as React from "react";

type Tokens = Record<string, Record<string, string>>;

export function createTokens<T extends Tokens>(tokens: T) {
  const tokenVariables = {} as {
    [K in keyof T]: {
      [K2 in keyof T[K]]: string;
    };
  };

  let tokensString = ":root {\n";

  for (const tokenGroup in tokens) {
    for (const token in tokens[tokenGroup]) {
      if (!tokenVariables[tokenGroup]) {
        tokenVariables[tokenGroup] = {} as any;
      }
      tokenVariables[tokenGroup][token] = `var(--${tokenGroup}-${token})`;
      tokensString += `--${tokenGroup}-${token}: ${tokens[tokenGroup][token]};\n`;
    }
  }

  tokensString += "}\n\n";

  const style = React.createElement(
    "style",
    {
      href: "css-tokens",
      precedence: "low",
    },
    tokensString
  );

  return [tokenVariables, style] as const;
}
