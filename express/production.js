import serverRender from "../src/server";

const
    express = require('express'),
    path = require('path'),
    app = express(),
    ClientStatsPath = path.join(__dirname, './../dist/stats.json'),
    ServerRenderPath = path.join(__dirname, './../dist/server.js'),
    ServerRenderer = require(ServerRenderPath).default,
    Stats = require(ClientStatsPath);


/*
* loading project files when built with webpack
* */
app.use('/dist', express.static(path.join(__dirname, '../dist')));


/**
 * loading server script ==> server.js in server side rendering react js
 *
 * */
app.use(serverRender(stats));


/*
* running server
* */

const PORT = process.env.PORT || 9090;
app.listen(PORT, '0.0.0.0', error => {
    if (error)
        return console.error('production Express Error', error, '\n----------------------------------------');
    else
        console.log(`production Express server running at port ${PORT}`);
});