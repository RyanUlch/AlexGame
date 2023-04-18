import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openFarm_EmptyLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const House1: Sprite = {
		spriteId: 'House1',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 22],
		interactionName: 'openLevel',
		interactionArgs: ['Name1_House_Lower', [6, 4, 'n']],
	};
	const House2: Sprite = {
		spriteId: 'House1',
		isCharacter: false,
		isAutoInteract: false,
		position: [2, 19],
		interactionName: 'openLevel',
		interactionArgs: ['Name1_House_Lower', [5, 2, 'e']],
	};
	pawnStore.registerSprite(House1);
	pawnStore.registerSprite(House2);

	// Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market // Market
	let MarketDestination: string;
	if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
		MarketDestination = 'Market_Full';
	} else if (
		timelineStore.currentTime === 2 &&
		timelineStore.Name0_atFarm &&
		!timelineStore.Name2_home
	) {
		MarketDestination = 'Market_Name0Gone';
	} else if (
		timelineStore.currentTime === 2 &&
		!timelineStore.Name0_atFarm &&
		timelineStore.Name2_home
	) {
		MarketDestination = 'Market_Name2Gone';
	} else if (
		timelineStore.currentTime === 2 &&
		!timelineStore.Name0_atFarm &&
		!timelineStore.Name2_home
	) {
		MarketDestination = 'Market_BothGone';
	} else {
		MarketDestination = 'Market_Empty';
	}
	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [10, 0],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination, [13, 25, 'w']],
	};
	pawnStore.registerSprite(Market1);

	// Village // Village // Village // Village // Village // Village // Village // Village // Village // Village
	const Village: Sprite = {
		spriteId: 'Village',
		isCharacter: false,
		isAutoInteract: true,
		position: [11, 3],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [11, 48, 'w']],
	};
	pawnStore.registerSprite(Village);

	const Sign: Sprite = {
		spriteId: 'Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [11, 2],
		interactionName: 'readout',
		interactionArgs: ['Town Square: West, Village: South'],
	};
	pawnStore.registerSprite(Sign);
};
export default openFarm_EmptyLevel;
