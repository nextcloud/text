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

module.exports = webpackConfig
