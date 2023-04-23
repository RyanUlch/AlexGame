import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
const openTeddy_HouseLevel = () => {
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

	if (timelineStore.currentTime === 3 && !timelineStore.Teddy_follow) {
		levelStore.levelMatrix[3][9].layers[1].src = '3InBed';
		levelStore.levelMatrix[3][9].layers[1].coord = [0, 0];
		levelStore.levelMatrix[3][10].layers[1].src = '3InBed';
		levelStore.levelMatrix[3][10].layers[1].coord = [0, 1];
		levelStore.levelMatrix[4][9].layers[1].src = '3InBed';
		levelStore.levelMatrix[4][9].layers[1].coord = [1, 0];
		levelStore.levelMatrix[4][10].layers[1].src = '3InBed';
		levelStore.levelMatrix[4][10].layers[1].coord = [1, 1];
		const Teddy: Sprite = {
			spriteId: 'Teddy',
			isCharacter: false,
			isAutoInteract: false,
			position: [4, 9],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3n0', 'Teddy'],
		};
		pawnStore.registerSprite(Teddy);
		const Teddy_1: Sprite = {
			spriteId: 'Teddy_1',
			isCharacter: false,
			isAutoInteract: false,
			position: [4, 10],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3n0', 'Teddy'],
		};
		pawnStore.registerSprite(Teddy_1);
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
export default openTeddy_HouseLevel;
