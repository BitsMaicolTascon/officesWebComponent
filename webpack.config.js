const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const folderName = "components";

module.exports = (env) => {
  const CONFIGPATH = path.resolve(
    __dirname,
    folderName,
    env.component,
    "config.json"
  );
  const CONFIG = require(CONFIGPATH);

  return {
    devtool: false,
    devServer: {
      contentBase: path.join(__dirname, folderName), // Ruta a la carpeta de archivos estáticos
     
    },
    entry: {
      [env.component]: path.resolve(
        __dirname,
        folderName,
        env.component,
        "src",
        `${env.component}.js`
      ),
    },
    mode: "development",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, folderName, env.component, "dist"),
      filename: `[name]-v${CONFIG.version}.js`,
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, folderName),
        mocks: path.resolve(__dirname, "mocks"),
        images: path.resolve(__dirname, folderName, env.component,  "assets", "images"),
      },
    },
    module: {
      rules: [
        {
          test: /\.css|\.s(c|a)ss$/,
          use: [
            {
              loader: "lit-scss-loader",
              options: {
                minify: true, // defaults to false
              },
            },
            "extract-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          include: path.resolve(__dirname, "mocks"),
        },
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: [/node_modules/],
        },
        {
          test: /\.c?js$/,
          resolve: {
            fullySpecified: false, // disable the behaviour
          },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "Custom template",
        template: path.resolve(__dirname, "index.html"),
        filename: "./index.html",
        templateParameters: CONFIG,
        inject: "head",
        hash: true,
      }),
    ],
  };
};



