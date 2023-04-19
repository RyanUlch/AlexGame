import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openBluffs_BrokenLevel = () => {
	const pawnStore = usePawnStore();

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 8],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 14, 's']],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 9],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 15, 's']],
	};
	const Market3: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 10],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [4, 16, 's']],
	};
	pawnStore.registerSprite(Market1);
	pawnStore.registerSprite(Market2);
	pawnStore.registerSprite(Market3);
};
export default openBluffs_BrokenLevel;
