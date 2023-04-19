import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openFarm_EmptyLevel = () => {
	const pawnStore = usePawnStore();

	const House1: Sprite = {
		spriteId: 'House1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 22],
		interactionName: 'openLevel',
		interactionArgs: ['1', [6, 4, 'n']],
	};
	const House2: Sprite = {
		spriteId: 'House2',
		isCharacter: false,
		isAutoInteract: true,
		position: [2, 19],
		interactionName: 'openLevel',
		interactionArgs: ['1', [5, 2, 'e']],
	};
	pawnStore.registerSprite(House1);
	pawnStore.registerSprite(House2);

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [10, 0],
		interactionName: 'openLevel',
		interactionArgs: ['Market', [13, 25, 'w']],
	};
	pawnStore.registerSprite(Market1);

	// Village // Village // Village // Village // Village // Village // Village // Village // Village // Village
	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [11, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [11, 48, 'w']],
	};
	pawnStore.registerSprite(Village);

	const Sign: Sprite = {
		spriteId: 'Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [11, 2],
		interactionName: 'readout',
		interactionArgs: ['Town Square: West, Village: South'],
	};
	pawnStore.registerSprite(Sign);
};
export default openFarm_EmptyLevel;
