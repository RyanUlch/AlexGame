import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName1_House_LowerLevel = () => {
	const pawnStore = usePawnStore();

	const UpStairs: Sprite = {
		spriteId: 'FarmPath',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 7],
		interactionName: 'openLevel',
		interactionArgs: ['1up', [3, 4, 's']],
	};
	pawnStore.registerSprite(UpStairs);

	const FarmPath: Sprite = {
		spriteId: 'FarmPath',
		isCharacter: false,
		isAutoInteract: true,
		position: [7, 4],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [4, 22, 's']],
	};
	pawnStore.registerSprite(FarmPath);
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [5, 1],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [2, 19, 'w']],
	};
	pawnStore.registerSprite(Farm);
};
export default openName1_House_LowerLevel;
