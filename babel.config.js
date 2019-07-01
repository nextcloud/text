module.exports = {
	plugins: ['@babel/plugin-syntax-dynamic-import'],
	presets: [
		[
			'@babel/preset-env',
			{
				"modules": false
			}
		]
	],
	env: {
		test: {
			plugins: ["transform-es2015-modules-commonjs"]
		}
	}
}

