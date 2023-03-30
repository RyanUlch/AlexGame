<script setup lang="ts">
	import Card from './Card.vue';
	import { useCardStore } from '../../stores/cardInventoryStore';
	import DropElement from '../DragAndDrop/DropElement.vue';
	const cardStore = useCardStore();
</script>
<template>
	<div class="cardArea">
		<div
			class="cardBack"
			:title="`You have ${cardStore.characterDrawPile.length} cards in your draw pile`"></div>
		<DropElement
			dragElementType="card"
			:dropElementIndex="0"
			class="hand">
			<Card
				v-for="(card, index) in cardStore.characterCardHand"
				:key="index"
				:dragInit="{
				dragType: 'card',
				dragId: index,
				dropId: 0,
				dropHandler: (dropType: string | number, dragID: number, droppedIntoId: string | number, droppedFromId: string | number) => {},
			}"></Card>
		</DropElement>
		<div
			class="cardBack"
			:title="`You have ${cardStore.characterDiscard.length} cards in your discard`"></div>
	</div>
</template>
<style scoped>
	.cardArea {
		height: 10rem;
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
		height: 7rem;
		width: 3rem;
		background-color: blue;
	}
</style>
