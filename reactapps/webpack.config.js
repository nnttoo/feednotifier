const MiniCssExtractPlugin = require('mini-css-extract-plugin');

resolve = require('path').resolve 
module.exports = {
    plugins: [new MiniCssExtractPlugin({
        filename: 'main.css',
    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                  ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                }]
            },
        ]
    },
    entry: "./srcjs",
    output: {
        path: resolve('../output/views/webpack'),
        publicPath: '',
        filename: 'mypage.js'
    } 
};