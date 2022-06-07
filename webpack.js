const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.entry = {
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
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
	defaultVendors: {
		test(module) {
			return module.resource && module.resource.includes(`${path.sep}node_modules${path.sep}`) &&
				!module.resource.includes(`${path.sep}highlight.js${path.sep}`)
		},
		name: 'vendors',
	}
}

webpackConfig.resolve.modules = [
	path.resolve(__dirname, 'node_modules'),
	'node_modules'
]

module.exports = webpackConfig
