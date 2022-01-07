const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const { SquooshPlugin } = require("squoosh-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js', // entrada archivo de primera lectura
  output: {
    path: path.resolve(__dirname, 'dist'), //dirección de salida dist de distribution
    filename: '[name].[contenthash].js', // build.js
    assetModuleFilename: 'assets/images/[name].[contenthash][ext]'
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, "src/utils/"),
      '@templates': path.resolve(__dirname, "src/templates/"),
      '@styles': path.resolve(__dirname, "src/styles/"),
      '@images': path.resolve(__dirname, "src/assets/images/"),
    }
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
      },
      {
        test: /\.png/,
        type: 'asset/resource',
        // generator: {
        //   filename: 'assets/images/[hash][ext][query]'
        //   // filename: 'assets/images/[name].[ext]'
        // }  
      },
      {
        test: /\.(woff|woff2)$/,
        // use: {
        //   loader: 'url-loader',
        //   options: {
        //     limit: 10000,
        //     mimetype: "application/font-woff",
        //     name: "[name].[ext]",
        //     outputPath: './assets/fonts/',
        //     publicPath: '../assets/fonts/',
        //     esModule: false
        //   }
        // }
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',  // Directorio de salida
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin(
      {filename: 'assets/[name].[contenthash].css'}
    ),
    // new CopyPlugin({
    //   patterns: [ 
    //     {
    //       from: path.resolve(__dirname, "src", "assets/images"),
    //       to: './assets/images'
    //     }
    //   ]
    // }),
    // new SquooshPlugin({
    //   include: /\.(jpeg|jpg|png)$/,
    //   outDir: path.resolve(__dirname, "src", "assets/images"),
    //   codec: 'webp',
    //   encoderOptions: {
    //     quality: 65,
    //   },
    // }),
    new Dotenv(),
    new CleanWebpackPlugin(),

  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}