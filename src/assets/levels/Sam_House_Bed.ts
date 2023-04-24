import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openSam_House_BedLevel = () => {
	const pawnStore = usePawnStore();

	const fruit: Sprite = {
		spriteId: 'fruit',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['fruit', 'environment'],
	};
	pawnStore.registerSprite(fruit);

	const shelf0: Sprite = {
		spriteId: 'shelf0',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 6],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['shelf0', 'environment'],
	};
	pawnStore.registerSprite(shelf0);
	const shelf1: Sprite = {
		spriteId: 'shelf1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 7],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['shelf0', 'environment'],
	};
	pawnStore.registerSprite(shelf1);
	const Sam: Sprite = {
		spriteId: 'Sam',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 2],
		interactionName: 'returnDialogue',
		interactionArgs: ['0n1', 'Sam'],
	};
	pawnStore.registerSprite(Sam);

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [15, 41, 's'], 'doorClose'],
	};
	pawnStore.registerSprite(Village);
};
export default openSam_House_BedLevel;
