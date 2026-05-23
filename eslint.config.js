import { defineConfig, globalIgnores } from 'eslint/config';
import { recommended } from '@nextcloud/eslint-config'
import pluginCypress from 'eslint-plugin-cypress'
import eslintConfigPrettier from "eslint-config-prettier/flat"

export default defineConfig(
	...recommended,
	eslintConfigPrettier,
	globalIgnores(["src/tests/fixtures/*"]),
	{
		files: ['cypress/**/*.js'],
		extends: [
			pluginCypress.configs.globals,
		],
	},
	{
		name: 'vitest-globals',
		files: ['src/tests/**'],
		languageOptions: {
			globals: {
				describe: "readonly",
				expect: "readonly",
				it: "readonly",
				test: "readonly",
			},
		},
	},
)
