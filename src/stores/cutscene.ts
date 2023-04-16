import { AudioPlayer } from '@/Audio/Audio';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePromptStore } from './prompt';

export type CutsceneSprite = {
	imgSrc: string;
	coords: [number, number];
	position: [number, number];
};

export const useCutsceneStore = defineStore('cutscene', () => {
	// this should all get cleaned up
	const cutsceneActive = ref(false);
	const cutsceneCameraPosition = ref([0, 0]);
	const curtainOpacity = ref(0);
	const cutsceneSprites = ref<CutsceneSprite[]>([]);
	const image = ref<string | null>(null);
	const imageOpacity = ref(0);

	const getCamera = () => {
		const cameraEl = document.getElementById('camera');
		if (!cameraEl) throw Error('no camera');
		return cameraEl;
	};
	const getCurtain = () => {
		const curtainEl = document.getElementById('curtain');
		if (!curtainEl) throw Error('no curtain');
		return curtainEl;
	};
	const getImage = () => {
		const imageEl = document.getElementById('cutscene-image');
		if (!imageEl) throw Error('no image');
		return imageEl;
	};
	const moveCamera = (
		to: [number, number],
		durationMs: number = 0,
		easingFunction: string = 'ease',
	) => {
		return new Promise<void>((resolve) => {
			const cameraEl = getCamera();
			if (durationMs > 0) {
				cameraEl.style.transition = `top ${durationMs}ms ${easingFunction}, left ${durationMs}ms ${easingFunction}`;
			}
			cutsceneCameraPosition.value = to;
			setTimeout(() => {
				cameraEl.style.transition = '';
				resolve();
			}, durationMs);
		});
	};
	const fadeCamera = (direction: 'in' | 'out', durationMs: number = 0) => {
		return new Promise<void>((resolve) => {
			const curtainEl = getCurtain();
			curtainOpacity.value = direction === 'in' ? 1 : 0;
			setTimeout(() => {
				if (durationMs > 0) {
					curtainEl.style.transition = `opacity ${durationMs}ms`;
				}
				curtainOpacity.value = direction === 'in' ? 0 : 1;
				setTimeout(() => {
					curtainEl.style.transition = '';
					resolve();
				}, durationMs);
			}, 50);
		});
	};
	const wait = (durationMs: number) => {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, durationMs);
		});
	};
	const addSprite = (sprite: CutsceneSprite) => {
		cutsceneSprites.value = [...cutsceneSprites.value, sprite];
		return sprite;
	};
	const removeSprite = (sprite: CutsceneSprite) => {
		const index = cutsceneSprites.value.indexOf(sprite);
		if (index === -1) throw Error('sprite is not in cutscene');
		cutsceneSprites.value.splice(index, 1);
		cutsceneSprites.value = [...cutsceneSprites.value];
	};
	const walkSprite = async (sprite: CutsceneSprite, to: [number, number], stepMs: number = 300) => {
		const index = cutsceneSprites.value.indexOf(sprite);
		if (index === -1) throw Error('sprite is not in cutscene');
		if (sprite.position[0] !== to[0] && sprite.position[1] !== to[1]) {
			throw Error('can only walk in one axis for now...');
		}
		const positionIndex = sprite.position[0] !== to[0] ? 0 : 1;
		const change = to[positionIndex] > sprite.position[positionIndex] ? 1 : -1;
		while (sprite.position[positionIndex] !== to[positionIndex]) {
			sprite.position[positionIndex] += change;
			cutsceneSprites.value = [...cutsceneSprites.value];
			await wait(stepMs);
		}
	};
	const playAudio = (audioName: string) => {
		return new AudioPlayer(`src/assets/audio/${audioName}`).play();
	};
	const showImage = (
		imageName: string,
		durationMs: number,
		options: { fade?: 'in' | 'out' | 'in-out'; fadeDurationMs?: number } = {},
	) => {
		return new Promise<void>((resolve) => {
			const { fade = '', fadeDurationMs = 0 } = options;
			imageOpacity.value = fade.includes('in') ? 0 : 1;
			image.value = imageName;
			const imageEl = getImage();
			setTimeout(() => {
				if (fade.includes('in')) {
					imageEl.style.transition = `opacity ${fadeDurationMs}ms`;
				}
				if (imageOpacity.value !== 1) imageOpacity.value = 1;
				setTimeout(
					() => {
						setTimeout(() => {
							imageOpacity.value = 0;
							setTimeout(
								() => {
									imageEl.style.transition = '';
									image.value = null;
									resolve();
								},
								fade.includes('out') ? fadeDurationMs : 0,
							);
						}, durationMs);
					},
					fade.includes('in') ? fadeDurationMs : 0,
				);
			}, 50);
		});
	};
	const runCutscene = async (
		levelName: string,
		cutsceneScript: (tools: {
			camera: { move: typeof moveCamera; fade: typeof fadeCamera };
			wait: typeof wait;
			addSprite: typeof addSprite;
			removeSprite: typeof removeSprite;
			walkSprite: typeof walkSprite;
			playAudio: typeof playAudio;
			showImage: typeof showImage;
		}) => Promise<void>,
	) => {
		const levelStore = useLevelStore();
		cutsceneActive.value = true;
		levelStore.openLevel(levelName, true);
		await cutsceneScript({
			camera: { move: moveCamera, fade: fadeCamera },
			wait,
			addSprite,
			removeSprite,
			walkSprite,
			playAudio,
			showImage,
		});
		levelStore.cutsceneMatrix.length = 0; // Wipe cutscene level so that normal level shows
		curtainOpacity.value = 0; // Ensure curtain is up after cutscene
		cutsceneActive.value = false;
		cutsceneCameraPosition.value = [0, 0];
		cutsceneSprites.value = [];
		image.value = null;
	};

	return {
		cutsceneActive,
		cutsceneCameraPosition,
		curtainOpacity,
		cutsceneSprites,
		image,
		imageOpacity,
		runCutscene,
	};
});

