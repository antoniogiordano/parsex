/**
 * Created by AntonioGiordano on 04/01/16.
 */

var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [{
  entry: {
    common: ['react', 'react-dom'],
    'dashboard': './lib/views/dashboard/injector.js'
  },
  output: {
    path: path.join(__dirname, 'public', 'js', 'bundles'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.scss/,
        // loaders: ["css", "sass"]
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader')
      },
      {
        test: /\.less$/,
        // loaders: ["css", "sass"]
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less-loader')
      }
    ]
  },
  exclude: [ /joi-browser/ ],
  resolve: {
    fallback: path.join(__dirname, 'node_modules'),
    packageAlias: 'browser'
  },
  resolveLoader: { fallback: path.join(__dirname, 'node_modules') },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.NormalModuleReplacementPlugin(/^(net|dns)$/, path.resolve(__dirname, 'src/server/shim.js'), path.resolve(__dirname, 'node_modules')),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    })
  ]
}]
