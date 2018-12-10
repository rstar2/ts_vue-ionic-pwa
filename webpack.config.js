/* eslint-env node, commonjs */

require('dotenv').config();

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// use the updated plugin because:
// webpack < v4.0.0 currently contains v0.4.6 of this plugin under webpack.optimize.UglifyJsPlugin as an alias
// but it cannot minify ES6 code
// 1. One solution is to explicitly pass all used npm modules through the 'babel-loader' before - but this is ugly
// 2. Second is to use the updated version of the UglifyJsPlugin plugin that support ES6 minification
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 'dotenv' wrapper - load the .env
const Dotenv = require('dotenv-webpack');

// Glob the entries dynamically/programmatically
const mainFiles = require('glob').sync('./src/**/main.js');
const entries = mainFiles.reduce((acc, mainFile) => {
    const name = path.basename(path.dirname(mainFile));
    acc[name] = mainFile;
    return acc;
}, {});

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'build.[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ],
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': 'vue-style-loader!css-loader!less-loader',
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        // 'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    }
                    // other vue-loader options go here
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
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
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
    },
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader',
        },
    },
    devServer: {
        // webpack output is served from /dist/
        // publicPath: '/dist/',
        // Content not from webpack is served from ./public, ./assets
        // contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'assets')],

        historyApiFallback: true,
        noInfo: true,
        overlay: true,
    },
    performance: {
        hints: false,
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin('build.[name].css'),

        new Dotenv({
            // path: './some.other.env', // load this now instead of the ones in '.env'
            // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            // silent: true // hide any errors
        }),
    ],
};

module.exports.plugins = (module.exports.plugins || []).concat(
    Object.keys(entries).map(function (id) {

        const mainFile = entries[id];
        let indexHtml = path.resolve(mainFile, '..', 'index.html');
        if (!fs.existsSync(indexHtml)) {
            indexHtml = './src/index.html';
        }

        return new HtmlWebpackPlugin({
            chunks: ['common', id],
            filename: id + '.html',
            template: indexHtml,
            title: entries[id]
        });
    })
);


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        // this old version of the plugin cannot minify ES6
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     compress: {
        //         warnings: false,
        //         comparisons: false,  // this is needed otherwise mapboxgl.js is not working with devtool = '#source-map'
        //     }
        // }),
        new UglifyJsPlugin({
            sourceMap: true,

        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ]);

}
