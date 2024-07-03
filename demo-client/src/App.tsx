import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createTheme, createThemesProvider } from "@css19/themes";

const tokens = {
  colors: {
    primary: "orange",
  },
};

const light = createTheme("light", tokens, {});
const dark = createTheme("dark", tokens, {
  colors: {
    primary: "royalblue",
  },
});

const [variables, ThemesProvider, useThemes] = createThemesProvider(
  {
    light,
    dark,
  },
  (themes, preference) => themes[preference]
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemesProvider>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1
        css={{
          color: variables.colors.primary,
        }}
      >
        Vite + React
      </h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Test />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ThemesProvider>
  );
}

function Test() {
  const themes = useThemes();

  return (
    <div className={themes.themes.light}>
      <h1
        css={{
          color: variables.colors.primary,
        }}
      >
        Hello {themes.current}
      </h1>
    </div>
  );
}

export default App;
