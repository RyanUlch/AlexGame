import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openVillageLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	// Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House
	let Name0HouseDestination: string;
	if (timelineStore.Name0_Moving) {
		Name0HouseDestination = 'Name0_House_Empty';
	} else {
		Name0HouseDestination = 'Name0_House_Full';
	}
	const Name0House: Sprite = {
		spriteId: 'Name0House',
		isCharacter: false,
		isAutoInteract: false,
		position: [14, 41],
		interactionName: 'openLevel',
		interactionArgs: [Name0HouseDestination],
	};
	const Name0House_Sign: Sprite = {
		spriteId: 'Name0House_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [15, 39],
		interactionName: 'readout',
		interactionArgs: ["Name0's House"],
	};
	pawnStore.registerSprite(Name0House);
	pawnStore.registerSprite(Name0House_Sign);

	// Name2 House // Name2 House // Name2 House // Name2 House // Name2 House // Name2 House // Name2 House // Name2 House
	let Name2HouseDestination: String;
	if (timelineStore.currentTime === 0 || timelineStore.currentTime === 3) {
		Name2HouseDestination = 'Name2_House_LowerOpen';
	} else {
		Name2HouseDestination = 'Name2_House_LowerClosed';
	}
	const Name2House: Sprite = {
		spriteId: 'Name2House',
		isCharacter: false,
		isAutoInteract: false,
		position: [16, 14],
		interactionName: 'openLevel',
		interactionArgs: [Name2HouseDestination],
	};
	const Name2House_Sign: Sprite = {
		spriteId: 'Name2House_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [17, 16],
		interactionName: 'readout',
		interactionArgs: ["Name2 and Jenn's House"],
	};
	pawnStore.registerSprite(Name2House);
	pawnStore.registerSprite(Name2House_Sign);

	// Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House
	const Name3House: Sprite = {
		spriteId: 'Name3House',
		isCharacter: false,
		isAutoInteract: false,
		position: [32, 46],
		interactionName: 'openLevel',
		interactionArgs: ['Name3_House'],
	};
	const Name3House_Sign: Sprite = {
		spriteId: 'Name3House_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [34, 43],
		interactionName: 'readout',
		interactionArgs: ["Name3's House"],
	};
	pawnStore.registerSprite(Name3House);
	pawnStore.registerSprite(Name3House_Sign);

	// Name4 House // Name4 House // Name4 House // Name4 House // Name4 House // Name4 House // Name4 House // Name4 House
	const Name4House: Sprite = {
		spriteId: 'Name4House',
		isCharacter: false,
		isAutoInteract: false,
		position: [30, 7],
		interactionName: 'openLevel',
		interactionArgs: ['Name4_House'],
	};
	const Name4House_Sign: Sprite = {
		spriteId: 'Name4House_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [31, 10],
		interactionName: 'readout',
		interactionArgs: ["Name4's House"],
	};
	pawnStore.registerSprite(Name4House);
	pawnStore.registerSprite(Name4House_Sign);

	// Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern // Tavern
	let Tavern: Sprite;
	if (timelineStore.currentTime === 0) {
		Tavern = {
			spriteId: 'Tavern',
			isCharacter: false,
			isAutoInteract: false,
			position: [33, 24],
			interactionName: 'openLevel',
			interactionArgs: ['Tavern'],
		};
	} else {
		Tavern = {
			spriteId: 'Tavern',
			isCharacter: false,
			isAutoInteract: false,
			position: [33, 24],
			interactionName: 'readout',
			interactionArgs: ["I don't need to go here right now..."],
		};
	}
	const Tavern_Sign: Sprite = {
		spriteId: 'Tavern_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [37, 26],
		interactionName: 'readout',
		interactionArgs: ['Tavern and Inn'],
	};
	pawnStore.registerSprite(Tavern);
	pawnStore.registerSprite(Tavern_Sign);

	// Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm
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
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [11, 52],
		interactionName: 'openLevel',
		interactionArgs: [FarmDestination, [10, 4, 'e']],
	};
	const Farm_Sign: Sprite = {
		spriteId: 'Farm_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [12, 48],
		interactionName: 'readout',
		interactionArgs: ["To Name1's Farm"],
	};
	pawnStore.registerSprite(Farm);
	pawnStore.registerSprite(Farm_Sign);

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
		position: [5, 52],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 52],
		interactionName: 'openLevel',
		interactionArgs: [MarketDestination],
	};
	const Market_Sign: Sprite = {
		spriteId: 'Market_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [7, 48],
		interactionName: 'readout',
		interactionArgs: ['To Town Square'],
	};
	pawnStore.registerSprite(Market1);
	pawnStore.registerSprite(Market2);
	pawnStore.registerSprite(Market_Sign);

	// EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse // EmptyHouse
	const EmptyHouse: Sprite = {
		spriteId: 'EmptyHouse',
		isCharacter: false,
		isAutoInteract: false,
		position: [13, 25],
		interactionName: 'readout',
		interactionArgs: ["I don't need to go there."],
	};
	const EmptyHouse_Sign: Sprite = {
		spriteId: 'EmptyHouse_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [21, 26],
		interactionName: 'readout',
		interactionArgs: ['For Sale'],
	};
	pawnStore.registerSprite(EmptyHouse);
	pawnStore.registerSprite(EmptyHouse_Sign);
};
export default openVillageLevel;
