const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');

module.exports = {
    entry: './src/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                },
                'postcss-loader']
        },
        {
            test: /\.(woff|woff2|ttf|eot)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                }
            }
        },
        {
            test: /\.(jpg|jpeg|png|gif|svg|webp|ico)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: './images/[name].[ext]'
                }
            }
        }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          })
    ]
}