import { usePromptStore } from '@/stores/prompt';
import { useSpriteStore } from '@/stores/sprite';
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';

type KeyHandlerMap = {
	[key: string]: (event: KeyboardEvent) => void;
};

const blip = new Audio('src/assets/audio/menuBlip.wav');

const move = (direction: string) => {
	// If a prompt is open, capture input and handle it
	const { isNoAudio } = storeToRefs(useSettingsStore());
	const promptStore = usePromptStore();
	if (promptStore.promptIsOpen) {
		if (direction !== 'n' && direction !== 's') return;
		if (!isNoAudio.value) {
			blip.play();
		}
		promptStore.changeSelection(direction);
		return;
	}

	// Normal behaviour
	const store = useSpriteStore();
	store.playerMoveListener(direction);
};

const interact = () => {
	// If a prompt is open, capture input and handle it
	const promptStore = usePromptStore();
	if (promptStore.promptIsOpen) {
		promptStore.selectChoice();
		return;
	}

	// Normal behaviour
	const store = useSpriteStore();
	store.playerInteract();
};

const handlers: KeyHandlerMap = {
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

export const keyHandler = (event: KeyboardEvent) => {
	const handler = handlers[event.key];
	if (!handler) return;
	handler(event);
};
