<script setup lang="ts">
	import Card from './Card.vue';
	import { useCardStore } from '../../stores/cardInventoryStore';
	import DropElement from '../DragAndDrop/DropElement.vue';
	const cardStore = useCardStore();
	const checkDraw = () => {
		if (cardStore.characterDrawPile.length === 0) {
			cardStore.refreshDrawPile();
		}
		cardStore.drawCards(3);
	};
</script>
<template>
	<div class="cardArea">
		<div
			@click="checkDraw"
			class="cardBack draw"
			:title="`You have ${cardStore.characterDrawPile.length} cards in your draw pile`"></div>
		<DropElement
			dragElementType="card"
			dropElementIndex="playerHand"
			class="hand">
			<Card
				v-for="card in cardStore.characterCardHand"
				:key="card.uniqueDeckId"
				:cardImageBase="card.imgBase"
				:cardText="card.cardText"
				:dragInit="{
					dragType: 'card',
					dragId: card.uniqueDeckId,
					dropId: 0,
					dropHandler: cardStore.useCard,
				}"></Card>
		</DropElement>
		<DropElement
			dropElementIndex="discard"
			dragElementType="card"
			class="cardBack discard"
			:title="`You have ${cardStore.characterDiscard.length} cards in your discard`">
		</DropElement>
	</div>
</template>
<style scoped>
	.cardArea {
		height: calc(var(--cardHeight) + 5px);
		width: 100%;
		background-color: lightgray;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.hand {
		display: flex;
		flex-direction: row;
	}
	.cardBack {
		height: var(--cardHeight);
		width: calc(var(--cardWidth) / 2);
		background-color: blue;
	}

	.draw {
		border-radius: 0 var(--cardRadius) var(--cardRadius) 0;
	}

	.discard {
		border-radius: var(--cardRadius) 0 0 var(--cardRadius);
	}
</style>
