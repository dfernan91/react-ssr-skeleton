const
    path = require('path'),
    webpack = require('webpack'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    StatsPlugin = require('stats-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    Dotenv = require('dotenv-webpack'),
    distDir = path.join(__dirname , '../dist'),
    srcDir = path.join(__dirname, '../src');

module.exports= [
    {
        name : 'client',
        target: 'web',
        entry: ["@bable/polyfill" , `${srcDir}/client.js`],
        /*
        * These option allows you to control how webpack notifies you of assets
        * and entry points that exceed a specific file limit.
        * Configure how performance hints are shown . for example if you have an asset
        * that is over 250lb, webpack will emit a warning notifying you of this.
        *
        * Performance.hints
        * false | "error" | "warning"
        *
        * */
        performance:{hints: false},
        output: {
            path: distDir,
            filename: 'client.js',
            publicPath: distDir
        },
        module:{
            rules: [
                {
                    test : /\.js$/,
                    exclude: /(node_module[\\\/])/,
                    use:[
                        {
                            loader: "babel-loader"
                        }
                    ]
                },
                {
                    test : /\.(css|scss)$/,
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options:{
                                importLoaders : 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options:{
                                outputStyle : 'compressed',
                                includePaths:[path.resolve(__dirname,'../src/App/App/_style/module')]
                            }
                        }
                    ]

                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename : 'style.css'
            }),
            //
            new Dotenv({
                path : path.resolve(process.cwd(),'.env.production'),
            }),
            /*
            * A webpack plugin to remove/clean your build folders before building
            * */
            new CleanWebpackPlugin(['dist'],{

                //Absolute path to your webpack root folder
                //default : root of yout package
                root : process.cwd(),

                //write logs to console
                verbose : true,

                //use boolean true to test/emulate delete . (will not remove files).
                dry : false
            }),

            /*
            * Order the modules and chunks by occurrence .
            * This saved space, because often referenced modules and chunks get smaller ids.
            * */
            new webpack.optimize.OccurrenceOrderPlugin(),
        ],
    },
    {
        name : 'server',
        target: 'node',
        mode:'production',
        devtool: 'source-map',
        performance:{hints : false},
        entry:['@babel/polyfill', `${srcDir}/server.js`],
        output: {
            path: distDir,
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: distDir,
        },
        module: {
            rules: [
                {
                    test : /\.js$/,
                    exclude: /(node_module[\\\/])/,
                    use:[
                        {
                            loader: 'babel-loader',
                        }
                    ]
                },
                {
                    test : 'css-loader',
                    options: {
                        /*
                        * The option importLoaders allows you to configure how many loaders
                        * before css-loader should be applied to @import ed resources
                        *   . 0 => no loaders(default)
                        *   . 1 => sass-loader
                        *   . 2 => sass-loader and ...-loader
                        * */
                        importLoaders : 1
                    }
                },
                {
                    loader: 'sass-loader',
                    options:{
                        outputStyle : 'compressed',
                        includePaths : [path.resolve(__dirname , '../src/App/App/_style/module')]
                    }
                }
            ]
        },
        plugins: [
            /*
            * npm i optimize-css-assets-webpack-plugin
            *
            * it will search for css assets during the webpack build and will optimize / minimize
            * the css (by default it uses cssnano but a custom css processor can be specified).
            * */
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {discardComments : {removeAll : true}}
            }),

            /*
            * npm install --save-dev webpack-stats-plugin
            *
            * This plugin will ingest the webpack stats object , process/ transform the object and
            * write out to a file for further consumption.
            *
            * */
            new StatsPlugin('stats.json',{
                chunkModuleIds: true,
                modules : true,
                chunks: true,
                exclude: [/node_module[\\\/]react/],
            }),
        ]
    }
];




