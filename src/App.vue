<script setup lang="ts">
	import CardArea from './components/Card/CardArea.vue';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import DropElement from './components/DragAndDrop/DropElement.vue';
	import { useCardStore } from './stores/cardInventoryStore';
	import { useLogComposable } from './composables/logComposable';
	import { usePlayerStore } from './stores/playerStore';
	import { storeToRefs } from 'pinia';
	import { useSpriteStore } from './stores/spriteStore';
	import AppPromptVue from './components/Menus/AppPrompt.vue';

	const { addLogLine } = useLogComposable();
	const cardStore = useCardStore();
	const playerStore = usePlayerStore();
	const { health, maxHealth, energy, maxEnergy } = storeToRefs(playerStore);
	const { screenSize } = useSpriteStore();
	cardStore.addCardsToDeck([
		{
			masterCardId: 'power',
			value: 1,
			effectHandler: () => {
				return playerStore.useEnergy(2);
			},
		},
		{
			masterCardId: 'heal',
			value: 2,
			effectHandler: () => {
				return playerStore.useEnergy(1) && playerStore.heal(2);
			},
		},
		{
			masterCardId: 'beam',
			value: 6,
			effectHandler: () => {
				return playerStore.useEnergy(3);
			},
		},
		{
			masterCardId: 'energy',
			value: 3,
			effectHandler: () => {
				return playerStore.energize(3);
			},
		},
		{
			masterCardId: 'jump',
			value: 1,
			effectHandler: () => {
				return playerStore.useEnergy(1);
			},
		},
	]);
</script>
<template>
	<div class="gameArea">
		<DropElement
			dragElementType="card"
			dropElementIndex="consumer"
			class="playArea">
			<PlayArea />
		</DropElement>
		<!-- <div class="upper-right">
			<div class="statArea square">
				<StatsUi
					:value="health"
					:maxValue="maxHealth"
					:isIconBased="true"
					iconFileBase="heart"
					:hasPartialIcons="true"
					tooltip="This is your health" />
				<StatsUi
					:value="energy"
					:maxValue="maxEnergy"
					:isIconBased="false"
					iconFileBase="energy"
					tooltip="This is your energy" />
			</div>
			<div class="menuArea square">
				<MenuButton
					:modalHandler="
						() => {
							addLogLine('Opening Inventory Modal', true);
						}
					"
					imgFileName="Inventory"
					tooltip="Open your inventory" />
				<MenuButton
					:modalHandler="
						() => {
							addLogLine('Opening Stats Modal', true);
						}
					"
					imgFileName="LevelUp"
					tooltip="Open your Stats" />
				<MenuButton
					:modalHandler="
						() => {
							addLogLine('Opening Settings Modal', true);
						}
					"
					imgFileName="Menu"
					tooltip="Open the settings" />
				<MenuButton
					:modalHandler="
						() => {
							addLogLine('Opening Credits Modal', true);
						}
					"
					imgFileName="Credits"
					tooltip="Open credits" />
			</div>
			<EventLog />
		</div> -->
		<CardArea />
	</div>

	<AppPromptVue />
</template>
<style scoped>
	.square {
		width: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.gameArea {
		box-sizing: border-box;
		width: 918px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		border: 5px solid grey;
	}

	.playArea {
		height: v-bind('`${screenSize}px`');
		width: v-bind('`${screenSize}px`');
		background-color: black;
		overflow: hidden;
	}

	.upper-right {
		width: 298px;
		height: 600px;
		background-color: aquamarine;
		display: inline-block;
	}

	.statArea {
		display: inline-flex;
		flex-direction: column;
	}

	.menuArea {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: calc(var(--menuSide) * var(--menuColumnNumber));
	}
</style>
