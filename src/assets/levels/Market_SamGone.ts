import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openMarket_SamGoneLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const marketStall1: Sprite = {
		spriteId: 'marketStall1',
		spriteSrc: 'Char00',
		isCharacter: true,
		isAutoInteract: false,
		position: [8, 8],
		coords: [2, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall1);

	const marketStall2: Sprite = {
		spriteId: 'marketStall2',
		spriteSrc: 'Char02',
		isCharacter: true,
		isAutoInteract: false,
		position: [19, 12],
		coords: [3, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall2);

	const marketStall3: Sprite = {
		spriteId: 'marketStall3',
		spriteSrc: 'Char03',
		isCharacter: true,
		isAutoInteract: false,
		position: [5, 12],
		coords: [0, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall3);

	const marketStall4: Sprite = {
		spriteId: 'marketStall4',
		spriteSrc: 'Char18',
		isCharacter: true,
		isAutoInteract: false,
		position: [5, 17],
		coords: [0, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall4);

	const marketStall5: Sprite = {
		spriteId: 'marketStall5',
		spriteSrc: 'Char12',
		isCharacter: true,
		isAutoInteract: false,
		position: [19, 17],
		coords: [3, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall5);

	const marketStall6: Sprite = {
		spriteId: 'marketStall6',
		spriteSrc: 'Char05',
		isCharacter: true,
		isAutoInteract: false,
		position: [16, 21],
		coords: [1, 1],
		interactionName: 'readout',
		interactionArgs: ["I don't need to know what they are thinking"],
	};
	pawnStore.registerSprite(marketStall6);

	const churchSign: Sprite = {
		spriteId: 'churchSign',
		isCharacter: false,
		isAutoInteract: false,
		position: [21, 25],
		interactionName: 'readout',
		interactionArgs: ['Church of Thor (Not that one)'],
	};
	pawnStore.registerSprite(churchSign);
	const church: Sprite = {
		spriteId: 'church',
		isCharacter: false,
		isAutoInteract: false,
		position: [19, 26],
		interactionName: 'readout',
		interactionArgs: ["I don't feel like praying right now."],
	};
	pawnStore.registerSprite(church);
	const mayorSign: Sprite = {
		spriteId: 'mayorSign',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 22],
		interactionName: 'readout',
		interactionArgs: ["Mayor's House"],
	};
	pawnStore.registerSprite(mayorSign);
	const mayor: Sprite = {
		spriteId: 'mayor',
		isCharacter: false,
		isAutoInteract: false,
		position: [5, 26],
		interactionName: 'readout',
		interactionArgs: ["I don't know who lives here. But I don't think I need to go in here"],
	};
	pawnStore.registerSprite(mayor);
	const hospitalSign: Sprite = {
		spriteId: 'hospitalSign',
		isCharacter: false,
		isAutoInteract: false,
		position: [9, 4],
		interactionName: 'readout',
		interactionArgs: ['Clinic'],
	};
	pawnStore.registerSprite(hospitalSign);
	const hospital: Sprite = {
		spriteId: 'hospital',
		isCharacter: false,
		isAutoInteract: false,
		position: [4, 3],
		interactionName: 'readout',
		interactionArgs: ["I don't need a doctor.... Anymore..."],
	};
	pawnStore.registerSprite(hospital);

	if (timelineStore.currentTime === 2 && !timelineStore.Lavelle_home) {
		const Lavelle: Sprite = {
			spriteId: 'Lavelle',
			spriteSrc: 'Lavelle',
			isCharacter: true,
			isAutoInteract: false,
			position: [16, 8],
			coords: [2, 1],
			interactionName: 'returnDialogue',
			interactionArgs: ['2e1', 'Lavelle'],
		};
		pawnStore.registerSprite(Lavelle);
		const Lavelle_Across: Sprite = {
			spriteId: 'Lavelle_Across',
			isCharacter: false,
			isAutoInteract: false,
			position: [16, 9],
			interactionName: 'returnDialogue',
			interactionArgs: ['2e1', 'Lavelle'],
		};
		pawnStore.registerSprite(Lavelle_Across);
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
		interactionArgs: ["To Abigail's Farm"],
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
		position: [3, 16],
		interactionName: 'readout',
		interactionArgs: ['To Bluffs'],
	};
	pawnStore.registerSprite(Bluffs1);
	pawnStore.registerSprite(Bluffs2);
	pawnStore.registerSprite(Bluffs_Sign);
};
export default openMarket_SamGoneLevel;
