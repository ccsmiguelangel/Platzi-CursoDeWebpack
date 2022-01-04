const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    })
  ]

}