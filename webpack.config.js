const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const cssName = devMode ? 'styles.css' : 'styles-[hash].css';
const jsName = devMode ? 'main.js' : 'main-[hash].js';

let plugins = [
    new MiniCssExtractPlugin({ filename: cssName }) 
];

module.exports = {
    entry: './frontend/src/index.js',
    plugins,
    output: {
        path: `${__dirname}/frontend/static/frontend`,
        filename: jsName
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: [/node_modules/, /static/],
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? 'styles-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
};
