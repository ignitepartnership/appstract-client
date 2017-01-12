var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(process.env.NODE_ENV);
module.exports = {

    target:'electron',
    //context:'./',
    entry: "./src/main.ts",
    output: {
        path: path.join(__dirname, "../dist"),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    devtool: 'eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            environment: {
                dev:false
            },
            template: 'electron/prod/index.html'
        }),

        //this passes the webpack run env to JS
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev') // default value if not specified
            }
        }),
        new CopyWebpackPlugin([
            // {dist}/file.txt
            { from: 'electron/prod/main.js' },
            { from: 'electron/prod/package.json' },
            { from :'electron/prod/IconTemplate.png'},
            { from: 'electron/prod/IconTemplate@2x.png'}
            ])

    ],

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    module: {
        noParse: ['ws'],
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts-loader','angular2-template-loader']
            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.(html|css)$/,
                loader: 'raw-loader',
                exclude: [path.resolve(__dirname, 'index.html'), path.resolve(__dirname, 'electron/index.html'), path.resolve(__dirname, 'electron/dev.html')]

            },
        ]
    },
    externals: ['ws']


};
