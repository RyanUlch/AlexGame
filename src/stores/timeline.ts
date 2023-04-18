// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const useTimelineStore = defineStore('timelineStore', () => {
	const currentTime = ref(0);

	const advanceTime = () => {
		if (currentTime.value === 3) {
			currentTime.value = 0;
		} else {
			currentTime.value += 1;
		}
	};

	// Name0
	const Name0_bitter = ref(false);
	const Name0_hate = ref(false);
	const Name0_understanding = ref(false);
	const Name0_atFarm = ref(false);
	const Name0_Moving = ref(false);

	// Name1
	const Name1_angry = ref(false);
	const Name1_GaveUp = ref(false);

	//Name2
	const Name2_home = ref(false);

	// Name3
	const Name3_follow = ref(false);

	// prettier-ignore
	return {
		currentTime, // Save
		advanceTime,
		Name0_bitter,
		Name0_hate,
		Name0_understanding,
		Name0_atFarm,
		Name0_Moving,
		Name1_angry,
		Name1_GaveUp,
		Name2_home,
		Name3_follow,
	};
});
