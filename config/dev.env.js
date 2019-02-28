const merge = require('webpack-merge')
const prodEnv = require('./pro.env')

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
})
