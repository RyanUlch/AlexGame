import { usePawnStore } from '@/stores/pawn';
import { altarCutscene } from '@/stores/cutscene';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';

const openLavelle_House_UpperLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	const mess: Sprite = {
		spriteId: 'mess',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 4],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['mess', 'environment'],
	};
	pawnStore.registerSprite(mess);
	const jars1: Sprite = {
		spriteId: 'jars',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['jars2', 'environment'],
	};
	pawnStore.registerSprite(jars1);
	const jars2: Sprite = {
		spriteId: 'jars',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['jars2', 'environment'],
	};
	pawnStore.registerSprite(jars2);
	const jars3: Sprite = {
		spriteId: 'jars',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['jars2', 'environment'],
	};
	pawnStore.registerSprite(jars3);

	const fire1: Sprite = {
		spriteId: 'fire1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 1],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['fire2', 'environment'],
	};
	pawnStore.registerSprite(fire1);
	const fire2: Sprite = {
		spriteId: 'fire1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 5],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['fire2', 'environment'],
	};
	pawnStore.registerSprite(fire2);
	const statue: Sprite = {
		spriteId: 'statue',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 3],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['statue', 'environment'],
	};
	pawnStore.registerSprite(statue);

	if (timelineStore.currentTime === 0) {
		const Teddy: Sprite = {
			spriteId: 'Teddy',
			spriteSrc: 'Teddy',
			isCharacter: true,
			isAutoInteract: false,
			position: [4, 3],
			coords: [3, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3m0', 'Teddy'],
		};
		pawnStore.registerSprite(Teddy);
	}
	if (timelineStore.currentTime === 3) {
		if (timelineStore.Lavelle_sawDeath) {
			const Lavelle: Sprite = {
				spriteId: 'Lavelle',
				spriteSrc: 'Lavelle',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 3],
				coords: [3, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n2', 'Lavelle'],
			};
			pawnStore.registerSprite(Lavelle);
		} else if (!timelineStore.Lavelle_toBluffs && !timelineStore.Teddy_follow) {
			const Lavelle: Sprite = {
				spriteId: 'Lavelle',
				spriteSrc: 'Lavelle',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 3],
				coords: [3, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n0', 'Lavelle'],
			};
			pawnStore.registerSprite(Lavelle);
		} else if (timelineStore.Lavelle_home && timelineStore.Teddy_follow) {
			altarCutscene();
			const Lavelle_Dead: Sprite = {
				spriteId: 'Lavelle_Dead',
				spriteSrc: 'Lavelle_Dead',
				isCharacter: false,
				isAutoInteract: false,
				position: [4, 3],
				coords: [0, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n1', 'Lavelle'],
			};
			pawnStore.registerSprite(Lavelle_Dead);
			const Teddy: Sprite = {
				spriteId: 'Teddy',
				spriteSrc: 'Teddy',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 5],
				coords: [1, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['23n2', 'Teddy'],
			};
			pawnStore.registerSprite(Teddy);
		}
	}

	const LavelleHouse_Lower: Sprite = {
		spriteId: 'LavelleHouse',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 5],
		interactionName: 'openLevel',
		interactionArgs: ['2', [3, 5, 's']],
	};
	pawnStore.registerSprite(LavelleHouse_Lower);
};
export default openLavelle_House_UpperLevel;
