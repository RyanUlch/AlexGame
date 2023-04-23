import { defineStore } from 'pinia';
import { useTimelineStore } from './timeline';
import { ref } from 'vue';
import { useCutsceneStore } from './cutscene';

export const useSettingsStore = defineStore('settings', () => {
	// Game settings
	const timelineStore = useTimelineStore();
	const cutsceneStore = useCutsceneStore();
	const anyOpen = ref(false);

	const settingsMenuIsOpen = ref(false);
	function openSettingsMenu() {
		if (!anyOpen.value && !cutsceneStore.cutsceneActive && timelineStore.gameStarted) {
			anyOpen.value = true;
			settingsMenuIsOpen.value = true;
		}
	}
	function closeSettingsMenu() {
		anyOpen.value = false;
		settingsMenuIsOpen.value = false;
	}

	const openingIsOpen = ref(false);
	function openOpeningMenu() {
		anyOpen.value = true;
		settingsMenuIsOpen.value = false;
		inventoryMenuIsOpen.value = false;
		creditsMenuIsOpen.value = false;
		endingIsOpen.value = false;
		openingIsOpen.value = true;
	}
	function closeOpeningsMenu() {
		anyOpen.value = false;
		openingIsOpen.value = false;
	}

	const endingIsOpen = ref(false);
	function openEndingsMenu() {
		anyOpen.value = true;
		settingsMenuIsOpen.value = false;
		inventoryMenuIsOpen.value = false;
		creditsMenuIsOpen.value = false;
		endingIsOpen.value = true;
	}
	function closeEndingsMenu() {
		anyOpen.value = false;
		endingIsOpen.value = false;
	}

	const inventoryMenuIsOpen = ref(false);
	function openInventoryMenu() {
		if (!anyOpen.value && !cutsceneStore.cutsceneActive && timelineStore.gameStarted) {
			anyOpen.value = true;
			inventoryMenuIsOpen.value = true;
		}
	}
	function closeInventoryMenu() {
		anyOpen.value = false;
		inventoryMenuIsOpen.value = false;
	}

	// const skillsMenuIsOpen = ref(false);
	// function openSkillsMenu() {
	// 	skillsMenuIsOpen.value = true;
	// }
	// function closeSkillsMenu() {
	// 	skillsMenuIsOpen.value = false;
	// }

	const creditsMenuIsOpen = ref(false);
	function openCreditsMenu() {
		if (!anyOpen.value && !cutsceneStore.cutsceneActive && timelineStore.gameStarted) {
			anyOpen.value = true;
			creditsMenuIsOpen.value = true;
		}
	}
	function closeCreditsMenu() {
		anyOpen.value = false;
		creditsMenuIsOpen.value = false;
	}

	return {
		anyOpen,
		// Game settings
		openingIsOpen,
		openOpeningMenu,
		closeOpeningsMenu,
		settingsMenuIsOpen,
		openSettingsMenu,
		closeSettingsMenu,
		endingIsOpen,
		openEndingsMenu,
		closeEndingsMenu,
		inventoryMenuIsOpen,
		openInventoryMenu,
		closeInventoryMenu,
		creditsMenuIsOpen,
		openCreditsMenu,
		closeCreditsMenu,
	};
});
