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
		interactionArgs: ['RebeccaGrave', 'environment'],
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

	if (timelineStore.currentTime === 2 && timelineStore.Lavelle_home) {
		const Lavelle: Sprite = {
			spriteId: 'Lavelle',
			spriteSrc: 'Lavelle',
			isCharacter: true,
			isAutoInteract: false,
			position: [3, 29],
			coords: [1, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['2e0', 'Lavelle'],
		};
		pawnStore.registerSprite(Lavelle);
	}

	// Sam House // Sam House // Sam House // Sam House // Sam House // Sam House // Sam House // Sam House
	const SamHouse: Sprite = {
		spriteId: 'SamHouse',
		isCharacter: false,
		isAutoInteract: false,
		position: [14, 41],
		interactionName: 'openLevel',
		interactionArgs: ['0', undefined, 'doorOpen'],
	};
	const SamHouse_Sign: Sprite = {
		spriteId: 'SamHouse_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [15, 39],
		interactionName: 'readout',
		interactionArgs: ["Sam's House"],
	};
	pawnStore.registerSprite(SamHouse);
	pawnStore.registerSprite(SamHouse_Sign);

	// Lavelle House // Lavelle House // Lavelle House // Lavelle House // Lavelle House // Lavelle House // Lavelle House // Lavelle House

	const LavelleHouse: Sprite = {
		spriteId: 'LavelleHouse',
		isCharacter: false,
		isAutoInteract: false,
		position: [16, 14],
		interactionName: 'openLevel',
		interactionArgs: ['2', undefined, 'doorOpen'],
	};
	const LavelleHouse_Sign: Sprite = {
		spriteId: 'LavelleHouse_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [17, 16],
		interactionName: 'readout',
		interactionArgs: ["Lavelle and Rebecca's House"],
	};
	pawnStore.registerSprite(LavelleHouse);
	pawnStore.registerSprite(LavelleHouse_Sign);

	// Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House // Name3 House
	const Name3House: Sprite = {
		spriteId: 'Name3House',
		isCharacter: false,
		isAutoInteract: false,
		position: [32, 46],
		interactionName: 'openLevel',
		interactionArgs: ['3', undefined, 'doorOpen'],
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
		interactionArgs: ['4', undefined, 'doorOpen'],
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
			interactionArgs: ['Tavern', undefined, 'doorOpen'],
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
		interactionArgs: ["To Abigail's Farm"],
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
