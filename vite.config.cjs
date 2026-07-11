const path = require("node:path");
const url = require("node:url");
const __dirname = path.dirname(url.pathToFileURL(__filename).href);

module.exports = {
  base: "./",
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: { host: true },
};
