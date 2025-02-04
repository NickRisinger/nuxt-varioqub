import { defineNuxtModule, createResolver, addPlugin, addImports } from '@nuxt/kit';
import defu from 'defu';

export interface ModuleOptions {
	clientId: number;
	cookieName?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	clientFeatures?: any;
	mode?: 'all' | 'server' | 'client';
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'nuxt-varioqub',
		configKey: 'varioqub',
	},
	defaults: {
		cookieName: '_ymab_param',
		clientFeatures: {},
		mode: 'server',
	},
	setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);

		nuxt.options.runtimeConfig.public.varioqub = defu(
			nuxt.options.runtimeConfig.public.varioqub,
			options,
		);

		if (!options.clientId) {
			return;
		}

		addPlugin({
			src: resolver.resolve('./runtime/plugin.server.ts'),
			mode: 'server',
		});

		addImports({
			name: 'useVarioqub',
			from: resolver.resolve('./runtime/composables/useVarioqub'),
		});
	},
});
