import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openAbigail_House_UpperLevel = () => {
	const pawnStore = usePawnStore();

	const books1: Sprite = {
		spriteId: 'books1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_0', 'environment'],
	};
	pawnStore.registerSprite(books1);
	const books2: Sprite = {
		spriteId: 'books2',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_0', 'environment'],
	};
	pawnStore.registerSprite(books2);

	const books3: Sprite = {
		spriteId: 'books3',
		isCharacter: false,
		isAutoInteract: false,
		position: [6, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_1', 'environment'],
	};
	pawnStore.registerSprite(books3);
	const books4: Sprite = {
		spriteId: 'books4',
		isCharacter: false,
		isAutoInteract: false,
		position: [6, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books1_1', 'environment'],
	};
	pawnStore.registerSprite(books4);
	const dresser: Sprite = {
		spriteId: 'dresser',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['dresser1', 'environment'],
	};
	pawnStore.registerSprite(dresser);

	const Lower: Sprite = {
		spriteId: 'Lower',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 5],
		interactionName: 'openLevel',
		interactionArgs: ['1', [4, 7, 's']],
	};
	pawnStore.registerSprite(Lower);
};
export default openAbigail_House_UpperLevel;
