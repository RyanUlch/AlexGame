import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openName1_House_LowerLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const UpStairs: Sprite = {
		spriteId: 'FarmPath',
		isCharacter: false,
		isAutoInteract: true,
		position: [3, 7],
		interactionName: 'openLevel',
		interactionArgs: ['Name1_House_Upper', [3, 4, 's']],
	};
	pawnStore.registerSprite(UpStairs);

	let FarmDestination: string;
	if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
		FarmDestination = 'Farm_Full';
	} else if (timelineStore.currentTime === 2) {
		FarmDestination = 'Farm_Half';
	} else if (timelineStore.Name1_GaveUp) {
		FarmDestination = 'Farm_Dead';
	} else {
		FarmDestination = 'Farm_Empty';
	}

	const FarmPath: Sprite = {
		spriteId: 'FarmPath',
		isCharacter: false,
		isAutoInteract: true,
		position: [7, 4],
		interactionName: 'openLevel',
		interactionArgs: [FarmDestination, [4, 22, 's']],
	};
	pawnStore.registerSprite(FarmPath);
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [5, 1],
		interactionName: 'openLevel',
		interactionArgs: [FarmDestination, [2, 19, 'w']],
	};
	pawnStore.registerSprite(Farm);
};
export default openName1_House_LowerLevel;
