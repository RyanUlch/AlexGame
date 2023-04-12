import { useLogComposable } from '../composables/logComposable';
import { usePromptStore } from '../stores/prompt';
import { useLevelStore } from '../stores/level';
import { AudioPlayer } from '../Audio/Audio';
import { usePawnStore } from '@/stores/pawn';

const openLevel1 = () => {
	const { addLogLine } = useLogComposable();
	// Set up level store and retrieve necessary values
	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();

	// Set up sprite store and register sprites
	pawnStore.registerSprite(
		'doorOutside',
		true,
		[7, 4, 's'],
		async () => {
			const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');
			openDoorSound.play();
			await levelStore.openLevel('level0', pawnStore.characterPosition);
		},
		0,
		() => {},
	);

	pawnStore.registerSprite(
		'joan',
		false,
		[3, 8, 's'],
		async () => {
			if (levelStore.levelMatrix[3][8].layeredImageCoord) {
				if (pawnStore.characterPosition[2] === 'e') {
					levelStore.levelMatrix[3][8].layeredImageCoord[0] = 1;
				} else if (pawnStore.characterPosition[2] === 'n') {
					levelStore.levelMatrix[3][8].layeredImageCoord[0] = 0;
				}
			}
			const result = await usePromptStore().doConversation('lady in house');
			if (result === 'leave') {
				pawnStore.characterPosition[2] = 'w';
				addLogLine(`That was awkward...`);
			}
		},
		10,
		() => {
			pawnStore.deregisterSprite(1);
			addLogLine(`Wow... She died.... Good job.`);
		},
	);
};

export default openLevel1;
