const MiniCssExtractPlugin = require('mini-css-extract-plugin');

resolve = require('path').resolve 
module.exports = {
    /** agar require electon bisa bekerja */
    externals: ['electron'],
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
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"]                       

                    }
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
    target : 'electron-renderer',
    entry: "./srcjs",
    optimization: {
        minimize: true
    },
    output: {
        path: resolve('../output/views/webpack'),
        publicPath: '',
        filename: 'mypage.js'
    } 
};