import { onMounted, onUnmounted } from 'vue';

export function useKeyHandler(handler: (e: KeyboardEvent) => void) {
	onMounted(() => {
		window.addEventListener('keydown', handler);
	});
	onUnmounted(() => {
		window.removeEventListener('keydown', handler);
	});
}
