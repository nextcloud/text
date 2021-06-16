const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('@nextcloud/webpack-vue-config')

webpackConfig.entry = {
	text: path.join(__dirname, 'src', 'main.js'),
	files: path.join(__dirname, 'src', 'files.js'),
	public: path.join(__dirname, 'src', 'public.js'),
	viewer: path.join(__dirname, 'src', 'viewer.js'),
}

webpackConfig.output.chunkFilename = '[name].js?v=[contenthash]'
webpackConfig.optimization.splitChunks.chunks = 'all'
Object.assign(webpackConfig.optimization.splitChunks, {
	cacheGroups: {
		highlight: {
			enforce: true,
			test: /[\\/]node_modules[\\/](hightlight\.js)[\\/]/,
		},
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			reuseExistingChunk: true
		}
	}
})

console.log(webpackConfig)

module.exports = webpackConfig
