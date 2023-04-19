import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';

const openName2_House_UpperLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	if (timelineStore.currentTime === 0) {
		const Name3: Sprite = {
			spriteId: 'Name3',
			spriteSrc: 'Name3',
			isCharacter: true,
			isAutoInteract: false,
			position: [4, 3],
			coords: [3, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3m0'],
		};
		pawnStore.registerSprite(Name3);
	}

	const Name2House_Lower: Sprite = {
		spriteId: 'Name2House',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Name2_House_LowerOpen', [3, 5, 's']],
	};
	pawnStore.registerSprite(Name2House_Lower);
};
export default openName2_House_UpperLevel;
