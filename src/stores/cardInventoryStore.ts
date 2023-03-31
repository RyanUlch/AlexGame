// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useLogComposable } from '@/composables/logComposable';
import { useDragDropStore } from './dragStore';
const { addLogLine } = useLogComposable();

export type Card = {
	masterCardId: number;
	uniqueDeckId: number;
	imgBase: string;
	cardText: string;
};

// Drag (and) Drop Store used to store drop elements references, and handle logic with dragging/dropping elements
export const useCardStore = defineStore('cardInventoryStore', () => {
	const characterCardInventory: Card[] = [
		{ masterCardId: 0, uniqueDeckId: 0, imgBase: 'power-temp', cardText: 'Fire some anime blast' },
		{ masterCardId: 1, uniqueDeckId: 1, imgBase: '', cardText: 'Some Text' },
		{ masterCardId: 2, uniqueDeckId: 2, imgBase: '', cardText: 'Some Text' },
		{ masterCardId: 3, uniqueDeckId: 3, imgBase: '', cardText: 'Some Text' },
		{ masterCardId: 4, uniqueDeckId: 4, imgBase: '', cardText: 'Some Text' },
		{ masterCardId: 5, uniqueDeckId: 5, imgBase: '', cardText: 'Some Text' },
	];

	let characterDrawPile: Card[] = reactive(characterCardInventory);
	const characterCardHand: Card[] = reactive([]);
	const characterDiscard: Card[] = reactive([]);

	const shuffleDrawPile = () => {
		const shuffledDeck = [...characterDrawPile];
		let currentIndex = shuffledDeck.length;
		let randomIndex: number;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			--currentIndex;
			[shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
				shuffledDeck[randomIndex],
				shuffledDeck[currentIndex],
			];
		}
		return shuffledDeck;
	};

	const useCard = (
		dropType: string | number,
		dragId: number,
		droppedIntoId: string | number,
		droppedFromId: string | number,
	) => {
		if (droppedIntoId === 'consumer') {
			const cardIndex = characterCardHand.findIndex((card) => card.uniqueDeckId === dragId);
			discardCard(cardIndex);
		} else if (droppedIntoId === 'discard') {
			const cardIndex = characterCardHand.findIndex((card) => card.uniqueDeckId === dragId);
			discardCard(cardIndex);
		}
	};

	const drawCards = (drawNumber: number) => {
		const drawnCards = characterDrawPile.splice(0, drawNumber);
		if (drawnCards.length < drawNumber) {
			addLogLine('No Cards left to draw');
		}
		characterCardHand.push(...drawnCards);
	};

	const refreshDrawPile = () => {
		characterDrawPile.push(...characterDiscard.splice(0, Infinity));
		shuffleDrawPile();
	};

	const discardCard = (cardHandIndex: number) => {
		characterDiscard.push(...characterCardHand.splice(cardHandIndex, 1));
	};

	const discardHand = () => {
		characterDiscard.push(...characterCardHand.splice(0, Infinity));
	};

	return {
		characterDrawPile,
		characterCardHand,
		characterDiscard,
		useCard,
		drawCards,
		refreshDrawPile,
		discardCard,
		discardHand,
	};
});
