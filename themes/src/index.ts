import * as React from "react";

type Variables = Record<string, Record<string, string>>;

type ColorScheme = "light" | "dark";

type Theme = {
  colorScheme: ColorScheme;
  variables: Variables;
  overrides: Variables;
};

function InlineScript({ id, src }: { id: string; src: string }) {
  const isBrowser = typeof document !== "undefined";
  const hasInjectedScript = isBrowser && document.querySelector("#" + id);
  const wasScriptInjected = React.useRef(hasInjectedScript);

  // With server side rendering we will get an executable inline script,
  // but when only rendering on client that script will not execute.
  if (isBrowser && !wasScriptInjected.current) {
    if (!hasInjectedScript) {
      const script = document.createElement("script");
      script.innerHTML = src;
      script.id = id;
      document.head.appendChild(script);
    }

    return null;
  }

  return React.createElement(
    "script",
    {
      id,
    },
    src
  );
}

export type ThemesContext = {
  current: string;
  themes: Record<string, string>;
  update(): void;
};

const themesContext = React.createContext(null as ThemesContext);

export function createThemeProvider<T extends Theme>(theme: T) {
  const variableReferences = {} as any;

  for (const variableGroup in theme.variables) {
    for (const variable in theme.variables[variableGroup]) {
      if (!variableReferences[variableGroup]) {
        variableReferences[variableGroup] = {} as any;
      }
      variableReferences[variableGroup][
        variable
      ] = `var(--${variableGroup}-${variable})`;
    }
  }

  function ThemesProvider({ children }) {
    const style = React.useMemo(() => {
      let rootVariables = ":root {\n";

      for (let variableGroup in theme.variables) {
        for (let variable in theme.variables[variableGroup]) {
          rootVariables += `  --${variableGroup}-${variable}: ${
            theme.overrides[variableGroup]?.[variable] ??
            theme.variables[variableGroup][variable]
          };\n`;
        }
      }

      rootVariables += "}\n";

      return React.createElement(
        "style",
        {
          href: "css-theme",
          precedence: "low",
        },
        rootVariables
      );
    }, []);

    return React.createElement(
      React.Fragment,
      {},
      style,
      ...(Array.isArray(children) ? children : [children])
    );
  }

  return [variableReferences, ThemesProvider] as [
    T["variables"],
    React.FunctionComponent<{ children: React.ReactNode }>
  ];
}
export function createThemesProvider<T extends Record<string, Theme>>(
  themes: T,
  setTheme: (
    themes: {
      [K in keyof T]: string;
    },
    preferred: ColorScheme
  ) => string
) {
  // Since all themes pass in the same default variables, we go through and verify
  // they are the same and at the same time keep a reference to this singleton
  let variables;

  for (let theme in themes) {
    if (variables && themes[theme].variables !== variables) {
      throw new Error("You have themes that are extending different variables");
    }
    variables = themes[theme].variables;
  }

  const variableReferences = {} as any;

  for (const variableGroup in variables) {
    for (const variable in variables[variableGroup]) {
      if (!variableReferences[variableGroup]) {
        variableReferences[variableGroup] = {} as any;
      }
      variableReferences[variableGroup][
        variable
      ] = `var(--${variableGroup}-${variable})`;
    }
  }

  function ThemeProvider({ children }) {
    const [style, script, value] = React.useMemo(() => {
      function getThemeClassNames() {
        const themeClassNames = {} as any;

        for (const theme in themes) {
          const themeClassName = `css-theme-${theme}`;

          themeClassNames[theme] = themeClassName;
        }

        return themeClassNames;
      }

      // First we collect all the overrides to identify what variables needs
      // to be part of all themes and what are considered common variables
      const allOverrides = {};

      for (let theme in themes) {
        for (let overrideGroup in themes[theme].overrides) {
          if (!allOverrides[overrideGroup]) {
            allOverrides[overrideGroup] = {};
          }
          for (let override in themes[theme].overrides[overrideGroup]) {
            allOverrides[overrideGroup][override] = true;
          }
        }
      }

      let commonVariables = ":root {\n";

      for (let variableGroup in variables) {
        for (let variable in variables[variableGroup]) {
          if (allOverrides[variableGroup]?.[variable]) {
            continue;
          }

          commonVariables += `  --${variableGroup}-${variable}: ${variables[variableGroup][variable]};\n`;
        }
      }

      commonVariables += "}\n\n";

      const themeClassNames = getThemeClassNames();
      let themeVariables = "";

      for (let theme in themes) {
        // We always add the theme CSS with the color scheme and potentially any overrides
        themeVariables += `html[data-css-theme="${themeClassNames[theme]}"], .${themeClassNames[theme]} {
    color-scheme: ${themes[theme].colorScheme};\n`;
        // We go through all variables that is overridden
        for (let overrideGroup in allOverrides) {
          for (let override in allOverrides[overrideGroup]) {
            // Then we choose the specific override for this theme, or grab it from the default variables. This
            // prevents an active theme with a certain override to override the defaults when nesting a theme override
            themeVariables += `  --${overrideGroup}-${override}: ${
              themes[theme].overrides[overrideGroup]?.[override] ??
              variables[overrideGroup][override]
            };\n`;
          }
        }
        themeVariables += "}\n\n";
      }

      const style = React.createElement(
        "style",
        {
          href: "css-themes",
          precedence: "low",
        },
        commonVariables + themeVariables
      );

      const script = React.createElement(InlineScript, {
        id: "css-media-watcher",
        src: `const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");
  
  function setClassName(preferred) {
      const html = document.querySelector("html");
      const func = new Function(\`return ${setTheme.toString()}\`)
      const theme = func()(${JSON.stringify(themeClassNames)}, preferred);
  
      html.setAttribute("data-css-theme", theme);
  }
  
  mediaMatch.addEventListener("change", ({ matches }) => {
      if (matches) {
          setClassName("dark");
      } else {
          setClassName("light");
      }
  });
  
  setClassName(mediaMatch.matches ? "dark" : "light");            
  `,
      });

      return [
        style,
        script,
        {
          get current() {
            return document
              .querySelector("html")
              .getAttribute("data-css-theme");
          },
          get themes() {
            return getThemeClassNames();
          },
          update() {
            const mediaMatch = window.matchMedia(
              "(prefers-color-scheme: dark)"
            );

            setTheme(
              getThemeClassNames(),
              mediaMatch.matches ? "dark" : "light"
            );
          },
        },
      ] as const;
    }, []);

    return React.createElement(
      themesContext.Provider,
      {
        value,
      },
      style,
      script,
      ...(Array.isArray(children) ? children : [children])
    );
  }

  return [
    variableReferences,
    ThemeProvider,
    () => React.useContext(themesContext),
  ] as [
    T[keyof T]["variables"],
    React.FunctionComponent<{ children: React.ReactNode }>,
    () => {
      current: keyof T;
      themes: {
        [K in keyof T]: string;
      };
      update(): void;
    }
  ];
}

export function createTheme<T extends Variables>(
  colorScheme: ColorScheme,
  variables: T,
  overrides: {
    [K in keyof T]?: {
      [U in keyof T[K]]?: string;
    };
  }
): Theme {
  return {
    colorScheme,
    variables,
    overrides,
  };
}

/*
 const variableReferences = {} as any;

  for (const variableGroup in variables) {
    for (const variable in variables[variableGroup]) {
      if (!variableReferences[variableGroup]) {
        variableReferences[variableGroup] = {} as any;
      }
      variableReferences[variableGroup][
        variable
      ] = `var(--${variableGroup}-${variable})`;
    }
  }

  const themeReferences = {} as any;

  for (let theme in themes) {
    const colorScheme = themes[theme].colorScheme;

    delete themes[theme].colorScheme;

    themeReferences[theme] = {
      colorScheme,
      variables,
      overrides: themes[theme],
    };
  }

  return [themeReferences, variableReferences];
}
*/
