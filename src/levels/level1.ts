import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '../stores/prompt';
import { useMenuStore } from '../stores/menus';
import { useLevelStore } from '../stores/level';
import { useSpriteStore } from '../stores/sprite';
import { storeToRefs } from 'pinia';

const openLevel1 = () => {
	// Set up level store and retrieve necessary values
	const { dontUseAudio } = storeToRefs(useMenuStore());
	const levelStore = useLevelStore();
	const { levelMatrix } = storeToRefs(levelStore);
	const spriteStore = useSpriteStore();
	const { characterPosition } = useSpriteStore();

	// Set up sprite store and register sprites
	spriteStore.registerSprite(true, [7, 4, 's'], async () => {
		const openDoorSound = new Audio('src/assets/audio/doorOpen.mp3');
		if (!dontUseAudio.value) {
			openDoorSound.play();
		}
		await levelStore.openLevel('level0', characterPosition);
	});
};

export default openLevel1;
