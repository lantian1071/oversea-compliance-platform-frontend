import { build } from "vite";

// Inline config to avoid config file bundling issues
await build({
  configFile: false,
  base: "./",
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});

console.log("Build complete!");
