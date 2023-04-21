import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
const openName3_HouseLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	const levelStore = useLevelStore();

	const knife: Sprite = {
		spriteId: 'knife',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 2],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['knife', 'environment'],
	};
	pawnStore.registerSprite(knife);

	const drawer: Sprite = {
		spriteId: 'knife',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 8],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['drawer3', 'environment'],
	};
	pawnStore.registerSprite(drawer);

	if (timelineStore.currentTime === 3 && !timelineStore.Name3_follow) {
		levelStore.levelMatrix[3][9].layers[1].src = '3InBed';
		levelStore.levelMatrix[3][9].layers[1].coord = [0, 0];
		levelStore.levelMatrix[3][10].layers[1].src = '3InBed';
		levelStore.levelMatrix[3][10].layers[1].coord = [0, 1];
		levelStore.levelMatrix[4][9].layers[1].src = '3InBed';
		levelStore.levelMatrix[4][9].layers[1].coord = [1, 0];
		levelStore.levelMatrix[4][10].layers[1].src = '3InBed';
		levelStore.levelMatrix[4][10].layers[1].coord = [1, 1];
		const Name3: Sprite = {
			spriteId: 'Name3',
			isCharacter: false,
			isAutoInteract: false,
			position: [4, 9],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3n0', 'Name3'],
		};
		pawnStore.registerSprite(Name3);
		const Name3_1: Sprite = {
			spriteId: 'Name3_1',
			isCharacter: false,
			isAutoInteract: false,
			position: [4, 10],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3n0', 'Name3'],
		};
		pawnStore.registerSprite(Name3_1);
	}

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [33, 46, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName3_HouseLevel;
