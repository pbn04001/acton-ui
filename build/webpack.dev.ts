const HtmlWebPackPlugin = require('html-webpack-plugin')
const { rules, plugins } = require('./webpack.base')
const path = require('path')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  path: path.resolve(__dirname, '../dist')
})

module.exports = (env: any) => {
  return {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [path.resolve(__dirname, '../src'), 'node_modules']
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: env?.LOCAL_DEV ? '/' : '',
      filename: 'bundle.js'
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        {
          test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /node_modules/
        },
        ...rules
      ]
    },
    plugins: [htmlPlugin, ...plugins],
    devServer: {
      openPage: 'actonui',
      historyApiFallback: {
        rewrites: [{ from: /./, to: '/index.html' }]
      },
      inline: true,
      port: 8081,
      proxy: {
        '/acton/': {
          target: 'http://localhost'
        },
        '/actonui/': {
          target: 'http://localhost:8081',
          pathRewrite: {
            '/actonui': ''
          }
        }
      }
    }
  }
}
