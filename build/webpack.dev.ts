import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import {rules, plugins } from './webpack.base'
import path from "path"

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  path: path.resolve(__dirname, '../dist'),
})

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },{
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
      },
      ...rules
    ]
  },
  plugins: [htmlPlugin, ...plugins],
  devServer: {
    openPage: 'actonui',
    historyApiFallback: true,
    inline: true,
    port: 8081,
    proxy: {
      '/acton/' : {
        target: 'http://localhost',
      },
      '/actonui/' : {
        target: 'http://localhost:8081',
        pathRewrite: {
          '/actonui' : ''
        }
      }
    }
  }
}

export default config
