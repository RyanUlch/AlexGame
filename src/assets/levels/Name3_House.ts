import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName3_HouseLevel = () => {
	const pawnStore = usePawnStore();

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [33, 46, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName3_HouseLevel;
