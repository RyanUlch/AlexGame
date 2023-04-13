<script setup lang="ts">
	import { useLevelStore } from './stores/levelStore';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import CardArea from './components/Card/CardArea.vue';
	import DropElement from './components/DragAndDrop/DropElement.vue';
	import MenuButton from './components/MenuButton/MenuButton.vue';
	import StatsUi from './components/StatsUi/StatsUI.vue';
	import { useCardStore } from './stores/card';
	import EventLog from './components/EventLog/EventLog.vue';
	import { usePawnStore } from './stores/pawn';
	import AppPrompt from './components/Menus/AppPrompt.vue';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import AppCreditsMenu from './components/Menus/AppCreditsMenu.vue';
	import AppInventoryMenu from './components/Menus/AppInventoryMenu.vue';
	import AppSkillsMenu from './components/Menus/AppSkillsMenu.vue';
	import { useSettingsStore } from './stores/settings';
	const settings = useSettingsStore();
	const cardStore = useCardStore();
	const playerStore = usePawnStore();
	// Starting Deck
	cardStore.addCardsToDeck([]);
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
				<!-- <StatsUi
					:value=""
					:maxValue=""
					:isIconBased="true"
					iconFileBase="fileName"
					:hasPartialIcons="true"
					tooltip="" /> -->
			</div>
			<div class="menuArea square">
				<MenuButton
					:modalHandler="settings.openInventoryMenu"
					imgFileName="Inventory"
					tooltip="Open your inventory" />
				<MenuButton
					:modalHandler="settings.openSkillsMenu"
					imgFileName="LevelUp"
					tooltip="Open your Stats" />
				<MenuButton
					:modalHandler="settings.openSettingsMenu"
					imgFileName="Menu"
					tooltip="Open the settings" />
				<MenuButton
					:modalHandler="settings.openCreditsMenu"
					imgFileName="Credits"
					tooltip="Open credits" />
			</div>
			<EventLog />
		</div>
		<CardArea />
	</div>
	<AppPrompt />
	<AppInventoryMenu />
	<AppSkillsMenu />
	<AppSettingsMenu />
	<AppCreditsMenu />
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
		height: v-bind('`${playerStore.screenSize}px`');
		width: v-bind('`${playerStore.screenSize}px`');
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
