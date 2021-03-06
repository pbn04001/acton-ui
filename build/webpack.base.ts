import webpack, {RuleSetRule} from 'webpack'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import projectConfig from '../config/project.config'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

export const rules: Array<RuleSetRule> = [
    {
        test: /\.(js|ts|tsx|jsx)$/,
        enforce: 'pre',
        use: [
            {
                options: {
                    eslintPath: require.resolve('eslint'),
                    emitWarning: true
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
            'sass-loader'
        ]
    },
    {
        test: /\.svg$/,
        include: [/src(\/|\\)assets/],
        use: [
            {loader: 'svg-sprite-loader'},
            {
                loader: 'svgo-loader',
                options: {
                    plugins: [{removeTitle: false}]
                }
            },
            {loader: 'svgo-loader'}
        ]
    },
    {
        // SVG File Loader (for css/background urls)
        test: /\.svg$/,
        include: /src(\/|\\)assets(\/|\\)images/,
        loader: 'url-loader'
    }
]

const definePlugin = new webpack.DefinePlugin(
    Object.keys(projectConfig).reduce((acc, key) =>
        ({...acc, [key]: JSON.stringify(projectConfig[key])}), {}))

const copyPlugin = new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../tomcat')
    },
    {
        from: path.resolve(__dirname, '../src/static')
    }
])

export const plugins = [definePlugin, copyPlugin, new CleanWebpackPlugin()]
