import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import { FarmCutscene, FarmBothCutscene } from '@/stores/cutscene';
import type { Sprite } from '@/stores/pawn';
const openFarm_HalfLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	console.log(timelineStore.conversationsActivated['014e0']);
	if (timelineStore.Sam_atFarm) {
		if (!timelineStore.conversationsActivated['014e0']) {
			FarmBothCutscene();
		}
		if (timelineStore.Abigail_angry) {
			const Sam: Sprite = {
				spriteId: 'Sam',
				spriteSrc: 'Sam',
				isCharacter: true,
				isAutoInteract: false,
				position: [8, 22],
				coords: [3, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['0e2'],
			};
			pawnStore.registerSprite(Sam);
			const Abigail: Sprite = {
				spriteId: 'Abigail',
				spriteSrc: 'Abigail',
				isCharacter: true,
				isAutoInteract: false,
				position: [7, 22],
				coords: [0, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['1e2'],
			};
			pawnStore.registerSprite(Abigail);
		} else {
			const Sam: Sprite = {
				spriteId: 'Sam',
				spriteSrc: 'Sam',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 13],
				coords: [1, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['0e1'],
			};
			pawnStore.registerSprite(Sam);
			const Abigail: Sprite = {
				spriteId: 'Abigail',
				spriteSrc: 'Abigail',
				isCharacter: true,
				isAutoInteract: false,
				position: [2, 10],
				coords: [2, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['1e0'],
			};
			pawnStore.registerSprite(Abigail);
		}
	} else {
		if (!timelineStore.conversationsActivated['14e0']) {
			FarmCutscene();
		}
		const Abigail: Sprite = {
			spriteId: 'Abigail',
			spriteSrc: 'Abigail',
			isCharacter: true,
			isAutoInteract: false,
			position: [3, 13],
			coords: [1, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['1e1'],
		};
		pawnStore.registerSprite(Abigail);
	}

	const House1: Sprite = {
		spriteId: 'House1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 22],
		interactionName: 'openLevel',
		interactionArgs: ['1', [6, 4, 'n'], 'doorOpen'],
	};
	const House2: Sprite = {
		spriteId: 'House2',
		isCharacter: false,
		isAutoInteract: true,
		position: [2, 19],
		interactionName: 'openLevel',
		interactionArgs: ['1', [5, 2, 'e'], 'doorOpen'],
	};
	pawnStore.registerSprite(House1);
	pawnStore.registerSprite(House2);

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [10, 0],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [13, 25, 'w']],
	};
	pawnStore.registerSprite(Market1);

	// Village // Village // Village // Village // Village // Village // Village // Village // Village // Village
	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [11, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [11, 48, 'w']],
	};
	pawnStore.registerSprite(Village);

	const Sign: Sprite = {
		spriteId: 'Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [11, 2],
		interactionName: 'readout',
		interactionArgs: ['Town Square: West, Village: South'],
	};
	pawnStore.registerSprite(Sign);
};
export default openFarm_HalfLevel;
