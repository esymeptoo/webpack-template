const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const portfinder = require('portfinder')
const config = require('../config')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')

const HOST = process.env.HOST
const PORT = process.env.PORT

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // 配置css-loader 包含style-loader、postcss-loader、less-loader、scss-loader
    rules: utils.styleLoaders({ sourceMap: config.dev.sourceMap, usePostCSS: true })
  },
  devtool: config.dev.devTool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html'),
        },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warning: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    // 定义全局的常量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      }
    ]),
  ],
})

// 检查port是否可用 寻找可用的port
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
