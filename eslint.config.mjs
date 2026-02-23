import eslintConfig from '@pretendonetwork/eslint-config';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintPluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default tseslint.config(
	{ ignores: ['**/node_modules', '**/dist', '**/out', 'scripts/*'] },
	...eslintConfig,
	eslintPluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				extraFileExtensions: ['.vue'],
				parser: tseslint.parser
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.{ts,mts,tsx,vue}'],
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json'
				}
			}
		},
		rules: {
			'import/no-unresolved': 'error',
			'vue/require-default-prop': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/block-lang': [
				'error',
				{
					script: {
						lang: 'ts'
					}
				}
			],
			'vue/html-indent': ['error', 'tab']
		}
	},
	{
		files: ['**/*.vue'],
		rules: {
			'vue/max-attributes-per-line': 'off',
			'vue/singleline-html-element-content-newline': 'off'
		}
	}
);
