<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { ref, onUpdated } from 'vue';
	import AppModal from './AppModal.vue';
	import { AudioPlayer } from '@/Audio/Audio';
	import { useLogComposable } from '@/composables/logComposable';

	const settingStore = useSettingsStore();

	const volume = ref<number>(100);
	const muted = ref<boolean>(false);
	onUpdated(() => {
		if (muted.value) AudioPlayer.mute();
		else AudioPlayer.unmute();
		AudioPlayer.setVolume(volume.value / 100);
	});
</script>

<template>
	<AppModal
		v-if="settingStore.settingsMenuIsOpen"
		title="Settings"
		@close="settingStore.closeSettingsMenu">
		<template v-slot="modal">
			<!-- <label for="load">Import Save</label>
			<input
				id="load"
				type="file"
				title="Load Save" />
			<button :onClick="exportToFile">Export Save</button>
			<button :onClick="saveToStorage">Save</button>
			<button :onClick="loadFromStorage">Load</button> -->
			<div class="settingGroup">
				<label for="muted">Mute All Sounds:&nbsp;</label>
				<input
					type="checkbox"
					id="muted"
					name="muted"
					v-model="muted" />
			</div>
			<div class="settingGroup">
				<label for="vol">Set Volume:</label>

				<input
					type="range"
					id="vol"
					name="vol"
					min="0"
					max="100"
					v-model.number="volume" />
			</div>
		</template>
	</AppModal>
</template>

<style scoped>
	.settingGroup {
		padding: 10px;
	}
</style>
