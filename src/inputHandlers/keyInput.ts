import { usePromptStore } from '@/stores/prompt';
import { usePawnStore } from '@/stores/pawn';
import { AudioPlayer } from '../Audio/Audio';
import { audios } from '@/Audio/audios';
import { useCutsceneStore } from '@/stores/cutscene';
import { useSettingsStore } from '@/stores/settings';

type KeyHandlerMap = {
	[key: string]: (event: KeyboardEvent) => void;
};

const keyStatusMap: { [key: string]: boolean } = {};

const blip = audios['blip'];
const select = audios['select'];

const movementDirections: string[] = [];
let movementInterval: number | undefined = undefined;
const movementIntervalMs = 175;
let lastMovement: number | null = null;
const move = (direction: string) => {
	// If a prompt is open, capture input and handle it
	const promptStore = usePromptStore();
	if (promptStore.promptIsOpen) {
		if (direction !== 'n' && direction !== 's') return;
		blip.play();
		promptStore.changeSelection(direction);
		return;
	}
	if (useCutsceneStore().cutsceneActive) return;
	if (useSettingsStore().anyOpen) return;

	// Movement logic
	if (movementInterval === undefined) {
		movementDirections.push(direction);
		movementInterval = window.setInterval(() => {
			const direction = movementDirections.at(-1);
			if (!direction) {
				window.clearInterval(movementInterval);
				movementInterval = undefined;
			} else {
				move(direction);
			}
		}, movementIntervalMs);
	}
	if (!movementDirections.includes(direction)) movementDirections.push(direction);

	const now = performance.now();
	if (
		movementDirections.at(-1) == direction &&
		(lastMovement === null || now - lastMovement >= movementIntervalMs - 10)
	) {
		usePawnStore().playerMoveListener(direction);
		lastMovement = performance.now();
	}
};
const stopMove = (direction: string) => {
	movementDirections.splice(movementDirections.indexOf(direction), 1);
};

const interact = () => {
	// If a prompt is open, capture input and handle it
	const promptStore = usePromptStore();
	if (promptStore.promptIsOpen) {
		select.play();
		promptStore.selectChoice();
		return;
	}
	if (useCutsceneStore().cutsceneActive) return;

	// Normal behaviour
	usePawnStore().playerInteract();
};

const downHandlers: KeyHandlerMap = {
	Enter() {
		interact();
	},
	s() {
		move('s');
	},
	ArrowDown() {
		move('s');
	},
	a() {
		move('w');
	},
	ArrowLeft() {
		move('w');
	},
	w() {
		move('n');
	},
	ArrowUp() {
		move('n');
	},
	d() {
		move('e');
	},
	ArrowRight() {
		move('e');
	},
};

const upHandlers: KeyHandlerMap = {
	s() {
		stopMove('s');
	},
	ArrowDown() {
		stopMove('s');
	},
	a() {
		stopMove('w');
	},
	ArrowLeft() {
		stopMove('w');
	},
	w() {
		stopMove('n');
	},
	ArrowUp() {
		stopMove('n');
	},
	d() {
		stopMove('e');
	},
	ArrowRight() {
		stopMove('e');
	},
};

export const downHandler = (event: KeyboardEvent) => {
	if (keyStatusMap[event.key]) return;
	keyStatusMap[event.key] = true;
	const handler = downHandlers[event.key];
	if (!handler) return;
	handler(event);
};

export const upHandler = (event: KeyboardEvent) => {
	if (!keyStatusMap[event.key]) return;
	keyStatusMap[event.key] = false;
	const handler = upHandlers[event.key];
	if (!handler) return;
	handler(event);
};
