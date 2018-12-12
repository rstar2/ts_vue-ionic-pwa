/* eslint-env node, commonjs */

require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 'dotenv' wrapper - load the .env
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        'main': './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'build.[name].js',
    },
    module: {
        rules: [
            // typescript
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },

            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            // publicPath: '../'
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': 'vue-style-loader!css-loader!less-loader',
                        // 'scss': 'vue-style-loader!css-loader!sass-loader',
                        // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'assets/',
                }
            },
            {
                test: /\.(eot|woff|ttf|svg|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    outputPath: 'assets/',
                }
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        },
        extensions: ['.ts', '.js', '.vue', '.json', '.css'],
    },
    resolveLoader: {
        // alias: {
        //     'scss-loader': 'sass-loader',
        // },
    },
    performance: {
        hints: false,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'build.[name].css',
        }),

        new Dotenv({
            // path: './some.other.env', // load this now instead of the ones in '.env'
            // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true // hide any errors
        }),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Vue Ionic PWA',
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                removeComments: true
            },
        }),
    ],
};

if (process.env.NODE_ENV === 'production') {
    module.exports.mode = 'production';
    module.exports.devtool = 'source-map';

    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);
} else {
    module.exports.mode = 'development';
    module.exports.devtool = 'inline-source-map';
    module.exports.devServer = {
        contentBase: './dist',
        // webpack output is served from /dist/
        // publicPath: '/dist/',
        // Content not from webpack is served from ./public, ./assets
        // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],

        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    };
}

