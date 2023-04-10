import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import conversationsData from '../assets/conversations.json';
import * as zod from 'zod';

export type PromptChoice = {
	text: string;
	result: string | ChoicePromptOptions;
};

export type ChoicePromptOptions = {
	choices: PromptChoice[];
	message?: string;
	title?: string;
};

interface Prompt {
	message: string;
	title?: string;
	choices: { text: string; result: string | Prompt }[];
}

const zPrompt: zod.ZodType<Prompt> = zod.lazy(() =>
	zod.object({
		message: zod.string(),
		title: zod.string().optional(),
		choices: zod.array(
			zod.object({
				text: zod.string(),
				result: zod.union([zod.string(), zPrompt]),
			}),
		),
	}),
);
const zConversationData = zod.array(
	zod.object({
		name: zod.string(),
		title: zod.string().optional(),
		prompt: zPrompt,
	}),
);

export const usePromptStore = defineStore('prompt', () => {
	const conversations: { [name: string]: () => Promise<string> } = {};
	zConversationData.parse(conversationsData).forEach((conversation) => {
		conversations[conversation.name] = () => {
			return new Promise((resolve) => {
				(async function converse(prompt: ChoicePromptOptions): Promise<string> {
					const { result } = await choicePrompt(prompt);
					if (typeof result === 'string') return result;
					return converse(result);
				})(conversation.prompt).then(resolve);
			});
		};
	});
	function doConversation(name: string) {
		const conversation = conversations[name];
		if (!conversation) throw Error(`no conversation with name "${name}"`);
		return conversation();
	}

	// These options will change every time a new prompt is created via choicePrompt()
	const options = ref<ChoicePromptOptions | null>(null);
	const promptIsOpen = computed(() => {
		return options.value !== null;
	});

	// When a choice prompt is created, this will contain the callback to run on resolution of the promise
	const resolver = ref<((value: PromptChoice) => void) | null>(null);

	// Handle choice selection
	const selectedChoiceIndex = ref<number | null>(null);
	function changeSelection(direction: 'n' | 's') {
		if (!options.value) throw Error('called changeSelection() when there was no prompt');
		if (selectedChoiceIndex.value === null) {
			selectedChoiceIndex.value = 0;
		} else {
			selectedChoiceIndex.value =
				(selectedChoiceIndex.value + (direction === 'n' ? -1 : 1)) % options.value.choices.length;
			if (selectedChoiceIndex.value < 0)
				selectedChoiceIndex.value = options.value.choices.length - 1;
		}
	}
	function selectChoice() {
		if (!options.value) throw Error('called selectChoice() when there was no prompt options');
		if (!resolver.value) throw Error('called selectChoice() when there was no prompt resolver');
		if (selectedChoiceIndex.value === null) throw Error('prompt is open but no choice is selected');
		resolver.value(options.value.choices[selectedChoiceIndex.value]);
	}

	// Use this to create a choice prompt
	// Note: only one choice prompt can exist at any time
	function choicePrompt(opts: ChoicePromptOptions) {
		return new Promise<PromptChoice>((resolve, reject) => {
			if (resolver.value !== null) {
				reject('tried to prompt when another prompt was in progress');
				return;
			}
			options.value = opts;
			selectedChoiceIndex.value = 0;
			resolver.value = (choice: PromptChoice) => {
				resolver.value = null;
				resolve(choice);
			};
		});
	}

	return {
		options,
		resolver,
		selectedChoiceIndex,
		changeSelection,
		selectChoice,
		promptIsOpen,

		// Public utility function for creating a choice prompt
		choicePrompt,

		// Public utility for starting a conversation and getting a result
		doConversation,
	};
});
