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

	const inventoryMenuIsOpen = ref(false);
	function openInventoryMenu() {
		inventoryMenuIsOpen.value = true;
	}
	function closeInventoryMenu() {
		inventoryMenuIsOpen.value = false;
	}

	const skillsMenuIsOpen = ref(false);
	function openSkillsMenu() {
		skillsMenuIsOpen.value = true;
	}
	function closeSkillsMenu() {
		skillsMenuIsOpen.value = false;
	}

	const creditsMenuIsOpen = ref(false);
	function openCreditsMenu() {
		creditsMenuIsOpen.value = true;
	}
	function closeCreditsMenu() {
		creditsMenuIsOpen.value = false;
	}

	return {
		// Game settings
		settingsMenuIsOpen,
		openSettingsMenu,
		closeSettingsMenu,
		inventoryMenuIsOpen,
		openInventoryMenu,
		closeInventoryMenu,
		skillsMenuIsOpen,
		openSkillsMenu,
		closeSkillsMenu,
		creditsMenuIsOpen,
		openCreditsMenu,
		closeCreditsMenu,
	};
});
