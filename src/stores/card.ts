// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { useLogComposable } from '../composables/logComposable';
import cardData from '../assets/cards/MasterCardList.json';

const { addLogLine } = useLogComposable();

export type Card = {
	masterCardId: string;
	uniqueDeckId?: number;
	value: number;
	effectHandler: () => boolean;
};

// Drag (and) Drop Store used to store drop elements references, and handle logic with dragging/dropping elements
export const useCardStore = defineStore('cardInventoryStore', () => {
	const characterCardInventory: Card[] = [];
	let uniqueCardIndex = 0;

	const characterDrawPile: Card[] = reactive(characterCardInventory);
	const characterCardHand: Card[] = reactive([]);
	const characterDiscard: Card[] = reactive([]);

	const drawPileAmount = computed(() => {
		return `You have ${characterDrawPile.length} cards in your draw pile`;
	});

	const shuffleDrawPile = () => {
		let currentIndex = characterDrawPile.length;
		let randomIndex: number;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			--currentIndex;
			[characterDrawPile[currentIndex], characterDrawPile[randomIndex]] = [
				characterDrawPile[randomIndex],
				characterDrawPile[currentIndex],
			];
		}
	};

	const useCard = (dragId: number | undefined, droppedIntoId: string | number): boolean => {
		if (droppedIntoId === 'consumer') {
			const cardIndex = characterCardHand.findIndex((card) => card.uniqueDeckId === dragId);
			const playerCard = characterCardHand[cardIndex];
			const masterCard = cardData[playerCard.masterCardId];
			if (characterCardHand[cardIndex].effectHandler()) {
				addLogLine(`${masterCard.effect} for ${playerCard.value}, to ${masterCard.target}`);
				discardCard(cardIndex);
				return true;
			}
			return false;
		} else if (droppedIntoId === 'discard') {
			const cardIndex = characterCardHand.findIndex((card) => card.uniqueDeckId === dragId);
			discardCard(cardIndex);
			return true;
		} else {
			return false;
		}
	};

	const drawCards = (drawNumber: number) => {
		const drawnCards = characterDrawPile.splice(0, drawNumber);
		if (drawnCards.length < drawNumber && characterDiscard.length > 0) {
			addLogLine('Shuffling discards back into Draw Pile');
			refreshDrawPile();
			drawnCards.push(...characterDrawPile.splice(0, drawNumber - drawnCards.length));
		}
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

	const addCardToDeck = (newCard: Card) => {
		characterDiscard.push({
			masterCardId: newCard.masterCardId,
			uniqueDeckId: uniqueCardIndex,
			value: newCard.value,
			effectHandler: newCard.effectHandler,
		});
		++uniqueCardIndex;
	};

	const addCardsToDeck = (newCards: Card[]) => {
		for (const card of newCards) {
			addCardToDeck(card);
		}
	};

	return {
		characterDrawPile,
		characterCardHand,
		characterDiscard,
		drawPileAmount,
		useCard,
		drawCards,
		refreshDrawPile,
		addCardToDeck,
		addCardsToDeck,
		discardCard,
		discardHand,
	};
});
