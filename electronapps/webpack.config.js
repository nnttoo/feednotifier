//var nodeExternals = require('webpack-node-externals'); 
resolve = require('path').resolve 
module.exports = {
    target: "node",
    externals: ['electron','express'],
    entry: "./src",
    optimization: {
        minimize: true
      },
    output: {
        path: resolve('../output/'),
        publicPath: '',
        filename: 'bundle.js'
    } 
};