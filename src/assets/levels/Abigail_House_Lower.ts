import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openAbigail_House_LowerLevel = () => {
	const pawnStore = usePawnStore();

	const UpStairs: Sprite = {
		spriteId: 'upstairs',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 7],
		interactionName: 'openLevel',
		interactionArgs: ['1up', [3, 4, 's'], 'steps'],
	};
	pawnStore.registerSprite(UpStairs);

	const FarmPath: Sprite = {
		spriteId: 'FarmPath',
		isCharacter: false,
		isAutoInteract: true,
		position: [7, 4],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [4, 22, 's'], 'doorClose'],
	};
	pawnStore.registerSprite(FarmPath);
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [5, 1],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [2, 19, 'w'], 'doorClose'],
	};
	pawnStore.registerSprite(Farm);
};
export default openAbigail_House_LowerLevel;
