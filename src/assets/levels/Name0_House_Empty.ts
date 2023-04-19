import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName0_House_EmptyLevel = () => {
	const pawnStore = usePawnStore();

	const Name0: Sprite = {
		spriteId: 'Name0',
		spriteSrc: 'Name0',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 6],
		coords: [3, 1],
		interactionName: 'returnDialogue',
		interactionArgs: ['0n0'],
	};
	pawnStore.registerSprite(Name0);

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [15, 41, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName0_House_EmptyLevel;
