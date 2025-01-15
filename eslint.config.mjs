import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
	features: {
		tooling: true,
		typescript: true,
		stylistic: {
			indent: 'tab',
			semi: true,
		},
	},
});
