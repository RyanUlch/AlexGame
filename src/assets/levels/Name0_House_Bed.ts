import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName0_House_BedLevel = () => {
	const pawnStore = usePawnStore();
	const Name0: Sprite = {
		spriteId: 'Name0',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 2],
		interactionName: 'returnDialogue',
		interactionArgs: ['0n1'],
	};
	pawnStore.registerSprite(Name0);
};
export default openName0_House_BedLevel;
