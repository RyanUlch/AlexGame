import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName2_House_LowerOpenLevel = () => {
	const pawnStore = usePawnStore();
	const Name2House_Upper: Sprite = {
		spriteId: 'Name2House_Upper',
		isCharacter: false,
		isAutoInteract: false,
		position: [2, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Name2_House_Upper', [5, 5, 'n']],
	};
	pawnStore.registerSprite(Name2House_Upper);

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
export default openName2_House_LowerOpenLevel;
