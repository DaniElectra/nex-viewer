import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// @ts-expect-error - `@vitejs/plugin-vue` is installed but TypeScript says it can't find its types for some reason
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	main: {
		plugins: [externalizeDepsPlugin()],
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/main/index.ts')
			},
			outDir: 'dist/main'
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src')
			}
		}
	},
	preload: {
		plugins: [externalizeDepsPlugin()],
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/preload/index.ts')
			},
			outDir: 'dist/preload'
		}
	},
	renderer: {
		root: resolve(__dirname, 'src/electron/renderer'),
		build: {
			rollupOptions: {
				input: resolve(__dirname, 'src/electron/renderer/index.html')
			},
			outDir: resolve(__dirname, 'dist/renderer')
		},
		plugins: [vue()],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'),
				'@renderer': resolve(__dirname, 'src/electron/renderer/src')
			}
		}
	}
});
