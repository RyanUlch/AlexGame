import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '../stores/prompt';
import { useSettingsStore } from '../stores/settings';
import { useLevelStore } from '../stores/level';
import { useSpriteStore } from '../stores/sprite';
import { storeToRefs } from 'pinia';

const openLevel1 = () => {
	const { addLogLine } = useLogComposable();
	// Set up level store and retrieve necessary values
	const { isNoAudio } = storeToRefs(useSettingsStore());
	const levelStore = useLevelStore();
	const { levelMatrix } = storeToRefs(levelStore);
	const spriteStore = useSpriteStore();
	const { characterPosition } = useSpriteStore();

	// Set up sprite store and register sprites
	spriteStore.registerSprite(true, [7, 4, 's'], async () => {
		const openDoorSound = new Audio('src/assets/audio/doorOpen.mp3');
		if (!isNoAudio.value) {
			openDoorSound.play();
		}
		await levelStore.openLevel('level0', characterPosition);
	});

	spriteStore.registerSprite(false, [3, 8, 's'], async () => {
		if (levelMatrix.value[3][8].layeredImageCoord) {
			if (characterPosition[2] === 'e') {
				levelMatrix.value[3][8].layeredImageCoord[0] = 1;
			} else if (characterPosition[2] === 'n') {
				levelMatrix.value[3][8].layeredImageCoord[0] = 0;
			}
		}
		const result = await usePromptStore().doConversation('lady in house');
		if (result === 'leave') {
			characterPosition[2] = 'w';
			addLogLine(`That was awkward...`);
		}
	});
};

export default openLevel1;
