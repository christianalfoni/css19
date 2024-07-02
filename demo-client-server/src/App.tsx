import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { globalStyle } from "./globalCss";
import { ThemesProvider, createTheme } from "@css19/themes";
import { css } from "@css19/css";

const [light, variables] = createTheme("light", {
  colors: {
    primary: "royalblue",
  },
});

const dark = createTheme(variables, "dark", {
  colors: {
    primary: "yellow",
  },
});

const logoCss = css({
  height: "6em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemesProvider
      themes={{ dark, light }}
      setTheme={(themes, preferred) => themes[preferred]}
    >
      {globalStyle}
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={viteLogo}
            css={{
              ...logoCss,
              "&:hover": {
                filter: "drop-shadow(0 0 2em #646cffaa)",
              },
            }}
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            css={{
              ...logoCss,
              "&:hover": {
                filter: "drop-shadow(0 0 2em #61dafbaa)",
              },
              "@media (prefers-reduced-motion: no-preference)": {
                animation: "logo-spin infinite 20s linear",
              },
            }}
            alt="React logo"
          />
        </a>
      </div>
      <h1
        css={{
          color: variables.colors.primary,
          textDecoration: "ligh-dark(underline, none)",
        }}
      >
        Vite + React
      </h1>
      <div
        css={{
          padding: "2em",
        }}
      >
        <button
          css={{
            backgroundColor: count % 2 === 0 ? "royalblue" : "tomato",
          }}
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p
        css={{
          color: "#888",
        }}
      >
        Click on the Vite and React logos to learn more
      </p>
    </ThemesProvider>
  );
}

export default App;
