const express = require('express');
const opn = require('opn');
const app = express();
const webpack = require('webpack');
const config = require('./../webpack/webpack.development.config');
const compiler = webpack(config);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotSeverMiddleware= require('webpack-hot-server-middleware');
const customSetup = require('./customSetup');

/**
 * npm install webpack-dev-middleware
 *
 * an express-style development middleware for use with webpack bundles and allows for serving of the
 * files emitted frm webpack . this should be used for development only
 *
 * some of the benefits of using this middleware include:
 *
 *  .No files are written to disk , rather it handles files in memory
 *  .if files changed in watch mode , the middleware delays requests until compiling has completed.
 *  .support hot module reload(HMR).
 */

app.use(webpackDevMiddleware(compiler,{
    serverSideRender : true,
    publicPath : '/dist/',
}));


/*
* npm install webpack-hot-middleware
*
* Client Hot Update
* Webpack hot reloading using only webpack-dev-middleware
* This allows you to add hot reloading into an existing server without webpack-dev-server
*
* */

app.use(webpackHotMiddleware(
   compiler.compilers.find(compiler=>compiler.name === 'client')
));


/*
* npm install webpack-hot-server-middleware
*
* Server Hot Update
* webpack Hot Server Middleware is designed to be used in conjunction
* */

app.use(webpackHotSeverMiddleware(compiler));


/**
* define port for running server
* @type {*|number}
* */

const PORT = process.env.port || 3000;

app.listen(PORT,error=>{
    if(error){
        return console.error('Development Express Error : ', error , '\n-----------------------');
    }
    else{

        /*
        * npm install opn
        * Open project in browser
        * */
        opn(`http://localhost:${PORT}`);
        console.log(`Development Express Server running at http://localhost:${PORT}`)
    }
});