import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import vue from 'rollup-plugin-vue'

export default {
	input: 'src/package.js',
	output: {
		file: 'dist/index.js',
		format: 'esm',
	},
	plugins: [
		commonjs(),
		nodeResolve(),
		scss({
			output: 'dist/text.min.css',
			outputStyle: 'compressed',
		}),
		vue({
			css: false,
		}),
	],
};
