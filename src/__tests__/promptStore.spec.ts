import { setActivePinia, createPinia } from 'pinia';
import { usePromptStore } from '../stores/prompt';
import { test, describe, expect, beforeEach } from 'vitest';
import { useLogComposable } from '@/composables/logComposable';

/* STORE INFO
Types:
	Card = {
		masterCardId: string;
		uniqueDeckId?: number;
		value: number;
		effectHandler: () => boolean;
	};

State:
	options:
	resolver:
	selectedChoiceIndex:
	promptIsOpen: boolean
Methods:
	changeSelection,
	selectChoice,
	choicePrompt,
	doConversation,
*/

describe('Prompt Store', () => {
	let store: any;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = usePromptStore();
	});

	// changeSelection
	test('Changing selection moves to the lower choice', () => {
		usePromptStore().doConversation('testConvo');
		expect(store.selectedChoiceIndex).toEqual(0);
		store.changeSelection('s');
		expect(store.selectedChoiceIndex).toEqual(1);
		// Running to resolve conversation - not testing here
		store.selectChoice();
	});

	// promptIsOpen
	test('Check if prompt is open, and closed when it should be', () => {
		expect(store.promptIsOpen).toEqual(false);
		usePromptStore().doConversation('testConvo');
		expect(store.promptIsOpen).toEqual(true);
		store.changeSelection('s');
		store.selectChoice();
		expect(store.promptIsOpen).toEqual(false);
	});
});
