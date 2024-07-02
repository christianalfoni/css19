import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  ThemesProvider,
  createDefaultTheme,
  createTheme,
  useThemes,
} from "@css19/themes";

const [light, variables] = createDefaultTheme("light", {
  colors: {
    primary: "orange",
  },
});

const dark = createTheme(variables, "dark", {
  colors: {
    primary: "royalblue",
  },
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemesProvider
      themes={{ light, dark }}
      setTheme={(themes, preferred) => themes[preferred]}
    >
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
