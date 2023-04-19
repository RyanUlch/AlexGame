import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import type { Sprite } from '@/stores/pawn';
const openMarket_EmptyLevel = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

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
export default openMarket_EmptyLevel;
