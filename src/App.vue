<script setup lang="ts">
	import CardArea from './components/Card/CardArea.vue';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import DropElement from './components/DragAndDrop/DropElement.vue';
	import MenuButton from './components/MenuButton/MenuButton.vue';
	import StatsUi from './components/StatsUi/StatsUI.vue';
	import { useCardStore } from './stores/card';
	import EventLog from './components/EventLog/EventLog.vue';
	import { usePawnStore } from './stores/pawn';
	import { storeToRefs } from 'pinia';
	import { useSpriteStore } from './stores/sprite';
	import AppPrompt from './components/Menus/AppPrompt.vue';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import { useSettingsStore } from './stores/settings';
	const settings = useSettingsStore();
	const cardStore = useCardStore();
	const playerStore = usePawnStore();
	const { health, maxHealth, energy, maxEnergy } = storeToRefs(playerStore);
	const { screenSize } = useSpriteStore();
	// Starting Deck
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
				return playerStore.useEnergy(1);
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
				return true;
			},
		},
	]);
</script>
<template>
	<div class="gameArea">
		<DropElement
			dragElementType="card"
			dropElementIndex="consumer"
			class="playArea"
			id="modal-target">
			<PlayArea />
		</DropElement>
		<div class="upper-right">
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
					:modalHandler="() => {}"
					imgFileName="Inventory"
					tooltip="Open your inventory" />
				<MenuButton
					:modalHandler="() => {}"
					imgFileName="LevelUp"
					tooltip="Open your Stats" />
				<MenuButton
					:modalHandler="settings.openSettingsMenu"
					imgFileName="Menu"
					tooltip="Open the settings" />
				<MenuButton
					:modalHandler="() => {}"
					imgFileName="Credits"
					tooltip="Open credits" />
			</div>
			<EventLog />
		</div>
		<CardArea />
	</div>
	<AppPrompt />
	<AppSettingsMenu />
</template>
<style scoped>
	.square {
		width: 150px;
		height: 146px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.gameArea {
		box-sizing: border-box;
		width: 964px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		border: var(--borderSize) solid var(--borderColor);
	}

	#modal-target {
		position: relative; /* necessary for modal absolute positioning */
	}

	.playArea {
		height: v-bind('`${screenSize}px`');
		width: v-bind('`${screenSize}px`');
		background-color: black;
		overflow: hidden;
	}

	.upper-right {
		width: 298px;
		height: 656px;
		background-color: grey;
		display: inline-block;
	}

	.statArea {
		display: inline-flex;
		flex-direction: column;
		border-left: var(--borderSize) solid var(--borderColor);
		border-right: var(--borderSize) solid var(--borderColor);
	}

	.menuArea {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: calc(var(--menuSide) * var(--menuColumnNumber));
	}
</style>
