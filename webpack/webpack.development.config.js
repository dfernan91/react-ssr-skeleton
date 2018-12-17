const path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    srcDir = path.join(__dirname, '../src');

module.exports = [
    {
        name: 'client',
        mode: 'development',
        target: 'web',
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
                    exclude: /(node_module[\\\/])/,
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
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            /*
            * Add hot reloading plugin for enable hot reloading in your webpack
            * this plugin for webpack hot middle ware
            * */
            new webpack.HotModuleReplacementPlugin()
        ]
    },
    {
        name : 'server',
        mode:'development',
        target: 'node',
        devtool: 'source-map',
        entry: ['webpack-hot-middleware/client?name=server&reload=true', '@babel/polyfill' , `${srcDir}/server.js`],
        output: {
            filename: 'server.js',
            libraryTarget: "commonjs2",
            publicPath: "/dist/",
        },
        module: {
            rules: [
                {
                    test : /\.js$/,
                    exclude: /(node_modules[\\\/])/,
                    use:[
                        'babel-loader',
                        'eslint-loader'
                    ]
                },
                {
                    test:/\.(css|scss)$/,
                    use:[
                        {
                            loader: "isomorphic-style-loader",
                        },
                        {
                            loader: "css-loader",
                            options:{
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "sass-loader",
                            options:{
                                sourceMap: true,
                                outputStyle:'compressed',
                                includePaths:[path.resolve(__dirname, '../src/App/App/_style/module')]
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

