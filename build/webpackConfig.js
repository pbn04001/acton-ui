const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__  = NODE_ENV === 'development',
    __TEST__ = NODE_ENV === 'test',
    __PROD__ = NODE_ENV === 'production'

const rules = [
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

const definePlugin = new webpack.DefinePlugin(Object.assign({}, {
    __DEV__: JSON.stringify(__DEV__),
    __TEST__: JSON.stringify(__TEST__),
    __PROD__: JSON.stringify(__PROD__),
    __DEBUG__: JSON.stringify(__TEST__ || __DEV__)
}))

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    path: path.resolve(__dirname, '../dist'),
})

const config = {
    mode: 'development',
    entry: './src/index.tsx',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
    plugins: [
        htmlPlugin,
        definePlugin,
    ],
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

module.exports = config
