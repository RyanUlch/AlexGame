import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import { BluffsCutscene } from '@/stores/cutscene';
import type { Sprite } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
const openBluffs_FullLevel = () => {
	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();
	const timelineStore = useTimelineStore();

	if (timelineStore.currentTime === 2) {
		const Teddy: Sprite = {
			spriteId: 'Teddy',
			spriteSrc: 'Teddy',
			isCharacter: true,
			isAutoInteract: false,
			position: [27, 11],
			coords: [3, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['3e0', 'Teddy'],
		};
		pawnStore.registerSprite(Teddy);
	} else if (timelineStore.currentTime === 3) {
		if (!timelineStore.conversationsActivated['fc0']) {
			BluffsCutscene();
		}
		if (timelineStore.Alex_dead) {
			levelStore.levelMatrix[26][11].layers[1].coord = [6, 5];
		}
	}

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 8],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [1, 14, 's']],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 9],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [1, 15, 's']],
	};
	pawnStore.registerSprite(Market1);
	pawnStore.registerSprite(Market2);
};
export default openBluffs_FullLevel;
