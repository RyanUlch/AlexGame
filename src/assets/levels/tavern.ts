import { usePawnStore } from '@/stores/pawn';
import type { Sprite } from '@/stores/pawn';
const openTavernLevel = () => {
	const pawnStore = usePawnStore();

	// Lavelle
	const LavelleSprite: Sprite = {
		spriteId: 'Lavelle',
		spriteSrc: 'Lavelle',
		isCharacter: true,
		isAutoInteract: false,
		position: [6, 11],
		coords: [2, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['2m0', 'Lavelle'],
	};
	pawnStore.registerSprite(LavelleSprite);

	// Player Character
	const PCSprite: Sprite = {
		spriteId: 'PC_',
		spriteSrc: 'PC_Sleep_',
		isCharacter: true,
		isAutoInteract: false,
		position: [6, 12],
		coords: [0, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['4m0', 'Alex'],
	};
	pawnStore.registerSprite(PCSprite);

	// Exit
	const Exit: Sprite = {
		spriteId: 'Exit',
		isCharacter: false,
		isAutoInteract: true,
		position: [9, 2],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [34, 24, 's']],
	};
	pawnStore.registerSprite(Exit);

	// Stairs
	const Stairs: Sprite = {
		spriteId: 'Exit',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 12],
		interactionName: 'readout',
		interactionArgs: ["I don't need to go up there"],
	};
	pawnStore.registerSprite(Stairs);
};
export default openTavernLevel;
