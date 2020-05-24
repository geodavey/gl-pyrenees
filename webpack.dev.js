const resolve = require("path").resolve;
const HtmlWebPackPlugin = require("html-webpack-plugin");

const BABEL_CONFIG = {
  presets: ["@babel/env", "@babel/react"]
};

const config = {
  mode: "development",

  devServer: {
    disableHostCheck: true,
    index: "index.html",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  entry: "./src/map.js",

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        include: [resolve(".")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: BABEL_CONFIG,
          },
        ],
      },
      {
        // enable SASS loading
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // enable CSS loading
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // JSON loading + geoJSON
        test: /\.geojson$/,
        use: ["json-loader"],
      },
    ],
  },

  plugins: [new HtmlWebPackPlugin()],
};

module.exports = config;
