import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '@/stores/prompt';
import { useLevelStore } from '../stores/level';
import { useSpriteStore } from '@/stores/sprite';
import { storeToRefs } from 'pinia';

const openLevel1 = () => {
	// Set up level store and retrieve necessary values
	const levelStore = useLevelStore();
	const { levelMatrix } = storeToRefs(levelStore);
	const spriteStore = useSpriteStore();
	const { characterPosition } = useSpriteStore();

	// Set up sprite store and register sprites
	spriteStore.registerSprite(true, [7, 4, 's'], async () => {
		await levelStore.openLevel('level0', characterPosition);
	});
};

export default openLevel1;
