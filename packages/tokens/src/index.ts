import * as React from "react";

type Tokens = Record<string, Record<string, string>>;

export function createTokens<
  T extends Tokens,
  TH extends {
    [theme: string]: Partial<{
      [K in keyof T]: Partial<T[K]>;
    }>;
  }
>({ tokens, themes }: { tokens: T; themes?: TH }) {
  const tokenVariables = {} as {
    [K in keyof T]: {
      [K2 in keyof T[K]]: string;
    };
  };
  const themeClassNames = {} as {
    [K in keyof TH]: string;
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

  let themesString = "";

  if (themes) {
    for (const theme in themes) {
      const themeClassName = `design-system-theme-${theme}`;

      themeClassNames[theme] = themeClassName;
      themesString += `.${themeClassName} {\n`;
      for (const tokenGroup in themes[theme]) {
        for (const token in themes[theme][tokenGroup]) {
          themesString += `--${tokenGroup}-${token}: ${
            themes[theme][tokenGroup]![token]
          };\n`;
        }
      }
      themesString += "}\n\n";
    }
  }

  const style = React.createElement(
    "style",
    {
      href: "css-tokens",
      precedence: "low",
    },
    tokensString + themesString
  );

  return {
    tokens: tokenVariables,
    themes: themeClassNames,
    style,
  };
}
