import { defineStore } from 'pinia';
import { ref } from 'vue';

export type PromptMultiChoice = {
	label: string;
	symbol: Symbol;
};

export type PromptMultiOptions = {
	choices: PromptMultiChoice[];
	message?: string;
};

export const usePromptStore = defineStore('prompt', () => {

	const options = ref<PromptMultiOptions | null>(null);
	const resolver = ref<((value: Symbol) => void) | null>(null);
	function promptMulti(opts: PromptMultiOptions) {
		return new Promise<Symbol>((resolve, reject) => {
			if (resolver.value !== null) {
				reject('tried to prompt when another prompt was in progress');
				return;
			}
			options.value = opts;
			resolver.value = (symbol: Symbol) => {
				resolver.value = null;
				resolve(symbol);
			};
		});
	}

	return {
		options,
		promptMulti,
		resolver,
	};

});