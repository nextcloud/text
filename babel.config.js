module.exports = {
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-classes',
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-transform-modules-commonjs'
	],
	presets: [
		[
			'@babel/preset-env',
			{
				corejs: 3,
				useBuiltIns: 'entry',
			},
		],
	],
	env: {
		test: {
			presets: [
				[
					"@babel/preset-env",
					{
						"targets": {
							"node": "current"
						}
					}
				]
			]
		}
	}
}

