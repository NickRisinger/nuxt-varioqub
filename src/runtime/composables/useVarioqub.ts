import { useState } from '#imports';

type VarioqubState = {
	flags: Record<string, string[]>;
	experiments: string;
	testids: Array<number>;
};

export function useVarioqub() {
	const state = useState<VarioqubState>('varioqubState', () => ({
		flags: {},
		experiments: '',
		testids: [],
	}));

	const hasFlag = (flag: string) => {
		return [state.value.flags[flag] !== undefined, state.value.flags[flag]] as const;
	};

	return {
		hasFlag,
		experiments: state.value.experiments,
		testids: state.value.testids,
	};
};
