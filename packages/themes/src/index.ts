import * as React from "react";

type Tokens = Record<string, Record<string, string>>;

export function createTokens<
  T extends Tokens,
  TH extends {
    [theme: string]: Partial<{
      [K in keyof T]: Partial<T[K]>;
    }>;
  }
>(tokens: T, themes: TH) {
  const themeClassNames = {} as {
    [K in keyof TH]: string;
  };

  let themesString = "";

  if (themes) {
    for (const theme in themes) {
      const themeClassName = `design-system-theme-${theme}`;

      themeClassNames[theme] = themeClassName;
      themesString += `.${themeClassName} {\n`;
      for (const tokenGroup in themes[theme]) {
        for (const token in themes[theme][tokenGroup]) {
          if (!tokens[tokenGroup][token]) {
            throw new Error(
              'The token "' + tokenGroup + "." + token + '" does not exist'
            );
          }

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
      href: "css-themes",
      precedence: "low",
    },
    themesString
  );

  return [themeClassNames, style] as const;
}
