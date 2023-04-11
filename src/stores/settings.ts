import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
	// Game settings
	const settingsMenuIsOpen = ref(false);
	function openSettingsMenu() {
		settingsMenuIsOpen.value = true;
	}
	function closeSettingsMenu() {
		settingsMenuIsOpen.value = false;
	}

	return {
		// Game settings
		settingsMenuIsOpen,
		openSettingsMenu,
		closeSettingsMenu,
	};
});
