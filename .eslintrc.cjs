module.exports = {
	root: true,
	extends: [
		'@nextcloud',
		'@nextcloud/eslint-config/typescript',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['off'],
	}
}
