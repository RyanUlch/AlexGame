import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openLavelle_House_LowerClosedLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const books0: Sprite = {
		spriteId: 'books',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 4],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['books2', 'environment'],
	};
	pawnStore.registerSprite(books0);
	const books1: Sprite = {
		spriteId: 'books',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 5],
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

	if (timelineStore.Lavelle_sawDeath) {
		const Lavelle: Sprite = {
			spriteId: 'Lavelle',
			spriteSrc: 'Lavelle',
			isCharacter: true,
			isAutoInteract: false,
			position: [4, 3],
			coords: [1, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['2n2', 'Lavelle'],
		};
		pawnStore.registerSprite(Lavelle);
	}

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 4],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [17, 14, 's'], 'doorClose'],
	};
	pawnStore.registerSprite(Village);
};
export default openLavelle_House_LowerClosedLevel;
