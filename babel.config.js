const babelConfig = require('@nextcloud/babel-config')

const resolvePlugin = ["module-resolver", {
	"alias": {
		"@nextcloud/text-editor": "./package",
	}
}]

babelConfig.presets[0][1].modules = 'auto'
babelConfig.plugins = [
	...babelConfig.plugins,
	resolvePlugin,
]

module.exports = babelConfig
