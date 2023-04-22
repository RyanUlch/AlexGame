import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openSam_House_EmptyLevel = () => {
	const pawnStore = usePawnStore();

	const Sam: Sprite = {
		spriteId: 'Sam',
		spriteSrc: 'Sam',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 6],
		coords: [3, 1],
		interactionName: 'returnDialogue',
		interactionArgs: ['0n0', 'Sam'],
	};
	pawnStore.registerSprite(Sam);

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
export default openSam_House_EmptyLevel;
