// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useLevelStore } from './level';
import { usePawnStore } from './pawn';

export const useTimelineStore = defineStore('timelineStore', () => {
	const currentTime = ref(0);
	const currentTimeString = computed(() => {
		switch (currentTime.value) {
			case 0:
				return 'in the Morning';
			case 1:
				return 'in the Afternoon';
			case 2:
				return 'in the evening';
			case 3:
				return 'at night';
		}
	});
	const levelStore = useLevelStore();
	const pawnStore = usePawnStore();

	const advanceTime = () => {
		if (currentTime.value === 3) {
			currentTime.value = 0;
			resetConversations();
			levelStore.openLevelArea('Name4_House', [4, 7, 'w']);
		} else {
			currentTime.value += 1;
			levelStore.openLevelArea(levelStore.levelNameRef, pawnStore.characterPosition);
		}
	};

	const resetConversations = () => {
		for (const convo in conversationsActivated) {
			conversationsActivated[convo] = false;
		}
		Sam_bitter.value = false;
		Sam_hate.value = false;
		Sam_understanding.value = false;
		Sam_atFarm.value = false;
		Sam_Moving.value = true;
		Abigail_angry.value = false;
		Abigail_GaveUp.value = true;
		Lavelle_home.value = true;
		Lavelle_toBluffs.value = false;
		Lavelle_sawDeath.value = false;
		Name3_follow.value = false;
		Name4_dead.value = false;
		farmSceneOccurred.value = false;
		finalSceneControl.value = false;
		endingChoice.value = -1;
		PCKillsName3.value = false;
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

	// Sam
	const Sam_bitter = ref(false);
	const Sam_hate = ref(false);
	const Sam_understanding = ref(false);
	const Sam_atFarm = ref(false);
	const Sam_Moving = ref(true);

	// Abigail
	const Abigail_angry = ref(false);
	const Abigail_GaveUp = ref(true);

	//Lavelle
	const Lavelle_home = ref(true);
	const Lavelle_toBluffs = ref(false);
	const Lavelle_sawDeath = ref(false);

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
		currentTimeString,
		advanceTime,
		Sam_bitter,
		Sam_hate,
		Sam_understanding,
		Sam_atFarm,
		Sam_Moving,
		Abigail_angry,
		Abigail_GaveUp,
		Lavelle_home,
		Lavelle_sawDeath,
		Lavelle_toBluffs,
		Name3_follow,
		Name4_dead,
		farmSceneOccurred,
		finalSceneControl,
		endingChoice,
		PCKillsName3,
	};
});
