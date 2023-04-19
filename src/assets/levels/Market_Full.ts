import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openMarket_FullLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	if (timelineStore.currentTime === 0) {
		const Name0: Sprite = {
			spriteId: 'Name0',
			spriteSrc: 'Name0',
			isCharacter: true,
			isAutoInteract: false,
			position: [8, 21],
			coords: [1, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['0m0'],
		};
		pawnStore.registerSprite(Name0);
	} else if (timelineStore.currentTime === 1) {
		const Name0: Sprite = {
			spriteId: 'Name0',
			spriteSrc: 'Name0',
			isCharacter: true,
			isAutoInteract: false,
			position: [8, 21],
			coords: [1, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['0a0'],
		};
		pawnStore.registerSprite(Name0);
		const Name0_Across: Sprite = {
			spriteId: 'Name0_Across',
			isCharacter: true,
			isAutoInteract: false,
			position: [8, 20],
			interactionName: 'returnDialogue',
			interactionArgs: ['0a0'],
		};
		pawnStore.registerSprite(Name0_Across);
		const Name2: Sprite = {
			spriteId: 'Name2',
			spriteSrc: 'Name2',
			isCharacter: true,
			isAutoInteract: false,
			position: [16, 8],
			coords: [2, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['2a0'],
		};
		pawnStore.registerSprite(Name2);
		const Name2_Across: Sprite = {
			spriteId: 'Name2_Across',
			isCharacter: true,
			isAutoInteract: false,
			position: [16, 9],
			interactionName: 'returnDialogue',
			interactionArgs: ['2a0'],
		};
		pawnStore.registerSprite(Name2_Across);
		const Name3: Sprite = {
			spriteId: 'Name3',
			spriteSrc: 'Name3',
			isCharacter: false,
			isAutoInteract: false,
			position: [1, 8],
			coords: [0, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['3a0'],
		};
		pawnStore.registerSprite(Name3);
		const Name4: Sprite = {
			spriteId: 'PC_',
			spriteSrc: 'PC_',
			isCharacter: false,
			isAutoInteract: false,
			position: [14, 15],
			coords: [0, 1],
			interactionName: 'noReturnDialogue',
			interactionArgs: ['4a0'],
		};
		pawnStore.registerSprite(Name4);
	}

	// Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm // Farm
	const Farm: Sprite = {
		spriteId: 'Farm',
		isCharacter: false,
		isAutoInteract: true,
		position: [13, 28],
		interactionName: 'openLevel',
		interactionArgs: ['Farm', [10, 4, 'e']],
	};
	const Farm_Sign: Sprite = {
		spriteId: 'Farm_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [12, 25],
		interactionName: 'readout',
		interactionArgs: ["To Name1's Farm"],
	};
	pawnStore.registerSprite(Farm);
	pawnStore.registerSprite(Farm_Sign);

	// Village // Village // Village // Village // Village // Village // Village // Village // Village // Village // Village
	const Village1: Sprite = {
		spriteId: 'Village1',
		isCharacter: false,
		isAutoInteract: true,
		position: [24, 10],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [6, 51, 'w']],
	};
	const Village2: Sprite = {
		spriteId: 'Village2',
		isCharacter: false,
		isAutoInteract: true,
		position: [24, 11],
		interactionName: 'openLevel',
		interactionArgs: ['Village', [6, 51, 'w']],
	};
	const Village_Sign: Sprite = {
		spriteId: 'Village_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [21, 13],
		interactionName: 'readout',
		interactionArgs: ['To Village'],
	};
	pawnStore.registerSprite(Village1);
	pawnStore.registerSprite(Village2);
	pawnStore.registerSprite(Village_Sign);

	// Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs // Bluffs
	const Bluffs1: Sprite = {
		spriteId: 'Bluffs',
		isCharacter: false,
		isAutoInteract: true,
		position: [0, 14],
		interactionName: 'openLevel',
		interactionArgs: ['Bluffs'],
	};
	const Bluffs2: Sprite = {
		spriteId: 'Bluffs',
		isCharacter: false,
		isAutoInteract: true,
		position: [0, 15],
		interactionName: 'openLevel',
		interactionArgs: ['Bluffs'],
	};
	const Bluffs_Sign: Sprite = {
		spriteId: 'Bluffs_Sign',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 16],
		interactionName: 'readout',
		interactionArgs: ['To Bluffs'],
	};
	pawnStore.registerSprite(Bluffs1);
	pawnStore.registerSprite(Bluffs2);
	pawnStore.registerSprite(Bluffs_Sign);
};
export default openMarket_FullLevel;
