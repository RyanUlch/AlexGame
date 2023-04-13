import { setActivePinia, createPinia } from 'pinia';
import { useCardStore } from '../stores/card';
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
	characterDrawPile: Card[],
	characterCardHand: Card[],
	characterDiscard: Card[],
	drawPileAmount: Computed<string>,

Methods:
	useCard,
	drawCards,
	refreshDrawPile,
	addCardToDeck,
	addCardsToDeck,
	discardCard,
	discardHand,
*/

const { log } = useLogComposable();

describe('Card Inventory Store', () => {
	let store: any;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = useCardStore();
	});

	// Initial
	test('Initial store does not contain any cards', () => {
		expect(store.characterDrawPile).toHaveLength(0);
		expect(store.characterCardHand).toHaveLength(0);
		expect(store.characterDiscard).toHaveLength(0);
	});

	// addCardToDeck
	test('Add single card to players discard', () => {
		store.addCardToDeck({
			masterCardId: 'test',
			uniqueDeckId: 0,
			value: 0,
			effectHandler: () => {
				return true;
			},
		});
		expect(store.characterDiscard).toHaveLength(1);
	});

	// addCardsToDeck
	test('Add multiple cards to players discard', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 2,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		expect(store.characterDiscard).toHaveLength(3);
	});

	// refreshDrawPile
	test('Refresh discard pile into player deck', () => {
		store.addCardToDeck({
			masterCardId: 'test',
			uniqueDeckId: 0,
			value: 0,
			effectHandler: () => {
				return true;
			},
		});
		store.refreshDrawPile();
		expect(store.characterDrawPile).toHaveLength(1);
	});

	// drawCards
	test('Draw a specific amount of cards into the players hand', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 2,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(1);
		expect(store.characterCardHand).toHaveLength(1);
		store.drawCards(2);
		expect(store.characterCardHand).toHaveLength(3);
	});

	// discardCard
	test('Discard specific card from deck', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(2);
		store.discardCard(1);
		expect(store.characterDiscard).toHaveLength(1);
		expect(store.characterCardHand).toHaveLength(1);
	});

	// discardHand
	test('Discard all cards in hand', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(2);
		store.discardHand();
		expect(store.characterDiscard).toHaveLength(2);
		expect(store.characterCardHand).toHaveLength(0);
	});

	// useCard - 'consumer'
	test('Consume card from hand', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(2);
		expect(store.useCard(0, 'consumer')).toEqual(true);
		expect(log).toHaveLength(1);
		expect(store.characterDiscard).toHaveLength(1);
		expect(store.characterCardHand).toHaveLength(1);
	});

	// useCard - 'discard'
	test('Discard card from hand', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return true;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(2);
		expect(store.useCard(0, 'discard')).toEqual(true);
		expect(store.characterDiscard).toHaveLength(1);
		expect(store.characterCardHand).toHaveLength(1);
	});

	// useCard - 'discard' - Failure
	test('Returns false when droppedIntoId is not a proper dropElement ', () => {
		store.addCardsToDeck([
			{
				masterCardId: 'test',
				uniqueDeckId: 0,
				value: 0,
				effectHandler: () => {
					return false;
				},
			},
			{
				masterCardId: 'test',
				uniqueDeckId: 1,
				value: 0,
				effectHandler: () => {
					return false;
				},
			},
		]);
		store.refreshDrawPile();
		store.drawCards(2);
		expect(store.useCard(0, 'wrong')).toEqual(false);
		expect(store.characterCardHand).toHaveLength(2);
	});
});
