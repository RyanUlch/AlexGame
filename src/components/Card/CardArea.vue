<script setup lang="ts">
	import Card from './Card.vue';
	import { useCardStore } from '../../stores/card';
	import DropElement from '../DragAndDrop/DropElement.vue';
	import cardData from '../../assets/cards/MasterCardList.json';
	const cardStore = useCardStore();
	const drawCards = () => {
		cardStore.drawCards(3);
	};
</script>
<template>
	<div class="cardArea">
		<div
			@click="drawCards"
			class="cardBack draw"
			:title="cardStore.drawPileAmount"></div>
		<DropElement
			dragElementType="card"
			dropElementIndex="playerHand"
			class="hand">
			<Card
				v-for="card in cardStore.characterCardHand"
				:key="card.uniqueDeckId"
				:cardImageBase="cardData[card.masterCardId].imgBase"
				:cardText="cardData[card.masterCardId].cardText"
				:value="card.value"
				:energyCost="cardData[card.masterCardId].energyCost"
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
		background-color: darkslategrey;
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
		background-color: lightgrey;
	}

	.draw {
		border-radius: 0 var(--cardRadius) var(--cardRadius) 0;
	}

	.discard {
		border-radius: var(--cardRadius) 0 0 var(--cardRadius);
	}
</style>
