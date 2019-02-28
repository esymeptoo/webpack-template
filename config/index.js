const path = require('path')

module.exports = {
  dev: {
    // 静态资源的位置
    assetsSubDirectory: 'static',
    // index.html中访问静态资源的前缀
    assetsPublicPath: '/',
    // 代理
    proxyTable: {},

    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    // lint
    useEslint: true,
    showEslintErrorsInOverlay: false,

    devTool: 'cheap-module-source-map',

    cacheBusting: true,
    cssSourceMap: true,
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    // 生产环境文件打包的根目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 资源的目录
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    productionSourceMap: true,
    devTool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report,
  },
}
