import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName1_House_UpperBedBothLevel = () => {
	const pawnStore = usePawnStore();
	const Name1: Sprite = {
		spriteId: 'Name1',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 5],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['1n1'],
	};
	pawnStore.registerSprite(Name1);

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
export default openName1_House_UpperBedBothLevel;
