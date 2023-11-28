const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('@nextcloud/webpack-vue-config')
const webpackRules = require('@nextcloud/webpack-vue-config/rules')

webpackConfig.entry = {
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
	editors: path.join(__dirname, 'src', 'editor.js'),
	init: path.join(__dirname, 'src', 'init.js'),
}

webpackConfig.output.chunkFilename = '[id].js?v=[contenthash]'

// The app name `text` in appinfo
// and the package name `@nextcloud/text in package.json differ.
// webpack-vue-config reads the app name from package.json.
// But for bundling we need the one from appinfo.
// Can be removed after merge of
// https://github.com/nextcloud/webpack-vue-config/pull/338

const appName = 'text'

Object.assign(webpackConfig.output, {
	publicPath: path.join('/apps/', appName, '/js/'),
	filename: `${appName}-[name].js?v=[contenthash]`,
	devtoolNamespace: appName,
	devtoolModuleFilenameTemplate(info) {
		const rootDir = process.cwd()
		const rel = path.relative(rootDir, info.absoluteResourcePath)
		return `webpack:///${appName}/${rel}`
	},
})

webpackConfig.optimization.chunkIds = 'named'
webpackConfig.optimization.splitChunks.cacheGroups = {
	mermaid: {
		test: /[\\/]node_modules[\\/](mermaid)[\\/]/,
		name: 'mermaid',
	},
}
webpackConfig.optimization.splitChunks.minSize = 102400

// Fix Buffer issues
webpackConfig.plugins.push(new webpack.ProvidePlugin({
	Buffer: ['buffer', 'Buffer'],
}))
webpackConfig.resolve.fallback = {
	buffer: require.resolve('buffer'),
}

// Load raw SVGs to be able to inject them via v-html
webpackRules.RULE_ASSETS.test = /\.(png|jpe?g|gif|woff2?|eot|ttf)$/
webpackRules.RULE_RAW_SVGS = {
	test: /@mdi\/svg/,
	type: 'asset/source',
}

webpackConfig.module.rules = Object.values(webpackRules)

module.exports = webpackConfig
