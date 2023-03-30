<script setup lang="ts">
	import DragElement from '../DragAndDrop/DragElement.vue';
	const props = defineProps<{
		dragInit: {
			dragType: number | string;
			dragId: number;
			dropId: number;
			dropHandler: (
				dropType: number | string,
				dragID: number,
				droppedIntoId: number | string,
				droppedFromId: number | string,
			) => void;
		};
	}>();
</script>
<template>
	<DragElement
		class="card"
		:dragInit="props.dragInit"
		hoverClass="cardHover">
		<img
			src=""
			alt=""
			class="cardImage" />
		<p class="text">This is the card text to explain how to use it</p>
	</DragElement>
</template>
<style scoped>
	.card {
		height: 8.4rem;
		width: 6rem;
		background-color: blue;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.cardHover {
		border: 2px solid black;
	}

	.cardImage {
		width: 5.5rem;
		margin-top: 0.2rem;
		height: 4rem;
	}

	.text {
		text-align: center;
		font-size: small;
		pointer-events: none;
	}
</style>
