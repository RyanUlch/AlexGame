import { setActivePinia, createPinia } from 'pinia';
import { useCardStore } from '../stores/card';
import { test, describe, expect, beforeEach } from 'vitest';

describe('Card Inventory Store', () => {
	let store: any;
	beforeEach(() => {
		setActivePinia(createPinia());
		store = useCardStore();
	});

	test('Initial store does not contain any cards', () => {
		expect(store.characterDrawPile).toHaveLength(0);
		expect(store.characterCardHand).toHaveLength(0);
		expect(store.characterDiscard).toHaveLength(0);
	});

	test('Add single card to players discard', () => {
		store.addCardToDeck({ masterCardId: 0, imgBase: 'mocked', cardText: 'Mocked Card' });
		expect(store.characterDiscard).toHaveLength(1);
	});

	test('Add multiple cards to players discard', () => {
		store.addCardsToDeck([
			{ masterCardId: 0, imgBase: 'mocked0', cardText: 'Mocked Card0' },
			{ masterCardId: 1, imgBase: 'mocked1', cardText: 'Mocked Card1' },
			{ masterCardId: 2, imgBase: 'mocked2', cardText: 'Mocked Card2' },
		]);
		expect(store.characterDiscard).toHaveLength(3);
	});
});
