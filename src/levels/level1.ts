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
	const { characterId, scale } = storeToRefs(spriteStore);
	const { characterPosition } = useSpriteStore();
	const { addLogLine } = useLogComposable();

	// Set up sprite store and register sprites
	spriteStore.registerSprite([2, 1, 's'], async () => {
		await levelStore.openLevel('level1', characterPosition);
	});
};

export default openLevel1;
