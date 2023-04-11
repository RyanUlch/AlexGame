// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { useLogComposable } from '../composables/logComposable';
import cardData from '../assets/cards/MasterCardList.json';
import { useStorage } from '@vueuse/core';
import type { RemovableRef } from '@vueuse/core';
import { usePawnStore } from './pawn';
import { useSpriteStore } from './sprite';

const { addLogLine } = useLogComposable();

export type Card = {
	masterCardId: string;
	uniqueDeckId?: number;
	value: number;
	effectHandler: () => boolean;
};

const masterCardList: {
	[key: string]: {
		effect: string;
		imgBase: string;
		cardText: string;
		target: string;
		energyCost?: number;
	};
} = cardData;

export const useCardStore = defineStore('cardInventoryStore', () => {
	let uniqueCardIndex = 0;

	const characterDrawPile: RemovableRef<Card[]> = useStorage('characterDrawPile', []);
	const characterCardHand: RemovableRef<Card[]> = useStorage('characterCardHand', []);
	const characterDiscard: RemovableRef<Card[]> = useStorage('characterDiscard', []);

	const drawPileAmount = computed(() => {
		return `You have ${characterDrawPile.value.length} cards in your draw pile`;
	});

	const shuffleDrawPile = () => {
		let currentIndex = characterDrawPile.value.length;
		let randomIndex: number;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			--currentIndex;
			[characterDrawPile.value[currentIndex], characterDrawPile.value[randomIndex]] = [
				characterDrawPile.value[randomIndex],
				characterDrawPile.value[currentIndex],
			];
		}
	};

	const targetPawn = (target: string) => {
		const spriteStore = useSpriteStore();
		spriteStore.characterPosition;
		switch (target) {
			case 'self':
				return -1;
			case 'front':
				const frontPosition = spriteStore.movePosition(spriteStore.characterPosition[2]);

				return;
			default:
				throw new Error(`Add ${target} to target switch`);
		}
	};

	const cardEffect = (cardEffect: string, value: number, target: string) => {
		const pawnStore = usePawnStore();
		const pawnIndex = targetPawn(target);
		switch (cardEffect) {
			case 'heal':
				if (pawnIndex) {
					pawnStore.heal(value, pawnIndex);
					return true;
				}
				return false;

			case 'damage':
				if (pawnIndex) {
					pawnStore.takeDamage(value, pawnIndex);
					return true;
				}
				return false;

			case 'recharge':
				pawnStore.energize(value);
				return true;
			default:
				throw new Error(`Add ${cardEffect} card effect handler to card.ts store`);
		}
	};

	const useCard = (dragId: number | undefined, droppedIntoId: string | number): boolean => {
		if (droppedIntoId === 'consumer') {
			const cardIndex = characterCardHand.value.findIndex((card) => card.uniqueDeckId === dragId);
			const playerCard = characterCardHand.value[cardIndex];
			const masterCard = masterCardList[playerCard.masterCardId];
			if (cardEffect(masterCard.effect, playerCard.value, masterCard.target)) {
				addLogLine(`${masterCard.effect} for ${playerCard.value}, to ${masterCard.target}`);
				discardCard(cardIndex);
				return true;
			}
			return false;
		} else if (droppedIntoId === 'discard') {
			const cardIndex = characterCardHand.value.findIndex((card) => card.uniqueDeckId === dragId);
			discardCard(cardIndex);
			return true;
		} else {
			return false;
		}
	};

	const drawCards = (drawNumber: number) => {
		const drawnCards = characterDrawPile.value.splice(0, drawNumber);
		if (drawnCards.length < drawNumber && characterDiscard.value.length > 0) {
			addLogLine('Shuffling discards back into Draw Pile');
			refreshDrawPile();
			drawnCards.push(...characterDrawPile.value.splice(0, drawNumber - drawnCards.length));
		}
		if (drawnCards.length < drawNumber) {
			addLogLine('No Cards left to draw');
		}
		characterCardHand.value.push(...drawnCards);
	};

	const refreshDrawPile = () => {
		characterDrawPile.value.push(...characterDiscard.value.splice(0, Infinity));
		shuffleDrawPile();
	};

	const discardCard = (cardHandIndex: number) => {
		characterDiscard.value.push(...characterCardHand.value.splice(cardHandIndex, 1));
	};

	const discardHand = () => {
		characterDiscard.value.push(...characterCardHand.value.splice(0, Infinity));
	};

	const addCardToDeck = (newCard: Card) => {
		characterDiscard.value.push({
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
