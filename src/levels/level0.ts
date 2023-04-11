import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '../stores/prompt';
import { useLevelStore } from '../stores/level';
import { useSpriteStore } from '../stores/sprite';
import { storeToRefs } from 'pinia';
import { AudioPlayer } from '../Audio/Audio';

const openLevel0 = () => {
	// Set up level store and retrieve necessary values

	const levelStore = useLevelStore();

	const { levelMatrix } = storeToRefs(levelStore);
	const spriteStore = useSpriteStore();
	const { characterId } = storeToRefs(spriteStore);
	const { characterPosition } = useSpriteStore();
	const { addLogLine } = useLogComposable();

	// Set up sprite store and register sprites
	spriteStore.registerSprite(false, [2, 1, 's'], async () => {
		const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');
		openDoorSound.play();
		await levelStore.openLevel('level1', characterPosition);
	});

	if (characterId.value === '1') {
		spriteStore.registerSprite(false, [5, 2, 'n'], async () => {
			const result = await usePromptStore().doConversation('hat convo');
			if (result === 'hatWear') {
				characterId.value = '0';
				spriteStore.deregisterSprite(1);
				levelMatrix.value[5][2].impassible = false;
				levelMatrix.value[5][2].layeredImageSrc = undefined;
				levelMatrix.value[5][2].layeredImageCoord = undefined;
				addLogLine(`You found your hat..... cool.`);
			}
		});
	} else {
		levelMatrix.value[5][2].impassible = false;
		levelMatrix.value[5][2].layeredImageSrc = undefined;
		levelMatrix.value[5][2].layeredImageCoord = undefined;
	}
};

export default openLevel0;
