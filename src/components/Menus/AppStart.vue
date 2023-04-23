<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { useTimelineStore } from '@/stores/timeline';
	import { computed } from 'vue';
	import AppModal from './AppModal.vue';
	import { openingCutscene } from '@/stores/cutscene';
	const timelineStore = useTimelineStore();
	const settingStore = useSettingsStore();

	const startGame = () => {
		settingStore.closeOpeningsMenu();
		openingCutscene();
	};
</script>

<template>
	<AppModal
		v-if="settingStore.openingIsOpen"
		title="Welcome"
		:noClose="true">
		<template v-slot="modal">
			<div class="full">
				<h2 class="title">Welcome to The Game</h2>
				<p class="p">&emsp;&emsp;&emsp;This is an investigation and exploration game.</p>
				<p class="p">
					&emsp;&emsp;&emsp;Use WASD or the arrow keys to move, and "Enter" to interact with your
					environment.
				</p>

				<p class="p">
					&emsp;&emsp;&emsp;This game is designed to be played in one sitting, the completion time
					is estimated around 45 minutes.
				</p>
				<p class="p">
					&emsp;&emsp;&emsp;You will be able to explore to your hearts content, the game will give
					you a prompt before you enter the end-game.
				</p>
				<p class="p">
					&emsp;&emsp;&emsp;If you are ready to begin, click the button below and enjoy!
				</p>
				<button
					class="advanceBtn"
					@click="startGame">
					Let's Go!
				</button>
				<p class="hint">
					Please Note: This game is intended to be played with keyboard and mouse, on a screen with
					a width of at least 1000px. Apologies for anyone attempting to play this on mobile.
				</p>
			</div>
		</template>
	</AppModal>
</template>

<style scoped>
	.title {
		padding-bottom: 20px;
		text-decoration: underline;
		text-align: center;
	}
	.p {
		padding: 10px;
		line-height: 1rem;
	}

	.center {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.link {
		text-align: center;
	}
	.full {
		height: 34rem;
	}
	.textContainer {
		/* overflow-y: scroll; */
		height: 100%;
	}
	.hint {
		border: 1px solid black;
		width: 90%;
		margin: 10px auto;
		padding: 10px;
		font-size: 0.8rem;
		line-height: 1.2rem;
		background-color: var(--modal-header-background);
	}
	.advanceBtn {
		width: 100%;
		height: 40px;
		background-color: var(--modal-header-background);
	}
</style>
