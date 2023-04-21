import { usePawnStore } from '@/stores/pawn';
import { altarCutscene } from '@/stores/cutscene';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';

const openName2_House_UpperLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

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
		const Name3: Sprite = {
			spriteId: 'Name3',
			spriteSrc: 'Name3',
			isCharacter: true,
			isAutoInteract: false,
			position: [4, 3],
			coords: [3, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3m0', 'Name3'],
		};
		pawnStore.registerSprite(Name3);
	}
	if (timelineStore.currentTime === 3) {
		console.log(timelineStore.Name2_sawDeath, timelineStore.Name2_home, timelineStore.Name3_follow);
		if (timelineStore.Name2_sawDeath) {
			const Name2: Sprite = {
				spriteId: 'Name2',
				spriteSrc: 'Name2',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 3],
				coords: [3, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n2', 'Name2'],
			};
			pawnStore.registerSprite(Name2);
		} else if (!timelineStore.Name2_toBluffs && !timelineStore.Name3_follow) {
			const Name2: Sprite = {
				spriteId: 'Name2',
				spriteSrc: 'Name2',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 3],
				coords: [3, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n0', 'Name2'],
			};
			pawnStore.registerSprite(Name2);
		} else if (timelineStore.Name2_home && timelineStore.Name3_follow) {
			altarCutscene();
			const Name2_Dead: Sprite = {
				spriteId: 'Name2_Dead',
				spriteSrc: 'Name2_Dead',
				isCharacter: false,
				isAutoInteract: false,
				position: [4, 3],
				coords: [0, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['2n1', 'Name2'],
			};
			pawnStore.registerSprite(Name2_Dead);
			const Name3: Sprite = {
				spriteId: 'Name3',
				spriteSrc: 'Name3',
				isCharacter: true,
				isAutoInteract: false,
				position: [4, 5],
				coords: [1, 1],
				interactionName: 'noReturnDialogue',
				interactionArgs: ['23n2', 'Name3'],
			};
			pawnStore.registerSprite(Name3);
		}
	}

	const Name2House_Lower: Sprite = {
		spriteId: 'Name2House',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 5],
		interactionName: 'openLevel',
		interactionArgs: ['2', [3, 5, 's']],
	};
	pawnStore.registerSprite(Name2House_Lower);
};
export default openName2_House_UpperLevel;
