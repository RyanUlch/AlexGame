<script setup lang="ts">
	import { useLevelStore } from './stores/level';
	import PlayArea from './components/PlayArea/PlayArea.vue';
	import MenuButton from './components/MenuButton/MenuButton.vue';
	import EventLog from './components/EventLog/EventLog.vue';
	import { usePawnStore } from './stores/pawn';
	import AppPrompt from './components/Menus/AppPrompt.vue';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import AppCreditsMenu from './components/Menus/AppCreditsMenu.vue';
	import AppTimelineMenu from './components/Menus/AppTimelineMenu.vue';
	import AppGameOver from './components/Menus/AppGameOver.vue';
	import AppStart from './components/Menus/AppStart.vue';
	import { useTimelineStore } from './stores/timeline';
	import { useSettingsStore } from './stores/settings';
	import { onBeforeUpdate, onMounted } from 'vue';
	import { openingCutscene } from './stores/cutscene';
	import { useFilterStore } from './stores/filters';
	import { AudioPlayer } from './Audio/Audio';
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
	// levelStore.openLevel('Alex_House', false, [4, 7, 'w']); //, //[30, 9, 'n']);
	onMounted(() => {
		const muted = localStorage.getItem('muted');
		if (muted === 'true') {
			AudioPlayer.mute();
		} else {
			AudioPlayer.unmute();
		}

		const volume = localStorage.getItem('volume');
		if (volume) {
			AudioPlayer.setVolume(+volume / 100);
		}

		settings.openOpeningMenu();
		if (false) {
			// openingCutscene();
		} else {
			// timelineStore.currentTime = 0;
			// levelStore.openLevel('Bluffs_Full', false, [31, 9, 'n']);
			// timelineStore.gameStarted = true;
			// timelineStore.endingChoice = 1;
		}
	});

	// Sam = Sam
	// Abigail = Abigail
	// Lavelle = Lavelle
	// Teddy = Teddy
	// Alex =
	// Rebecca = Rebecca
</script>
<template>
	<div class="gameArea">
		<div
			class="playArea"
			id="modal-target">
			<PlayArea />
		</div>
		<div style="height: 100%; overflow: hidden">
			<div class="buttons">
				<MenuButton
					:modalHandler="settings.openInventoryMenu"
					imgFileName="Time"
					tooltip="Time Menu" />

				<MenuButton
					:modalHandler="settings.openSettingsMenu"
					imgFileName="Menu"
					tooltip="Open settings" />
				<MenuButton
					:modalHandler="settings.openCreditsMenu"
					imgFileName="Credits"
					tooltip="Open credits" />
			</div>
			<EventLog />
		</div>
	</div>
	<AppStart />
	<AppPrompt />
	<AppTimelineMenu />
	<AppSettingsMenu />
	<AppCreditsMenu />
	<AppGameOver />
</template>
<style scoped>
	.gameArea {
		box-sizing: border-box;
		height: 665px;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		border: var(--borderSize) solid var(--borderColor);
		box-shadow: 20px 20px 30px black;
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
		width: calc(var(--menuSide) * 3);
	}
</style>