export const exampleCutscene = () => {
	useCutsceneStore().runCutscene(
		'Village',
		async ({ camera, wait, addSprite, walkSprite, playAudio, showImage }) => {
			const sprite: CutsceneSprite = {
				imgSrc: 'Char00',
				coords: [0, 0],
				position: [10, 11],
			};
			addSprite(sprite);
			const promptStore = usePromptStore();
			await camera.move([0, 0]);
			const introLength = 5000;
			await Promise.all([camera.fade('in', introLength), camera.move([10, 11], introLength)]);
			await wait(1000);
			await promptStore.choicePrompt({
				imgSrc: 'Char00',
				title: 'Some Rando',
				message:
					'This is an example of dialogue during a cutscene from some rando, who is about to take a little stroll.',
				choices: [{ text: 'Weird...', result: '' }],
			});
			await wait(1000);
			const speed = 300;
			await Promise.all([
				walkSprite(sprite, [15, 11], speed),
				camera.move([15, 11], speed * 5, 'linear'),
			]);
			await Promise.all([
				playAudio('yeah.wav'),
				showImage('yeah.jpg', 2000, { fade: 'in-out', fadeDurationMs: 200 }),
			]);
			const outroLength = 5000;
			await Promise.all([camera.fade('out', outroLength), camera.move([0, 0], outroLength)]);
		},
	);
};

export const openingCutscene = () => {
	useCutsceneStore().runCutscene('Bluffs', async ({ camera, wait, addSprite, walkSprite }) => {
		const sprite: CutsceneSprite = {
			imgSrc: 'Char_PC_Dark',
			coords: [3, 1],
			position: [27, 11],
		};
		addSprite(sprite);
		const promptStore = usePromptStore();
		await camera.move([0, 11]);
		const introLength = 5000;
		await Promise.all([camera.fade('in', introLength), camera.move([27, 11], introLength)]);
		await wait(1000);
		// await promptStore.choicePrompt({
		// 	imgSrc: '',
		// 	title: 'Welcome',
		// 	message: '',
		// 	choices: [{ text: 'Weird...', result: '' }],
		// });
		// await wait(1000);
		const speed = 100;
		// Show break Image
		await Promise.all([
			walkSprite(sprite, [25, 11], speed),
			// camera.move([15, 11], speed * 5, 'linear'),
		]);
		await wait(1000);
		const outroLength = 5000;
		await Promise.all([camera.fade('out', outroLength), camera.move([0, 11], outroLength)]);
	});
};
