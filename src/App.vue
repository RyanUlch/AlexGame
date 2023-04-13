<script setup lang="ts">
	import { useLevelStore } from './stores/levelStore';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import CardArea from './components/Card/CardArea.vue';
	import EventLog from './components/EventLog/EventLog.vue';
	import StatsUi from './components/StatsUi/StatsUi.vue';
	import MenuButton from './components/MenuButton/MenuButton.vue';
	import DropElement from './components/DragAndDrop/DropElement.vue';
	import { useCardStore } from './stores/cardInventoryStore';
	import { useLogComposable } from './composables/logComposable';
	const { addLogLine } = useLogComposable();
	const cardStore = useCardStore();

	cardStore.addCardsToDeck([
		{ masterCardId: 'power', value: 1 },
		{ masterCardId: 'heal', value: 2 },
		{ masterCardId: 'beam', value: 6 },
		{ masterCardId: 'energy', value: 3 },
		{ masterCardId: 'jump', value: 2 },
	]);
</script>
<template>
	<div class="gameArea">
		<DropElement
			dragElementType="card"
			dropElementIndex="consumer"
			class="playArea">
			This is the play area (where the levels show up)
		</DropElement>
		<div class="upper-right">
			<div class="statArea square">
				<StatsUi
					:value="5"
					:maxValue="10"
					:isIconBased="true"
					iconFileBase="heart"
					:hasPartialIcons="true"
					tooltip="This is your health" />
				<StatsUi
					:value="2"
					:maxValue="4"
					:isIconBased="false"
					iconFileBase="energy"
					tooltip="This is your energy" />
				<StatsUi
					:value="0"
					:maxValue="0"
					:isIconBased="false"
					iconFileBase="poison"
					tooltip="You are poisoned!" />
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
		</div>
		<CardArea />
	</div>
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
		width: 900px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
	}

	.playArea {
		display: inline-flex;
		height: 600px;
		width: 600px;
		background-color: blueviolet;
		justify-content: center;
		align-items: center;
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
