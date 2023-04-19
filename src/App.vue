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
	import AppInventoryMenu from './components/Menus/AppInventoryMenu.vue';
	import { useTimelineStore } from './stores/timeline';
	import AppSkillsMenu from './components/Menus/AppSkillsMenu.vue';
	import { useSettingsStore } from './stores/settings';
	import { ref, onBeforeUpdate } from 'vue';
	import { FarmBothCutscene, MarketCutscene, openingCutscene } from './stores/cutscene';
	import { AudioPlayer } from './Audio/Audio';
	import { useFilterStore } from './stores/filters';
	const timelineStore = useTimelineStore();
	const settings = useSettingsStore();
	const playerStore = usePawnStore();
	// Starting Deck
	const levelStore = useLevelStore();
	// levelStore.openLevel('char1_house');

	// const levels = [
	// 	'Market',
	// 	'Village',
	// 	'Bluffs',
	// 	'Char1_House',
	// 	'Char2_House_Lower',
	// 	'Char2_House_Upper',
	// 	'Char3_House_Lower',
	// 	'Char3_House_Upper',
	// 	'Char4_House',
	// 	'Char5_House',
	// 	'Tavern',
	// 	'Farm',
	// ];

	// const onLevel = ref(0);
	// const cycleLevel = () => {
	// 	if (onLevel.value === levels.length) {
	// 		onLevel.value = 0;
	// 	}
	// 	levelStore.openLevel(levels[onLevel.value]);
	// 	++onLevel.value;
	// };

	// setTimeout(() => {
	// 	exampleCutscene();
	// }, 1000);
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

	// useFilterStore().enableFilter('night');
	setTimeout(() => {
		MarketCutscene();
	}, 1000);

	// levelStore.openLevel('Village'); //, //[30, 9, 'n']);
	const advance = () => {
		timelineStore.advanceTime();
	};
</script>
<template>
	<div class="gameArea">
		<div
			class="playArea"
			id="modal-target">
			<PlayArea />
		</div>
		<!-- <div class="upper-right">
			<div class="statArea square">
				 <StatsUi
					:value=""
					:maxValue=""
					:isIconBased="true"
					iconFileBase="fileName"
					:hasPartialIcons="true"
					tooltip="" />
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
			
		</div> -->
		<!-- </div> -->
		<EventLog />
		<p
			class="button"
			:onClick="advance">
			Advance Time
		</p>
		<div class="block">
			<div class="varTemp">
				<h4>{{ levelStore.levelNameRef }}</h4>
				<p>Current Time: {{ timelineStore.currentTime }}</p>
				<p
					:onClick="
						() => {
							timelineStore.Name0_bitter = !timelineStore.Name0_bitter;
						}
					"
					:style="{ backgroundColor: timelineStore.Name0_bitter ? 'green' : 'red' }">
					Name0_bitter: {{ timelineStore.Name0_bitter }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name0_hate = !timelineStore.Name0_hate;
						}
					"
					:style="{ backgroundColor: timelineStore.Name0_hate ? 'green' : 'red' }">
					Name0_hate: {{ timelineStore.Name0_hate }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name0_understanding = !timelineStore.Name0_understanding;
						}
					"
					:style="{ backgroundColor: timelineStore.Name0_understanding ? 'green' : 'red' }">
					Name0_understanding: {{ timelineStore.Name0_understanding }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name0_atFarm = !timelineStore.Name0_atFarm;
						}
					"
					:style="{ backgroundColor: timelineStore.Name0_atFarm ? 'green' : 'red' }">
					Name0_atFarm: {{ timelineStore.Name0_atFarm }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name0_Moving = !timelineStore.Name0_Moving;
						}
					"
					:style="{ backgroundColor: timelineStore.Name0_Moving ? 'green' : 'red' }">
					Name0_Moving: {{ timelineStore.Name0_Moving }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name1_angry = !timelineStore.Name1_angry;
						}
					"
					:style="{ backgroundColor: timelineStore.Name1_angry ? 'green' : 'red' }">
					Name1_angry: {{ timelineStore.Name1_angry }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name1_GaveUp = !timelineStore.Name1_GaveUp;
						}
					"
					:style="{ backgroundColor: timelineStore.Name1_GaveUp ? 'green' : 'red' }">
					Name1_GaveUp: {{ timelineStore.Name1_GaveUp }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name2_home = !timelineStore.Name2_home;
						}
					"
					:style="{ backgroundColor: timelineStore.Name2_home ? 'green' : 'red' }">
					Name2_home: {{ timelineStore.Name2_home }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name3_follow = !timelineStore.Name3_follow;
						}
					"
					:style="{ backgroundColor: timelineStore.Name3_follow ? 'green' : 'red' }">
					Name3_follow: {{ timelineStore.Name3_follow }}
				</p>
				<p
					:onClick="
						() => {
							timelineStore.Name4_dead = !timelineStore.Name3_follow;
						}
					"
					:style="{ backgroundColor: timelineStore.Name4_dead ? 'green' : 'red' }">
					Name4_dead: {{ timelineStore.Name4_dead }}
				</p>
			</div>
			<div class="convo">
				<p
					v-for="(convo, key) of timelineStore.conversationsActivated"
					:style="{ backgroundColor: convo ? 'green' : 'red' }">
					{{ key }}
				</p>
			</div>
		</div>
	</div>

	<AppPrompt />
	<AppInventoryMenu />
	<AppSkillsMenu />
	<AppSettingsMenu />
	<AppCreditsMenu />
</template>
<style scoped>
	.button {
		border: 1px solid black;
	}
	.block {
		display: block;
		width: 100%;
		height: 30vh;
	}
	.convo {
		display: inline-flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 25%;
		height: 90%;
	}

	.convo > p {
		border: 1px solid black;
		text-align: center;
	}

	p {
		padding: 1px;
	}
	.varTemp {
		display: inline-flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding-left: 10px;
		width: 50%;
	}

	.varTemp > p {
		/* margin-top: 20px; */
		border: 1px solid black;
	}
	.square {
		width: 150px;
		height: 146px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.gameArea {
		box-sizing: border-box;
		width: 100vw;
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
