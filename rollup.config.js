import postcss from "rollup-plugin-postcss";
import postcssImport from 'postcss-import';
import url from "rollup-plugin-url";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.js",
  output: [
    {
      dir: "build/",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    external({ includeDependencies: true }),
    resolve(),
    postcss({
      plugins: [postcssImport()]
    }),
    json(),
    babel({
      presets: ["@babel/env", "@babel/react"],
      exclude: "node_modules/**",
    }),
    commonjs(),
    url({
      include: ["**/*.woff2", "**/*.png"],
      limit: Infinity,
    }),
  ],
  external: ["react", "react-dom"],
};
