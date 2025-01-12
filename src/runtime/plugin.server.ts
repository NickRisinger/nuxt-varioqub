import { defineNuxtPlugin, useState, useRuntimeConfig, useRoute, useCookie } from '#imports';

interface Answer {
	flags: Record<string, string[]>;
	i: string;
	experiments: string;
	testids: number[];
}

export default defineNuxtPlugin(async () => {
	const state = useState('varioqubState', () => ({
		flags: {},
		experiments: '',
		testids: [],
	}));
	const config = useRuntimeConfig();
	const route = useRoute();

	const { clientId, cookieName, clientFeatures } = config.public.varioqub;

	const icookie = useCookie(cookieName);

	const response = await $fetch<Answer>('https://uaas.yandex.ru/v1/exps', {
		query: {
			client_id: `metrika.${clientId}`,
			url: route.fullPath,
			i: icookie.value,
			client_feature: clientFeatures,
		},
		retry: 0,
	});

	icookie.value = response.i;

	state.value.flags = response.flags;
	state.value.experiments = response.experiments;
	state.value.testids = response.testids;
});
