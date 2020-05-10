import webpack, {RuleSetRule} from 'webpack'
import projectConfig from "../config/project.config";

const {
  __DEV__,
  __TEST__,
  __PROD__
} = projectConfig

export const rules: Array<RuleSetRule> = [
  {
    test: /\.(js|ts|tsx|jsx)$/,
    use: 'babel-loader'
  },
  {
    test: /\.(js|ts|tsx|jsx)$/,
    enforce: 'pre',
    use: [
      {
        options: {
          eslintPath: require.resolve('eslint'),
          emitWarning: true,
        },
        loader: require.resolve('eslint-loader')
      }
    ],
    exclude: /node_modules/
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  },
  {
    test: /\.svg$/,
    include: [
      /src(\/|\\)assets/,
    ],
    use: [
      { loader: 'svg-sprite-loader' },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { removeTitle: false },
          ]
        }
      },
      { loader: 'svgo-loader' },
    ]
  }, {
    // SVG File Loader (for css/background urls)
    test: /\.svg$/,
    include: /src(\/|\\)assets(\/|\\)images/,
    loader : 'url-loader'
  }
]

export const definePlugin = new webpack.DefinePlugin(Object.assign({}, projectConfig, {
  __DEV__: JSON.stringify(__DEV__),
  __TEST__: JSON.stringify(__TEST__),
  __PROD__: JSON.stringify(__PROD__),
  __DEBUG__: JSON.stringify(__TEST__ || __DEV__)
}))
