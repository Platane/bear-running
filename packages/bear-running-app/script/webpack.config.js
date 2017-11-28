const path = require('path')
const webpack = require('webpack')
const Visualizer = require('webpack-visualizer-plugin')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const BabiliPlugin = require('babili-webpack-plugin')

const production = 'production' === process.env.NODE_ENV

const createEnvVarArray = () => {
  const o = {}
  ;['NODE_ENV']
    .filter(name => name in process.env)
    .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`))

  return o
}

module.exports = {
  entry: {
    app: [
      path.join(__dirname, '../src/index.js'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[hash:6].js' : '[name].js',
    chunkFilename: 'static/[hash:8].[name].js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      react: 'preact',
      'react-dom': 'preact',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: /\.html?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html',
            },
          },
        ],
      },

      {
        test: /\.(eot|ttf|woff|otf|woff2|svg|gif|jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:6].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // this will produce a huge file, which now will refuse to process,
    // use for debug only
    false && new Visualizer(),

    !production && new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin(createEnvVarArray()),

    production && new webpack.optimize.ModuleConcatenationPlugin(),

    production &&
      new BabiliPlugin(
        {},
        {
          sourceMap: false,
          comments: false,
        }
      ),

    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ].filter(Boolean),

  devtool: 'source-map',

  devServer: {
    port: 8082,
    contentBase: false,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
