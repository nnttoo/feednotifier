//var nodeExternals = require('webpack-node-externals'); 
resolve = require('path').resolve 
module.exports = {
    target: "node",
    externals: ['electron'],
    entry: "./src",
    optimization: {
        minimize: true
      },
    output: {
        path: resolve('../output/'),
        publicPath: '',
        filename: 'bundle.js'
    } ,

    node: {
        global: false,
        __filename: false,
        __dirname: false,
      }
};