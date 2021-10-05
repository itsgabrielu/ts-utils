import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: {
    "graph/directed": "src/graph/directed/index.ts",
  },
  output: {
    dir: "dist",
    entryFileNames: "[name].js",
    format: "es",
    preserveModules: false, // Keep directory structure and files
    preserveModulesRoot: "src",
    sourcemap: false,
  },
  plugins: [resolve({ browser: false }), json(), typescript()],
};
