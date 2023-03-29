<script setup lang="ts">
	import { reactive, computed } from 'vue';
	import DragElement from './components/DragAndDrop/DragElement.vue';
	import DropElement from './components/DragAndDrop/DropElement.vue';

	// Card and container state would be in a store in a real app
	const containers = reactive([
		{
			id: 0,
			dragElementType: 'card',
			entries: [
				{ id: 0, container: 0 },
				{ id: 1, container: 0 },
				{ id: 2, container: 0 },
				{ id: 3, container: 0 },
				{ id: 4, container: 0 },
			],
		},
		{ id: 1, dragElementType: 'card', entries: [] },
		{
			id: 2,
			dragElementType: 'token',
			entries: [
				{ id: 0, container: 2 },
				{ id: 1, container: 2 },
			],
		},
	]);

	const cardContainers = computed(() =>
		containers.filter((cont) => cont.dragElementType === 'card'),
	);

	const tokenContainers = computed(() =>
		containers.filter((cont) => cont.dragElementType === 'token'),
	);

	// Callbacks:
	const onValidDrop = (
		dropType: number | string,
		dragId: number,
		droppedIntoId: number | string,
		droppedFromId: number | string,
	) => {
		const fromIndex = containers.findIndex((container) => {
			return container.dragElementType === dropType && container.id === droppedFromId;
		});
		const fromElementIndex = containers[fromIndex].entries.findIndex((element) => {
			return element.id === dragId;
		});

		const intoIndex = containers.findIndex((container) => {
			return container.dragElementType === dropType && container.id === droppedIntoId;
		});

		const splitElement = containers[fromIndex].entries.splice(fromElementIndex, 1);
		if (splitElement.length > 0) {
			splitElement[0].container = intoIndex;
			containers[intoIndex].entries.push(splitElement[0]);
		}
	};

	const preventSecondElement = (dragType: number | string, dragId: number | string) => {
		return dragId !== 1;
	};

	const moveCardHandler = () => {
		const card = containers[0].entries.splice(0, 1);
		containers[1].entries.push(card[0]);
	}

</script>

<template>
	<h1>Drag and Drop Demo</h1>
	<p></p>
	<div class="all">
		<DropElement
			class="container cardContainer"
			v-for="(container, containerIndex) in cardContainers"
			:key="container.id"
			:dropElementIndex="containerIndex"
			dragElementType="card">
			<DragElement
				hover-class="valid"
				class="card"
				:drag-init="{
					dragType: 'card',
					dragId: card.id,
					dropId: containerIndex,
					dropHandler: onValidDrop,
				}"
				:canBeDropped="preventSecondElement"
				v-for="card in cardContainers[containerIndex].entries"
				:key="card.id">
				{{ card.id === 1 ? "I can't be dropped" : "I'm a card" }}
			</DragElement>
			<p>Card Container</p>
		</DropElement>
		<DropElement
			class="container tokenContainer"
			v-for="(container, containerIndex) in tokenContainers"
			:key="container.id"
			:dropElementIndex="containerIndex"
			dragElementType="token">
			<DragElement
				class="token"
				v-for="(token, tokenIndex) in tokenContainers[containerIndex].entries"
				:key="token.id"
				:drag-init="{
					dragType: 'token',
					dragId: token.id,
					dropId: containerIndex,
					dropHandler: onValidDrop,
				}"
				:startingOffset="['5px', `${25 * tokenIndex}px`]">
				Token</DragElement
			>
			<p>Token Container</p>
		</DropElement>
		<DragElement
			class="card freeWindow"
			:startingOffset="['700px', '50px']"
			>I'm Not constrained!</DragElement
		>
		<DragElement
			class="card freeWindow"
			:startingOffset="['700px', '350px']"
			:prevent-y="true"
			>I'm limited to Moving on the X-Axis</DragElement
		>
		<DragElement
			class="card freeWindow"
			:startingOffset="['700px', '650px']"
			:bounds="{ top: 500, right: 950, bottom: 900, left: 500 }"
			>I have Bounds! (Invisible)</DragElement
		>
		<DragElement
			:disabled="true"
			class="card freeWindow"
			:startingOffset="['700px', '950px']"
			>I'm disabled, I can't move</DragElement
		>
		<button @click="moveCardHandler">move card</button>
	</div>
</template>

<style scoped>
	.all {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.card {
		user-select: none;
		text-align: center;
		width: 4rem;
		height: 7rem;
		border: 1px solid black;
		border-radius: 1rem;
		background-color: brown;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.valid {
		background-color: blue !important;
	}

	.card:hover {
		box-shadow: 2px 2px 5px black;
	}

	.card:active {
		box-shadow: 5px 5px 10px black;
	}

	.token {
		text-align: center;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 4rem;
		height: 4rem;
		border: 1px solid black;
		border-radius: 1rem;
		background-color: aqua;
	}
	.container {
		text-align: center;
		justify-content: center;
		align-items: center;
		display: flex;
		gap: 1rem;
		width: 90%;
		height: 10rem;
		margin: 0 auto;
		border: 1px solid grey;
		border-radius: 1rem;
	}

	.cardContainer {
		background-color: lightgreen;
	}

	.tokenContainer {
		background-color: goldenrod;
	}

	.freeWindow {
		background-color: darkviolet;
		width: 15rem;
		height: 10rem;
	}
</style>
