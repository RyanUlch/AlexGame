import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openAlex_HouseLevel = () => {
	const pawnStore = usePawnStore();
	const god: Sprite = {
		spriteId: 'god',
		isCharacter: false,
		isAutoInteract: false,
		position: [9, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['god', 'environment'],
	};
	pawnStore.registerSprite(god);

	const bookshelf1: Sprite = {
		spriteId: 'bookshelf1',
		isCharacter: false,
		isAutoInteract: false,
		position: [8, 6],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books4', 'environment'],
	};
	pawnStore.registerSprite(bookshelf1);
	const bookshelf2: Sprite = {
		spriteId: 'bookshelf2',
		isCharacter: false,
		isAutoInteract: false,
		position: [8, 7],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books4', 'environment'],
	};
	pawnStore.registerSprite(bookshelf2);
	const dishes: Sprite = {
		spriteId: 'bookshelf1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 4],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['dishes4', 'environment'],
	};
	pawnStore.registerSprite(dishes);
	const drawer: Sprite = {
		spriteId: 'drawer',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 7],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['drawer4', 'environment'],
	};
	pawnStore.registerSprite(drawer);

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
export default openAlex_HouseLevel;
