import * as React from "react";

type Variables = Record<string, Record<string, string>>;

type ColorScheme = "light" | "dark";

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

export function ThemeProvider({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) {
  const style = React.useMemo(() => {
    return React.createElement(
      "style",
      {
        href: "css-themes",
        precedence: "low",
      },
      `:root {
${theme}
}`
    );
  }, [theme]);

  return React.createElement(
    React.Fragment,
    {},
    style,
    ...(Array.isArray(children) ? children : [children])
  );
}

export type ThemesContext = {
  current: string;
  themes: Record<string, string>;
  setTheme(): void;
};

const themesContext = React.createContext(null as ThemesContext);

export function useThemes() {
  return React.useContext(themesContext);
}

export function ThemesProvider<T extends Record<string, string>>(props: {
  themes: T;
  setTheme: (
    themes: {
      [K in keyof T]: string;
    },
    preferred: ColorScheme
  ) => string;
  children: React.ReactNode;
}) {
  function getThemeClassNames() {
    const themeClassNames = {} as any;

    for (const theme in props.themes) {
      const themeClassName = `css-theme-${theme}`;

      themeClassNames[theme] = themeClassName;
    }

    return themeClassNames;
  }

  const [script, style] = React.useMemo(() => {
    const themeClassNames = getThemeClassNames();
    let themesString = "";

    for (const theme in themeClassNames) {
      themesString += `html[data-css-theme="${themeClassNames[theme]}"], .${themeClassNames[theme]} {\n  ${props.themes[theme]}}\n\n`;
    }

    const style = React.createElement(
      "style",
      {
        href: "css-themes",
        precedence: "low",
      },
      themesString
    );

    const script = React.createElement(InlineScript, {
      id: "css-media-watcher",
      src: `const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

function setClassName(preferred) {
    const html = document.querySelector("html");
    const func = new Function(\`return ${props.setTheme.toString()}\`)
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

    return [script, style];
  }, Object.values(props.themes));

  return React.createElement(
    themesContext.Provider,
    {
      value: {
        get current() {
          return document.querySelector("html").getAttribute("data-css-theme");
        },
        get themes() {
          return getThemeClassNames();
        },
        setTheme() {
          const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

          props.setTheme(
            getThemeClassNames(),
            mediaMatch.matches ? "dark" : "light"
          );
        },
      },
    },
    style,
    script,
    ...(Array.isArray(props.children) ? props.children : [props.children])
  );
}

export function createTheme<T extends Variables>(
  colorScheme: ColorScheme,
  variables: T
): [string, T];
export function createTheme<T extends Variables>(
  fromVariables: T,
  colorScheme: ColorScheme,
  variables: {
    [K in keyof T]?: {
      [U in keyof T[K]]?: string;
    };
  }
): string;
export function createTheme(...args: any[]) {
  if (args.length === 2) {
    const colorScheme = args[0];
    const variables = args[1];
    const variableReferences = {} as any;

    let css = `color-scheme: ${colorScheme};\n`;

    for (const variableGourp in variables) {
      for (const variable in variables[variableGourp]) {
        if (!variableReferences[variableGourp]) {
          variableReferences[variableGourp] = {} as any;
        }
        variableReferences[variableGourp][
          variable
        ] = `var(--${variableGourp}-${variable})`;
        css += `--${variableGourp}-${variable}: ${variables[variableGourp][variable]};\n`;
      }
    }

    return [css, variableReferences];
  }

  const variablesFrom = args[0];
  const colorScheme = args[1];
  const variables = args[2];

  let css = `color-scheme: ${colorScheme};\n`;

  for (const variableGroup in variables) {
    for (const variable in variables[variableGroup]) {
      if (!variablesFrom[variableGroup][variable]) {
        throw new Error(
          'The variable "' + variableGroup + "." + variable + '" does not exist'
        );
      }

      css += `--${variableGroup}-${variable}: ${variables[variableGroup][variable]};\n`;
    }
  }

  return css;
}
