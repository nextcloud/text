/**
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import browserslistConfig from '@nextcloud/browserslist-config'
import { defineConfig } from '@rspack/cli'
import {
	CssExtractRspackPlugin,
	DefinePlugin,
	LightningCssMinimizerRspackPlugin,
	ProgressPlugin,
	SwcJsMinimizerRspackPlugin,
} from '@rspack/core'
import NodePolyfillPlugin from '@rspack/plugin-node-polyfill'
import browserslist from 'browserslist'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { VueLoaderPlugin } from 'vue-loader'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// browserslist-rs does not support baseline queries yet
// Manually resolving the browserslist config to the list of browsers with minimal versions
// See: https://github.com/browserslist/browserslist-rs/issues/40
const browsers = browserslist(browserslistConfig)
const minBrowserVersion = browsers
	.map((str) => str.split(' '))
	.reduce((minVersion, [browser, version]) => {
		minVersion[browser] = minVersion[browser]
			? Math.min(minVersion[browser], parseFloat(version))
			: parseFloat(version)
		return minVersion
	}, {})
const targets = Object.entries(minBrowserVersion)
	.map(([browser, version]) => `${browser} >=${version}`)
	.join(',')

/** @type {import('@rspack/cli').RspackConfigFn} */
const config = (env) => {
	const appName = process.env.npm_package_name
	const appVersion = process.env.npm_package_version

	const mode =
		(env.development && 'development')
		|| (env.production && 'production')
		|| process.env.NODE_ENV
		|| 'production'
	const isDev = mode === 'development'
	process.env.NODE_ENV = mode

	console.info('Building', appName, appVersion, '\n')

	return {
		target: 'web',
		mode,
		devtool: isDev ? 'cheap-source-map' : 'source-map',

		entry: {
			text: path.join(__dirname, 'src', 'main.js'),
			files: path.join(__dirname, 'src', 'files.ts'),
			public: path.join(__dirname, 'src', 'public.js'),
			viewer: path.join(__dirname, 'src', 'viewer.js'),
			editor: path.join(__dirname, 'src', 'editor.js'),
			init: path.join(__dirname, 'src', 'init.js'),
		},

		output: {
			path: path.resolve('./js'),
			filename: `${appName}-[name].js?v=[contenthash]`,
			chunkFilename: `${appName}-[name].js?v=[contenthash]`,
			// Set publicPath via __webpack_public_path__
			publicPath: 'auto',
			assetModuleFilename: '[name][ext]?v=[contenthash]',
			clean: true,
			devtoolNamespace: appName,
			// Make sure sourcemaps have a proper path and do not leak local paths
			devtoolModuleFilenameTemplate(info) {
				const rootDir = process.cwd()
				const rel = path.relative(rootDir, info.absoluteResourcePath)
				return `webpack:///${appName}/${rel}`
			},
		},

		devServer: {
			hot: true,
			host: '127.0.0.1',
			port: 3000,
			allowedHosts: ['host.docker.internal', 'localhost', 'nextcloud.local'],
			client: {
				overlay: false,
			},
			devMiddleware: {
				writeToDisk: true,
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		},

		optimization: {
			chunkIds: 'named',
			splitChunks: {
				automaticNameDelimiter: '-',
				cacheGroups: {
					defaultVendors: {
						reuseExistingChunk: true,
					},
					// Make the emoji related dependencies a custom chunk
					'emoji-picker': {
						test: /[\\/]node_modules[\\/](emoji-mart-vue|emoji-datasource)/,
						name: 'emoji-picker',
						chunks: 'async',
						priority: 20,
					},
				},
			},
			minimize: !isDev,
			minimizer: [
				new SwcJsMinimizerRspackPlugin({
					minimizerOptions: {
						targets,
					},
				}),
				new LightningCssMinimizerRspackPlugin({
					minimizerOptions: {
						targets,
					},
				}),
			],
		},

		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						experimentalInlineMatchResource: true,
					},
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: CssExtractRspackPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									auto: true,
									localIdentName: isDev
										? '[path][name]__[local]'
										: '[hash:base64]',
									exportLocalsConvention: 'camelCase',
								},
								url: {
									filter: (url) => {
										// Let rspack handle absolute paths and data URLs
										return (
											!url.startsWith('/')
											&& !url.startsWith('data:')
										)
									},
								},
							},
						},
					],
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: CssExtractRspackPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									auto: true,
									localIdentName: isDev
										? '[path][name]__[local]'
										: '[hash:base64]',
									exportLocalsConvention: 'camelCase',
								},
								url: {
									filter: (url) => {
										// Let rspack handle absolute paths and data URLs
										return (
											!url.startsWith('/')
											&& !url.startsWith('data:')
										)
									},
								},
							},
						},
						{
							loader: 'resolve-url-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								sassOptions: {
									includePaths: [path.resolve(__dirname)],
								},
							},
						},
					],
				},
				{
					test: /\.ts$/,
					exclude: [/node_modules/],
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
							},
						},
						env: {
							targets,
						},
					},
					type: 'javascript/auto',
				},
				{
					test: /\.(png|jpe?g|gif|svg|webp)$/i,
					type: 'asset',
				},
				{
					test: /\.(woff2?|eot|ttf|otf)$/i,
					type: 'asset/resource',
				},
				{
					resourceQuery: /raw/,
					type: 'asset/source',
				},
			],
		},

		plugins: [
			new ProgressPlugin(),

			new VueLoaderPlugin(),

			new NodePolyfillPlugin(),

			new DefinePlugin({
				appName: JSON.stringify(appName),
				appVersion: JSON.stringify(appVersion),
				// Vue 2 compile time flags
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: false,
			}),

			new CssExtractRspackPlugin({
				filename: `../css/${appName}-[name].css?v=[contenthash]`,
				chunkFilename: `../css/${appName}-[name].css?v=[contenthash]`,
				ignoreOrder: true,
			}),
		],

		resolve: {
			extensions: ['*', '.ts', '.js', '.vue', '.json'],
			symlinks: false,
			extensionAlias: {
				'.js': ['.js', '.ts'],
			},
			alias: {
				vue$: 'vue/dist/vue.runtime.esm.js',
				'@': path.resolve(__dirname, 'src'),
			},
			fallback: {
				fs: false,
			},
		},

		cache: true,
	}
}

export default defineConfig(config)
