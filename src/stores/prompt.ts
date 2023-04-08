import { defineStore } from 'pinia';
import { ref } from 'vue';

export type PromptChoice = {
	text: string; // Visible text for the choice
	id?: number; // Optional ID for triggering a callback
};

export type ChoicePromptOptions = {
	choices: PromptChoice[];
	message?: string;
};

export const usePromptStore = defineStore('prompt', () => {
	// These options will change every time a new prompt is created via choicePrompt()
	const options = ref<ChoicePromptOptions | null>(null);

	// When a choice prompt is created, this will contain the callback to run on resolution of the promise
	const resolver = ref<((value: PromptChoice) => void) | null>(null);

	// Use this to create a choice prompt
	// Note: only one choice prompt can exist at any time
	function choicePrompt(opts: ChoicePromptOptions) {
		return new Promise<PromptChoice>((resolve, reject) => {
			if (resolver.value !== null) {
				reject('tried to prompt when another prompt was in progress');
				return;
			}
			options.value = opts;
			resolver.value = (choice: PromptChoice) => {
				resolver.value = null;
				resolve(choice);
			};
		});
	}

	return {
		// Only meant to be used by the AppPrompt component
		options,
		resolver,

		// Public utility function for creating a choice prompt
		choicePrompt,
	};
});
