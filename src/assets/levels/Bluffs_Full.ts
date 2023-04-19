import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openBluffs_FullLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	if (timelineStore.currentTime === 2) {
		const Name3: Sprite = {
			spriteId: 'Name3',
			spriteSrc: 'Name3',
			isCharacter: true,
			isAutoInteract: false,
			position: [27, 11],
			coords: [3, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['3e0'],
		};
		pawnStore.registerSprite(Name3);
	}

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 8],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 14, 's']],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 9],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 15, 's']],
	};
	const Market3: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 10],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 16, 's']],
	};
	pawnStore.registerSprite(Market1);
	pawnStore.registerSprite(Market2);
	pawnStore.registerSprite(Market3);
};
export default openBluffs_FullLevel;
