import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';

const openName2_House_UpperLevel = () => {
	const pawnStore = usePawnStore();
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
