import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '../stores/prompt';
import { useLevelStore } from '../stores/level';
import { usePawnStore } from '@/stores/pawn';
import { AudioPlayer } from '../Audio/Audio';

const openLevel0 = () => {
	// Set up level store and retrieve necessary values

	const levelStore = useLevelStore();
	const pawnStore = usePawnStore();
	const { addLogLine } = useLogComposable();

	// Set up sprite store and register sprites
	pawnStore.registerSprite(
		'houseDoor',
		false,
		[2, 1, 's'],
		async () => {
			const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');
			openDoorSound.play();
			await levelStore.openLevel('level1', pawnStore.characterPosition);
		},
		0,
		() => {},
	);

	if (pawnStore.characterId === '1') {
		pawnStore.registerSprite(
			'hat',
			false,
			[5, 2, 'n'],
			async () => {
				const result = await usePromptStore().doConversation('hat convo');
				if (result === 'hatWear') {
					pawnStore.characterId = '0';
					pawnStore.deregisterSprite(1);
					levelStore.levelMatrix[5][2].impassible = false;
					levelStore.levelMatrix[5][2].layeredImageSrc = undefined;
					levelStore.levelMatrix[5][2].layeredImageCoord = undefined;
					addLogLine(`You found your hat..... cool.`);
				}
			},
			0,
			() => {},
		);
	} else {
		levelStore.levelMatrix[5][2].impassible = false;
		levelStore.levelMatrix[5][2].layeredImageSrc = undefined;
		levelStore.levelMatrix[5][2].layeredImageCoord = undefined;
	}
};

export default openLevel0;
