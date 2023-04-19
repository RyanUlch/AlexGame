import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openName1_House_UpperBedLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	if (timelineStore.Name1_GaveUp) {
		const Name1: Sprite = {
			spriteId: 'Name1',
			isCharacter: false,
			isAutoInteract: false,
			position: [5, 5],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['1n0'],
		};
		pawnStore.registerSprite(Name1);
	} else {
		const Name1: Sprite = {
			spriteId: 'Name1',
			isCharacter: false,
			isAutoInteract: false,
			position: [5, 5],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['1n2'],
		};
		pawnStore.registerSprite(Name1);
	}

	const Lower: Sprite = {
		spriteId: 'Lower',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 5],
		interactionName: 'openLevel',
		interactionArgs: ['1', [4, 7, 's']],
	};
	pawnStore.registerSprite(Lower);
};
export default openName1_House_UpperBedLevel;
