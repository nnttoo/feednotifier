resolve = require('path').resolve 
module.exports = {
    target: "node",
    externals: ['express','electron',{'body-parser': 'bodyparser'}],
    entry: {
      main: './srcelectron/index.js',
      internalServer: './src/index.js',
    }, 
    optimization: {
        minimize: false
      },
    output: {
        path: resolve('../output/'),
        publicPath: '',
        filename: 'bundle[name].js'
    } ,

    node: {
        global: false,
        __filename: false,
        __dirname: false,
      }
};