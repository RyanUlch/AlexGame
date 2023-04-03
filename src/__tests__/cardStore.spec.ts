import { setActivePinia, createPinia } from 'pinia';
import { ref } from 'vue';
import { useCardStore } from '../stores/cardInventoryStore';
import { test, describe, expect, beforeEach, expectTypeOf } from 'vitest';

describe('Card Inventory Store', () => {
	let store: typeof useCardStore;
	beforeEach(() => {
		setActivePinia(createPinia());
		store = useCardStore();
	});

	test('Initial store does not contain any cards', () => {
		expect(store.characterDrawPile.length).toEqual(0);
		expect(store.characterCardHand.length).toEqual(0);
		expect(store.characterDiscard.length).toEqual(0);
	});

	test('Add single card to players discard', () => {
		store.addCardToDeck({ masterCardId: 0, imgBase: 'mocked', cardText: 'Mocked Card' });
	});
});
