module.exports = {
	root: true,
	extends: [
		'@nextcloud',
	],
	settings: {
		'import/resolver': {
			webpack: {
				config: 'webpack.js'
			},
			node: {
				paths: ['src'],
				extensions: ['.js', '.vue'],
			},
		},
	},
}
