<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { ref, onUpdated } from 'vue';
	import { storeToRefs } from 'pinia';
	import AppModal from './AppModal.vue';
	import { AudioPlayer } from '@/Audio/Audio';
	import exportSave from '../../save_load/save_export';
	// import importSave from '../../save_load/save_import';
	import save from '../../save_load/save_localStorage';
	import load from '../../save_load/load_localStorage';
	import { useLogComposable } from '@/composables/logComposable';

	const { addLogLine } = useLogComposable();

	const settingStore = useSettingsStore();

	const volume = ref<number>(100);
	const muted = ref<boolean>(false);
	onUpdated(() => {
		AudioPlayer.isMuted = muted.value;
		AudioPlayer.volume = volume.value;
	});

	const loadFromStorage = () => {
		if (load()) {
			addLogLine('Loaded Save');
		} else {
			addLogLine('Failed to load Save');
		}
	};

	const importFromFile = () => {
		// if (importSave()) {
		addLogLine('Imported Save');
		// } else {
		addLogLine('Failed to import Save');
		// }
	};

	const saveToStorage = () => {
		if (save()) {
			addLogLine('Game Saved!');
		} else {
			addLogLine('Failed to save');
		}
	};

	const exportToFile = () => {
		if (exportSave('file')) {
			addLogLine('Game Saved!');
		} else {
			addLogLine('Failed to export Save');
		}
	};
</script>

<template>
	<AppModal
		v-if="settingStore.settingsMenuIsOpen"
		title="Settings"
		@close="settingStore.closeSettingsMenu">
		<template v-slot="modal">
			<label for="load">Import Save</label>
			<input
				id="load"
				type="file"
				title="Load Save" />
			<button :onClick="exportToFile">Export Save</button>
			<button :onClick="saveToStorage">Save</button>
			<button :onClick="loadFromStorage">Load</button>
			<table>
				<tr>
					<td>Mute All Sounds:</td>
					<td>
						<input
							type="checkbox"
							id="muted"
							name="muted"
							v-model.boolean="muted" />
					</td>
					<td>Set Volume:</td>
					<td>
						<input
							type="range"
							id="vol"
							name="vol"
							min="0"
							max="100"
							v-model.number="volume" />
					</td>
				</tr>
			</table>
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>
