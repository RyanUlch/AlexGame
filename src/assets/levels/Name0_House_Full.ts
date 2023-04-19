import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';

const openName0_House_FullLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	if (!timelineStore.Name0_atFarm && timelineStore.currentTime === 2) {
		const Name0: Sprite = {
			spriteId: 'Name0',
			spriteSrc: 'Name0',
			isCharacter: false,
			isAutoInteract: false,
			position: [6, 2],
			coords: [0, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['0e0'],
		};
		pawnStore.registerSprite(Name0);
	} else if (timelineStore.Name0_hate && timelineStore.currentTime === 3) {
		const Name0: Sprite = {
			spriteId: 'Name0',
			spriteSrc: 'Name0',
			isCharacter: false,
			isAutoInteract: false,
			position: [6, 2],
			coords: [0, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['0n0'],
		};
		pawnStore.registerSprite(Name0);
	}

	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 5],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [15, 41, 's']],
	};
	pawnStore.registerSprite(Village);
};
export default openName0_House_FullLevel;
