import * as React from "react";

type Tokens = Record<string, Record<string, string | number>>;

export function createThemes<
  T extends Tokens,
  TH extends {
    [key: string]: Partial<{
      [K in keyof T]: Partial<T[K]>;
    }>;
  }
>(
  tokens: T,
  themes: TH,
  cb: (
    preferred: "dark" | "light",
    themes: {
      [K in keyof TH]: string;
    }
  ) => keyof TH
) {
  const themeClassNames = {} as {
    [K in keyof TH]: string;
  };

  let themesString = "";

  function addTokens(theme: string) {
    let tokensString = "";

    for (const tokenGroup in themes[theme]) {
      for (const token in themes[theme][tokenGroup]) {
        if (!tokens[tokenGroup][token]) {
          throw new Error(
            'The token "' + tokenGroup + "." + token + '" does not exist'
          );
        }

        tokensString += `  --${tokenGroup}-${token}: ${
          themes[theme][tokenGroup]![token]
        };\n`;
      }
    }

    if (theme.startsWith("light")) {
      tokensString += "  color-scheme: light;\n";
    } else if (theme.startsWith("dark")) {
      tokensString += "  color-scheme: dark;\n";
    }

    return tokensString;
  }

  for (const theme in themes) {
    const themeClassName = `css-theme-${theme}`;

    themeClassNames[theme] = themeClassName;

    themesString += `.${themeClassName} {\n${addTokens(theme)}}\n\n`;
  }

  const style = React.createElement(
    "style",
    {
      href: "css-themes",
      precedence: "low",
    },
    themesString
  );

  const children = React.createElement(
    React.Fragment,
    {},
    React.createElement(
      "script",
      {},
      `
 const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

function setClassName(preferred) {
    const html = document.querySelector("html");
    const func = new Function(\`return ${cb.toString()}\`)
    const className = func()(preferred, ${JSON.stringify(themeClassNames)});

    for (const className in ${JSON.stringify(themeClassNames)}) {
        html.classList.remove(className);
    }

    html.classList.add(className);
}

mediaMatch.addEventListener("change", ({ matches }) => {
    if (matches) {
        setClassName("dark");
    } else {
        setClassName("light");
    }
});

setClassName(mediaMatch.matches ? "dark" : "light");            
            
`
    ),
    style
  );

  return [themeClassNames, children] as const;
}
