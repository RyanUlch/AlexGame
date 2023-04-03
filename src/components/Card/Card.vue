<script setup lang="ts">
	import DragElement from '../DragAndDrop/DragElement.vue';
	import { computed } from 'vue';
	const props = defineProps<{
		dragInit: {
			dragType: number | string;
			dragId: number | undefined;
			dropId: number;
			dropHandler: (
				dropType: number | string,
				dragID: number | undefined,
				droppedIntoId: number | string,
				droppedFromId: number | string,
			) => void;
		};
		cardImageBase: string;
		cardText: string;
		value: number;
	}>();

	const cardTextAltered = computed(() => {
		let cardText = props.cardText.replace('*', String(props.value));
		return cardText;
	});
</script>
<template>
	<DragElement
		class="card"
		:dragInit="props.dragInit"
		hoverClass="cardHover">
		<img
			:src="`src/assets/cards/cardImages/${props.cardImageBase}.jpg`"
			alt=""
			class="cardImage" />
		<p class="text">{{ cardTextAltered }}</p>
	</DragElement>
</template>
<style scoped>
	.card {
		height: var(--cardHeight);
		width: var(--cardWidth);
		background-color: blue;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-radius: var(--cardRadius);
		padding: 5px;
		transition: box-shadow 250ms;
		border: 2px solid black;
	}

	.card:active {
		box-shadow: 0 0 10px black;
	}
	.cardHover {
		box-shadow: 0 0 15px gold !important;
	}

	.cardImage {
		width: 100%;
		height: 4rem;
		border-radius: var(--cardRadius);
		border: 1px solid black;
	}

	.text {
		text-align: center;
		font-size: small;
		pointer-events: none;
	}
</style>
