import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openBluffs_FullLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
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
		position: [31, 8],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination, [4, 14, 's']],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 9],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination, [4, 14, 's']],
	};
	const Market3: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [31, 10],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination, [4, 14, 's']],
	};
	pawnStore.registerSprite(Market1);
	pawnStore.registerSprite(Market2);
	pawnStore.registerSprite(Market3);
};
export default openBluffs_FullLevel;
