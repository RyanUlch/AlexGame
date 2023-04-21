import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openVillageLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const grave_Sign: Sprite = {
		spriteId: 'grave_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [8, 44],
		interactionName: 'readout',
		interactionArgs: ['To Cemetery'],
	};
	pawnStore.registerSprite(grave_Sign);

	const grave0: Sprite = {
		spriteId: 'grave0',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 24],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['grave', 'environment'],
	};
	pawnStore.registerSprite(grave0);
	const grave1: Sprite = {
		spriteId: 'grave1',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 25],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['grave', 'environment'],
	};
	pawnStore.registerSprite(grave1);
	const grave2: Sprite = {
		spriteId: 'grave2',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 26],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['grave', 'environment'],
	};
	pawnStore.registerSprite(grave2);
	const grave3: Sprite = {
		spriteId: 'grave3',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 28],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['jennGrave', 'environment'],
	};
	pawnStore.registerSprite(grave3);
	const grave4: Sprite = {
		spriteId: 'grave4',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 30],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['grave', 'environment'],
	};
	pawnStore.registerSprite(grave4);
	const grave5: Sprite = {
		spriteId: 'grave5',
		isCharacter: false,
		isAutoInteract: false,
		position: [3, 32],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['grave', 'environment'],
	};
	pawnStore.registerSprite(grave5);

	const farm0: Sprite = {
		spriteId: 'farm0',
		isCharacter: false,
		isAutoInteract: true,
		position: [8, 11],
		interactionName: 'noReturnDialogue',
		interactionArgs: ['DeadFarm'],
	};
	pawnStore.registerSprite(farm0);

	if (timelineStore.currentTime === 2 && timelineStore.Name2_home) {
		const Name2: Sprite = {
			spriteId: 'Name2',
			spriteSrc: 'Name2',
			isCharacter: true,
			isAutoInteract: false,
			position: [3, 29],
			coords: [1, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['2e0', 'Name2'],
		};
		pawnStore.registerSprite(Name2);
	}

	// Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House // Name0 House
	const Name0House: Sprite = {
		spriteId: 'Name0House',
		isCharacter: false,
		isAutoInteract: false,
		position: [14, 41],
		interactionName: 'openLevel',
		interactionArgs: ['0'],
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

	const Name2House: Sprite = {
		spriteId: 'Name2House',
		isCharacter: false,
		isAutoInteract: false,
		position: [16, 14],
		interactionName: 'openLevel',
		interactionArgs: ['2'],
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
		interactionArgs: ['3'],
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
		interactionArgs: ['4'],
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
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [11, 52],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [10, 4, 'e']],
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

	const Market1: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [5, 52],
		interactionName: 'openLevel',
		interactionArgs: ['Market'],
	};
	const Market2: Sprite = {
		spriteId: 'Market',
		isCharacter: false,
		isAutoInteract: true,
		position: [6, 52],
		interactionName: 'openLevel',
		interactionArgs: ['Market'],
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
