const path = require('path');
import webpack, {Configuration} from "webpack";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env): Configuration => ({
    entry: "./client/src/index.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/client/dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ['style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: {
                        localIdentName: '[name]__[local]___[hash:base64:5]',
                      },
                    },
                  }],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./client/dist/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": env.production || !env.development,
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version)
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}" // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        })
    ]
});

export default webpackConfig;