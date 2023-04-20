// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePawnStore } from './pawn';

export const useTimelineStore = defineStore('timelineStore', () => {
	const currentTime = ref(0);
	const levelStore = useLevelStore();
	const pawnStore = usePawnStore();

	const advanceTime = () => {
		if (currentTime.value === 3) {
			currentTime.value = 0;
			levelStore.openLevelArea(levelStore.levelNameRef, pawnStore.characterPosition);
		} else {
			currentTime.value += 1;
			levelStore.openLevelArea(levelStore.levelNameRef, pawnStore.characterPosition);
		}
	};

	// prettier-ignore
	const conversationsActivated: {[convoName: string]: boolean} = {
		'0m0': false,
		'1m0': false,
		'2m0': false,
		'3m0': false,
		'4m0': false,
		'0a0': false,
		'1a0': false,
		'2a0': false,
		'3a0': false,
		'4a0': false,
		'0e0': false,
		'0e1': false,
		'0e2': false,
		'1e0': false,
		'1e1': false,
		'1e2': false,
		'2e0': false,
		'2e1': false,
		'4e0': false,
		'3e0': false,
		'0n0': false,
		'0n1': false,
		'1n0': false,
		'1n1': false,
		'1n2': false,
		'2n0': false,
		'2n1': false,
		'2n2': false,
		'3n0': false,
		'23a0': false,
		'24a0': false,
		'01e0': false,
		'014e0': false,
		'04e0': false,
		'23n0': false,
		'23n1': false,
		'23n2': false,
		'24n0': false,
		'24n1': false,
		'fc0': false,
	}

	// Name0
	const Name0_bitter = ref(false);
	const Name0_hate = ref(false);
	const Name0_understanding = ref(false);
	const Name0_atFarm = ref(false);
	const Name0_Moving = ref(true);

	// Name1
	const Name1_angry = ref(false);
	const Name1_GaveUp = ref(true);

	//Name2
	const Name2_home = ref(true);
	const Name2_sawDeath = ref(false);

	// Name3
	const Name3_follow = ref(false);

	// Name4
	const Name4_dead = ref(false);

	// Cutscenes happened
	const farmSceneOccurred = ref(false);

	// Final Scene
	const finalSceneControl = ref(false);
	const endingChoice = ref(-1);
	const PCKillsName3 = ref(false);

	// prettier-ignore
	return {
		currentTime, 			// Save
		conversationsActivated, // Save
		advanceTime,
		Name0_bitter,
		Name0_hate,
		Name0_understanding,
		Name0_atFarm,
		Name0_Moving,
		Name1_angry,
		Name1_GaveUp,
		Name2_home,
		Name2_sawDeath,
		Name3_follow,
		Name4_dead,
		farmSceneOccurred,
		finalSceneControl,
		endingChoice,
		PCKillsName3,
	};
});
