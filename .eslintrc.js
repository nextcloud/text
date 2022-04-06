module.exports = {
	root: true,
	extends: [
		'@nextcloud',
	],
	settings: {
		'import/resolver': {
			webpack: { config: './webpack.js' },
		},
	},
	rules: {
		/* Turn off node checks for import resolution.
		 * Let eslint-plugin-import handle this.
		 * It knows how to use resolvers.
		 *
		 * See https://github.com/mysticatea/eslint-plugin-node/issues/249#issuecomment-747980937
		 */
		'node/no-missing-import': 'off',
	},
}
