import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import {rules, definePlugin} from './webpack.base'

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

const config = {
  mode: 'production',
  entry: './src/index.tsx',
  optimization: {
    minimize: true
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      ...rules
    ]
  },
  plugins: [htmlPlugin, definePlugin]
}

export default config
