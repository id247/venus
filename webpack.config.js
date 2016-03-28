'use strict';

var webpack = require("webpack");
var path = require('path');

var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

module.exports = {
    cache: true,
    entry: {
        //'webpack-dev-server/client?http://localhost:9000',
        //'webpack/hot/dev-server',
        local: './src/js/local',
        dnevnik: './src/js/dnevnik',
        mosreg: './src/js/mosreg'
    },
    //devtool: "eval",
    output: {
        path: __dirname + '/public/assets/js',
        filename: "[name].js",
        publicPath: __dirname + '/public/assets/js',
        pathinfo: true
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extentions: ['', '.js'],
        alias: {
          'react': pathToReact,
          'react-dom': pathToReactDOM
        }
    },

    module: {
        noParse: [
           ///\/node_modules\/react/,
           pathToReact,
           //pathToReactDOM
        ],
        loaders: [
            {   test: /\.js$/, 
                //exclude: /node_modules/, 
                include: [
                    __dirname + '/src/js'
                ], 
                loader: "babel?optional[]=runtime&stage=2",
                // query: {
                //     presets: ['es2015'],
                //     plugins: ['transform-object-assign']
                // }
            }
        ]
    },
    plugins: [      
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV : JSON.stringify("development") 
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: true,
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};

