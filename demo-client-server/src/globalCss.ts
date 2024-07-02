import { globalCss } from "@css19/css";

export const globalStyle = globalCss({
  ":root": {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    lineHeight: 1.5,
    fontWeight: 400,
    colorScheme: "light dark",
    color: "rgba(255, 255, 255, 0.87)",
    backgroundColor: "#242424",
    fontSynthesis: "none",
    textRendering: "optimizeLegibility",
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  "#root": {
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "2rem",
    textAlign: "center",
  },

  "@keyframes logo-spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },

  a: {
    fontWeight: 500,
    color: "#646cff",
    textDecoration: "inherit",
    "&:hover": {
      color: "#535bf2",
    },
  },

  body: {
    margin: 0,
    display: "flex",
    placeItems: "center",
    minWidth: "320px",
    minHeight: "100vh",
  },

  h1: {
    fontSize: "3.2em",
    lineHeight: 1.1,
  },
  button: {
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    fontSize: "1em",
    fontWeight: 500,
    fontFamily: "inherit",
    backgroundColor: "#1a1a1a",
    cursor: "pointer",
    transition: "border-color 0.25s",
    "&:hover": {
      borderColor: "#646cff",
    },
    "&:focus,&:focus-visible": {
      outline: "4px auto -webkit-focus-ring-color",
    },
  },
  "@media (prefers-color-scheme: light)": {
    ":root": {
      color: "#213547",
      backgroundColor: "#ffffff",
    },
    "a:hover": {
      color: "#747bff",
    },
    button: {
      backgroundColor: "#f9f9f9",
    },
  },
});
