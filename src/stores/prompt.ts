import { defineStore } from 'pinia';
import { ref } from 'vue';
import conversationsData from '../assets/conversations.json';
import * as zod from 'zod';

export type PromptChoice = {
	text: string;
	result: string | ChoicePromptOptions;
};

export type ChoicePromptOptions = {
	choices: PromptChoice[];
	message?: string;
};

interface Prompt {
	message: string;
	choices: { text: string; result: string | Prompt }[];
}

const zPrompt: zod.ZodType<Prompt> = zod.lazy(() =>
	zod.object({
		message: zod.string(),
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

		// Public utility for starting a conversation and getting a result
		doConversation,
	};
});
