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
)
