const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', // entrada archivo de primera lectura
  output: {
    path: path.resolve(__dirname, 'dist'), //dirección de salida dist de distribution
    filename: 'main.js', // build.js
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // expresión regular ve si inicia con m o con js
        exclude: /node_modules/, // no queremos que caiga nuestra aplicación
        use: {
          loader: 'babel-loader', // usa el loader de babel
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [ 
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: './assets/images'
        }
      ]
    })
  ]
}