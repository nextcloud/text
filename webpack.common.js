const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		text: path.join(__dirname, 'src', 'main.js'),
		files: path.join(__dirname, 'src', 'files.js'),
		public: path.join(__dirname, 'src', 'public.js'),
		viewer: path.join(__dirname, 'src', 'viewer.js'),
	},
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: '[name].js',
		chunkFilename: '[name].js?v=[contenthash]',
		jsonpFunction: 'textWebpackJsonp'
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				exclude: /node_modules/,
				use: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new StyleLintPlugin({
			files: ['src/**/*.vue', 'src/**/*.scss', 'src/**/*.css']
		}),
		new CleanWebpackPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json'],
		modules: [
			path.resolve(__dirname, 'node_modules'),
			'node_modules'
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				highlight: {
					test: /[\\/]node_modules[\\/](hightlight\.js)[\\/]/,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					reuseExistingChunk: true
				}
			}
		}
	}
};
