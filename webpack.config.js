/* eslint-disable no-undef */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PrettierWebpackPlugin = require("prettier-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    devtool: "source-map",
    entry: "./src/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
        new PrettierWebpackPlugin({ tabWidth: 4 }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        contentBase: "./dist",
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
};
