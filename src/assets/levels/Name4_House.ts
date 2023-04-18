import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName4_HouseLevel = () => {
	const pawnStore = usePawnStore();
	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [10, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [31, 7, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName4_HouseLevel;
