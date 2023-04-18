import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName1_House_UpperLevel = () => {
	const pawnStore = usePawnStore();
	const Lower: Sprite = {
		spriteId: 'Lower',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Name1_House_Lower', [4, 7, 's']],
	};
	pawnStore.registerSprite(Lower);
};
export default openName1_House_UpperLevel;
