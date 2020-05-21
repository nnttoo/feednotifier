//var nodeExternals = require('webpack-node-externals'); 
resolve = require('path').resolve 
module.exports = {
    target: "node",
    externals: ['electron'],
    entry: {
      bundle: './src/index.js',
    },
    optimization: {
        minimize: true
      },
    output: {
        path: resolve('../output/'),
        publicPath: '',
        filename: '[name].js'
    } ,

    node: {
        global: false,
        __filename: false,
        __dirname: false,
      }
};