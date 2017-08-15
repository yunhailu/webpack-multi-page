var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var defineArg = args.define;
var Config = require('../src/' + defineArg + '/config');


var PROJ_ROOT = path.resolve(__dirname, '../');

var options = {
    entry: {},
    output: {
        path: path.resolve(PROJ_ROOT, 'dist'),
        publicPath: '/',
        filename: 'static/[name].js',
        chunkFilename: 'static/[id].[name].js'
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'static/[name].[ext]'
            }
        }, {
            test: /\.css$/,
            include: path.resolve(__dirname, '../src'),
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            include: path.resolve(__dirname, '../src'),
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(html|mst)$/,
            include: path.resolve(__dirname, '../src'),
            use: ['html-loader']
        }]
    },
    plugins: []
}

for(var i = 0, len = Config.pages.length; i < len; i++){
    var pageName = Config.pages[i].name,
        pageOutput = Config.pages[i].output,
        pageTemplate = Config.pages[i].template,
        pageEntry = Config.pages[i].entry;
    options.entry[pageName] = './src/' + Config.name + '/' + pageEntry;
    options.plugins.push(new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/' + Config.name + '/' + pageOutput),
            template: './src/' + Config.name + '/' + pageTemplate,
            chunks: ['manifest', 'vendor', pageName],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        }));
}
options.entry = Object.assign({}, {
    vendor: Config.vendor
}, options.entry);


module.exports = options;
