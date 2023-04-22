import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';

import type { Sprite } from '@/stores/pawn';

const openSam_House_FullLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const fruit: Sprite = {
		spriteId: 'fruit',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['fruit', 'environment'],
	};
	pawnStore.registerSprite(fruit);

	const shelf0: Sprite = {
		spriteId: 'shelf0',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 6],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['shelf0', 'environment'],
	};
	pawnStore.registerSprite(shelf0);
	const shelf1: Sprite = {
		spriteId: 'shelf1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 7],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['shelf0', 'environment'],
	};
	pawnStore.registerSprite(shelf1);

	if (!timelineStore.Sam_atFarm && timelineStore.currentTime === 2) {
		const Sam: Sprite = {
			spriteId: 'Sam',
			spriteSrc: 'Sam',
			isCharacter: false,
			isAutoInteract: false,
			position: [6, 2],
			coords: [0, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['0e0', 'Sam'],
		};
		pawnStore.registerSprite(Sam);
	} else if (timelineStore.Sam_hate && timelineStore.currentTime === 3) {
		const Sam: Sprite = {
			spriteId: 'Sam',
			spriteSrc: 'Sam',
			isCharacter: false,
			isAutoInteract: false,
			position: [6, 2],
			coords: [0, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['0n0', 'Sam'],
		};
		pawnStore.registerSprite(Sam);
	}

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [15, 41, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openSam_House_FullLevel;
