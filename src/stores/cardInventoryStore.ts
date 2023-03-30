// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { useLogComposable } from '@/composables/logComposable';
const { addLogLine } = useLogComposable();
export type Card = {
	masterCardId: number;
};

// Drag (and) Drop Store used to store drop elements references, and handle logic with dragging/dropping elements
export const useCardStore = defineStore('cardInventoryStore', () => {
	const characterCardInventory: Card[] = [
		{ masterCardId: 0 },
		{ masterCardId: 1 },
		{ masterCardId: 2 },
		{ masterCardId: 3 },
		{ masterCardId: 4 },
		{ masterCardId: 5 },
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
		drawCards,
		refreshDrawPile,
		discardCard,
		discardHand,
	};
});
