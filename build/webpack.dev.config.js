var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
//var Config = require('../../config');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var defineArg = args.define;
//var proj = Config[defineArg];
var Config = require('../src/' + defineArg + '/config');

console.log(JSON.stringify(Config));

var options = {
    output: {
        publicPath: '/Mzhuanzhuan/zzembed/' + Config.name.toLocaleLowerCase() + '/',
        pathinfo: true
    },
    // cheap-module-eval-source-map is faster for development
    devtool: '#cheap-module-eval-source-map',
    devServer: {
        //https: true,
        noInfo: true,
        historyApiFallback: true,
        disableHostCheck: true,
        publicPath: '/Mzhuanzhuan/zzembed/' + Config.name.toLocaleLowerCase() + '/',
        quiet: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
}

module.exports = merge(baseWebpackConfig, options);
