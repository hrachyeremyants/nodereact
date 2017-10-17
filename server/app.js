const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')
const compress = require('compression')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express();
// const io = require('socket.io').listen(1313, 'http://localhost');
// io.set('origins', '*:*');
// io.set('origins', 'http://localhost:8080');
// io.configure(function () {
//     io.set("transports", ["xhr-polling"]);
//     io.set("polling duration", 10);
// });

const router = express.Router()
const paths = config.utils_paths
const mongoose = require('mongoose'),
    Chat = require('../api/models/chatModel'), //created model loading here
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017');
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('../api/routes/chatRoutes'); //importing route
routes(app); //register the route

// Apply gzip compression
app.use(compress())

// If no router match fallback to serve index.html
app.use(history())



// Apply Webpack HMR Middleware
// ----------------------------
if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    debug('Enable webpack dev')
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath  : webpackConfig.output.publicPath,
        contentBase : paths.client(),
        hot         : false,
        quiet       : config.compiler_quiet,
        noInfo      : config.compiler_quiet,
        lazy        : false,
        stats       : config.compiler_stats
    }))

    // Serve static assets from ~/src/static since Webpack is unaware of
    // these files. This middleware doesn't need to be enabled outside
    // of development since this directory will be copied into ~/dist
    // when the application is compiled.
    app.use(express.static(paths.client('static')))
} else {

    // Serving ~/dist by default. Ideally these files should be served by
    // the web server and not the app server, but this helps to demo the
    // server in production.
    app.use(express.static(paths.dist()))
}
module.exports = app;
