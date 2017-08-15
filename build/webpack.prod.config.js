var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var baseWebpackConfig = require('./webpack.base.config');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var defineArg = args.define;
var config = require('../src/' + defineArg + '/config');

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.resolve(__dirname, '../dist/' + config.name),
        // publicPath: "//j2.58cdn.com.cn/zhuanzhuan/zzembed/zzdownload/",
        publicPath: "//j2.58cdn.com.cn/zhuanzhuan/zzembed/" + config.name.toLocaleLowerCase() + '/',
        filename: 'static/[name].[chunkhash:7].js',
        chunkFilename: 'static/[id].[chunkhash:7].js'
    },
    devtool: '#source-map',
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin(['dist/' + config.name], { root: path.resolve(__dirname , '..'), verbose: true}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false
            },
            comments: false
        })
    ]
});