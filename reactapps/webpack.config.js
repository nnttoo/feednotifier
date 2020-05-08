const MiniCssExtractPlugin = require('mini-css-extract-plugin');

resolve = require('path').resolve 
module.exports = {
    plugins: [new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            } 
        ]
    },
    entry: "./srcjs",
    output: {
        path: resolve('../output/views/'),
        publicPath: '',
        filename: 'js/mypage.js'
    } 
};