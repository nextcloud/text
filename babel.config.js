const babelConfig = require('@nextcloud/babel-config')

babelConfig.presets[0][1].modules = 'auto'

module.exports = babelConfig
