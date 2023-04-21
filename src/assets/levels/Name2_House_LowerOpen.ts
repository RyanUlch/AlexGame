import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openName2_House_LowerOpenLevel = () => {
	const pawnStore = usePawnStore();

	const books0: Sprite = {
		spriteId: 'books',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books2', 'environment'],
	};
	pawnStore.registerSprite(books0);
	const books1: Sprite = {
		spriteId: 'books',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 4],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books2', 'environment'],
	};
	pawnStore.registerSprite(books1);
	const pot: Sprite = {
		spriteId: 'pot',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['pot2', 'environment'],
	};
	pawnStore.registerSprite(pot);

	const Name2House_Upper: Sprite = {
		spriteId: 'Name2House_Upper',
		isCharacter: false,
		isAutoInteract: false,
		position: [2, 5],
		interactionName: 'openLevel',
		interactionArgs: ['2up', [5, 5, 'n']],
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
