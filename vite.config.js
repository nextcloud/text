import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import commonjs from 'vite-plugin-commonjs'
import { dependencies } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), commonjs],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/package.js'),
			name: '@nextcloud/text',
			fileName: (_format) => 'index.js',
			formats: ['es'],
		},
		rollupOptions: {
			external: Object.keys(dependencies),
			output: {
				globals: { vue: 'Vue' },
			},
		},
		minify: false,
	},
})
