import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useLogComposable } from '@/composables/logComposable';

export const useMenuStore = defineStore('menus', () => {
	// Dev Logger
	const { addLogLine } = useLogComposable();

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
	const someGameSetting = ref(1);

	return {
		// Game settings
		settingsMenuIsOpen,
		openSettingsMenu,
		closeSettingsMenu,
		someGameSetting,
	};
});
