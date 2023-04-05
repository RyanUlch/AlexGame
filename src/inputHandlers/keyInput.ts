import { useSpriteStore } from '@/stores/spriteStore';

type KeyHandlerMap = {
	[key: string]: (event: KeyboardEvent) => void;
};

const move = (direction: string) => {
	const store = useSpriteStore();
	store.playerMoveListener(direction);
};

const interact = () => {
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
