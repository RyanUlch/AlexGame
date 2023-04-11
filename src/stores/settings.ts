import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
	const isNoAudio = ref(false);

	// Game settings
	const settingsMenuIsOpen = ref(false);
	function openSettingsMenu() {
		// addLogLine('Opening Settings Menu', true);
		settingsMenuIsOpen.value = true;
	}
	function closeSettingsMenu() {
		// addLogLine('Opening Settings Menu', true);
		settingsMenuIsOpen.value = false;
	}

	return {
		// Settings
		isNoAudio,
		// Game settings
		settingsMenuIsOpen,
		openSettingsMenu,
		closeSettingsMenu,
	};
});
