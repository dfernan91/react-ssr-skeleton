const
    path = require('path'),
    webpack = require('webpack'),
    Dotenv = require('dotenv-webpack'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    srcDir = path.join(__dirname, '../src');

module.exports = [
    {
        name: 'client',
        mode: 'development',
        target: "web",
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=client&reload=true', "@babel/polyfill", `${srcDir}/client.js`],
        output: {
            filename: "client.js",
            publicPath: "/dist/",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        "babel-loader",
                        "eslint-loader"
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: 'css-hot-loader?cssModule=true',
                        },
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [path.resolve(__dirname, '../src/App/App/_style/module')]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            /*
            * npm install mini-scc-extract-plugin
            *
            * this plugin extracts css into separate files.
            * it create a css file per js file which contains css.
            * it supports on-Demand-Loading of css and sourceMaps.
            *
            * Compared to the extract-text-webpack-plugin:
            *   .Async loading
            *   .no duplicate compilation(performance))
            *   .Easier to use
            *   .Specific to Css
            *
            * */
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            /*
            * npm install dotenv and dotenv-webpack
            *
            * A secure webpack plugin that supports dotenv and other environment
            * variables and only exposes what you choose and use
            * */
            new Dotenv({
                path: path.resolve(process.cwd(), '.env.development'),
            }),
            /*
            * Add hot reloading plugin for enable hot reloading in your webpack
            * this plugin for webpack hot middle ware
            * */
            new webpack.HotModuleReplacementPlugin()
        ]
    },
    {
        name: 'server',
        mode: 'development',
        target: 'node',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=server&reload=true', '@babel/polyfill', `${srcDir}/server.js`],
        output: {
            filename: 'server.js',
            libraryTarget: "commonjs2",
            publicPath: "/dist/",
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use: [
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            /*
                            * npm install isomorphic-style-loader
                            *
                            * css style loader for webpack thath works similarly
                            * to style-loader but is optimized for critical path css rendering
                            * and also works great in the context of isomorphic apps .
                            * */

                            loader: "isomorphic-style-loader",
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed',
                                includePaths: [path.resolve(__dirname, '../src/App/App/_style/module')]
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            /*
            * Add hot reloading plugin for enable hot reloading in your webpack
            * this plugin for webpack hot middle ware
            * */
            new webpack.HotModuleReplacementPlugin()
        ]
    }
];

