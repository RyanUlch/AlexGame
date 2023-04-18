import { onMounted, onUnmounted } from 'vue';

export function useKeyHandler(
	downHandler: (e: KeyboardEvent) => void,
	upHandler: (e: KeyboardEvent) => void,
) {
	onMounted(() => {
		window.addEventListener('keydown', downHandler);
		window.addEventListener('keyup', upHandler);
	});
	onUnmounted(() => {
		window.removeEventListener('keydown', downHandler);
		window.removeEventListener('keyup', upHandler);
	});
}
