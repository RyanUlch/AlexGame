// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useTimelineStore = defineStore('timelineStore', () => {
	const characterStatus: { [name: string]: { isAlive: boolean } } = reactive({
		joan: { isAlive: true },
	});

	const isCharacterAlive = (name: string) => {
		console.log(characterStatus[name]);
		return characterStatus[name].isAlive;
	};

	const killCharacter = (name: string) => {
		characterStatus[name].isAlive = false;
		console.log(characterStatus);
	};

	// prettier-ignore
	return {
		characterStatus, // Save
		isCharacterAlive,
		killCharacter,
	};
});
