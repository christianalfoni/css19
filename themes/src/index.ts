import * as React from "react";

type ThemeValues = Record<string, Record<string, string>>;

type Tokens = Record<string, Record<string, string>>;

type Theme = {
  colorScheme: ColorScheme;
  isDefault: boolean;
  values: ThemeValues;
};

type ColorScheme = "light" | "dark";

export function ThemesProvider<T extends Record<string, Theme>>({
  themes,
  setTheme,
  children,
}: {
  themes: T;
  setTheme: (
    themes: {
      [K in keyof T]: string;
    },
    preferred: ColorScheme
  ) => string;
  children: React.ReactNode;
}) {
  return React.useMemo(() => {
    const themeClassNames = {} as any;

    let themesString = "";

    function addTokens(theme: Theme) {
      let tokensString = "";

      for (const tokenGroup in theme.values.values) {
        for (const token in themes.values[tokenGroup]) {
          tokensString += `  --${tokenGroup}-${token}: ${
            theme.values[tokenGroup]![token]
          };\n`;
        }
      }

      if (theme.colorScheme === "light") {
        tokensString += "  color-scheme: light;\n";
      } else {
        tokensString += "  color-scheme: dark;\n";
      }

      return tokensString;
    }

    for (const themeName in themes) {
      const themeClassName = `css-theme-${themeName}`;

      themeClassNames[themeName] = themeClassName;

      const theme = themes[themeName];

      if (theme.isDefault) {
        themesString += `:root {\n${addTokens(theme)}}\n\n`;
      } else {
        themesString += `html[data-theme="${themeClassName}"] {\n${addTokens(
          theme
        )}}\n\n`;
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

    return React.createElement(
      React.Fragment,
      {},
      React.createElement(
        "script",
        {},
        `
   const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
  
  function setClassName(preferred) {
      const html = document.querySelector("html");
      const func = new Function(\`return ${setTheme.toString()}\`)
      const className = func()(${JSON.stringify(themeClassNames)}, preferred);
  
      html.setAttribute("data-theme", className);
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
      style,
      ...(Array.isArray(children) ? children : [children])
    );
  }, Object.values(themes));
}

export function createTheme<T extends ThemeValues>(
  colorScheme: ColorScheme,
  themeValues: T
): [Theme, Tokens];
export function createTheme<T extends Tokens>(
  tokens: T,
  colorScheme: ColorScheme,
  themeValues: {
    [K in keyof T]?: {
      [U in keyof T[K]]?: string;
    };
  }
): Theme;
export function createTheme(...args: any[]) {
  if (args.length === 2) {
    const themeValues = args[1];
    const tokenVariables = {} as any;

    for (const tokenGroup in themeValues) {
      for (const token in themeValues[tokenGroup]) {
        if (!tokenVariables[tokenGroup]) {
          tokenVariables[tokenGroup] = {} as any;
        }

        tokenVariables[tokenGroup][token] = `var(--${tokenGroup}-${token})`;
      }
    }

    return [
      {
        colorScheme: args[0],
        isDefault: true,
        values: themeValues,
      },
      tokenVariables,
    ];
  }

  return {
    colorScheme: args[1],
    isDefault: false,
    values: args[2],
  };
}
