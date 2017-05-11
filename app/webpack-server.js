const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack-config.debug')({});
console.log(config);

let target = 'http://localhost:' + config.devServer.devServerPort;

const nodeArguments = process.argv.slice(2);
if (nodeArguments.length > 0) {
    target = 'https://' + nodeArguments[0];
    targetHost = nodeArguments[0];
    console.log("Proxying to " + target);
}

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
}).listen(config.devServer.devHotReloadPort, 'localhost', function resultCb(listenErr) {
    if (listenErr) {
        console.error(listenErr);
    }
    console.log('Listening at localhost:' + config.devServer.devHotReloadPort);
});
