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
			) => boolean;
		};
		cardImageBase: string;
		cardText: string;
		value: number;
		energyCost?: number;
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
		<div class="cardInfo">
			<div
				class="energyCost"
				v-if="props.energyCost">
				<p class="energyIcon">{{ props.energyCost }}</p>
				<img
					class="energyIcon"
					src="src/assets/UI/statsIcons/energy.png"
					alt="" />
			</div>
			<div class="textBox">
				<p class="text">{{ cardTextAltered }}</p>
			</div>
		</div>
	</DragElement>
</template>
<style scoped>
	.energyIcon {
		display: inline;
		font-size: 0.8rem;
	}

	.energyCost {
		position: absolute;
		top: 0px;
		right: 0px;
		background-color: grey;
		border-radius: 0.25rem;
		padding: 2px;
	}

	.cardInfo {
		height: 60%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.card {
		height: var(--cardHeight);
		width: var(--cardWidth);
		background-color: var(--cardColor);
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
	.textBox {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid var(--borderColor);
		height: 100%;
		width: 100%;
		border-radius: 0.5rem;
		background-color: var(--cardTextboxColor);
	}

	.cardImage {
		width: 100%;
		height: 4rem;
		border-radius: var(--cardRadius);
		border: 1px solid var(--borderColor);
	}

	.text {
		text-align: center;
		font-size: clamp(0.2rem, 2vw, 0.8rem);
		pointer-events: none;
	}
</style>
