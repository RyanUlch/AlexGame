import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName2_House_LowerClosedLevel = () => {
	const pawnStore = usePawnStore();
	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 4],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [17, 14, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName2_House_LowerClosedLevel;
