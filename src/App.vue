<script setup lang="ts">
	import { useLevelStore } from './stores/level';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import MenuButton from './components/MenuButton/MenuButton.vue';
	import StatsUi from './components/StatsUi/StatsUI.vue';
	import EventLog from './components/EventLog/EventLog.vue';
	import { usePawnStore } from './stores/pawn';
	import AppPrompt from './components/Menus/AppPrompt.vue';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import AppCreditsMenu from './components/Menus/AppCreditsMenu.vue';
	import AppTimelineMenu from './components/Menus/AppTimelineMenu.vue';
	import { useTimelineStore } from './stores/timeline';
	import AppSkillsMenu from './components/Menus/AppSkillsMenu.vue';
	import { useSettingsStore } from './stores/settings';
	import { ref, onBeforeUpdate, onMounted } from 'vue';
	import { openingCutscene } from './stores/cutscene';
	import { useFilterStore } from './stores/filters';
	const timelineStore = useTimelineStore();
	const settings = useSettingsStore();
	const playerStore = usePawnStore();
	const levelStore = useLevelStore();

	onBeforeUpdate(() => {
		switch (timelineStore.currentTime) {
			case 0:
				useFilterStore().enableFilter('morning');
				break;
			case 1:
				useFilterStore().disableFilter();
				break;
			case 2:
				useFilterStore().enableFilter('evening');
				break;
			case 3:
				useFilterStore().enableFilter('night');
				break;
		}
	});
	// levelStore.openLevel('Name4_House', false, [4, 7, 'w']); //, //[30, 9, 'n']);
	onMounted(() => {
		if (true) {
			openingCutscene();
		} else {
			levelStore.openLevel('Name4_House', false, [4, 7, 'w']);
		}
	});

	const seeTimeline = () => {
		console.log(timelineStore);
	};
</script>
<template>
	<div class="gameArea">
		<div
			class="playArea"
			id="modal-target">
			<PlayArea />
		</div>
		<div>
			<div class="buttons">
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
	</div>
	<button :onClick="seeTimeline">See Timeline</button>
	<AppPrompt />
	<AppTimelineMenu />
	<AppSkillsMenu />
	<AppSettingsMenu />
	<AppCreditsMenu />
</template>
<style scoped>
	.gameArea {
		box-sizing: border-box;
		/* width: 50vw; */
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

	.buttons {
		display: inline-flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: var(--menuSide);
		width: calc(var(--menuSide) * 4);
		/* width: calc(var(--menuSide) * var(--menuColumnNumber)); */
	}
</style>
