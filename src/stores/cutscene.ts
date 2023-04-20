import { AudioPlayer } from '@/Audio/Audio';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePromptStore } from './prompt';
import { usePawnStore } from './pawn';
import { runInteraction } from '@/assets/interactions/interactions';
import { useTimelineStore } from './timeline';

export type CutsceneSprite = {
	imgSrc: string;
	coords: [number, number];
	position: [number, number];
	id?: number;
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
	let spriteId = 0;
	const addSprite = (sprite: CutsceneSprite) => {
		cutsceneSprites.value = [...cutsceneSprites.value, sprite];
		sprite.id = spriteId++;
	};
	const removeSprite = (sprite: CutsceneSprite) => {
		const index = cutsceneSprites.value.findIndex((s) => s.id === sprite.id);
		if (index === -1) throw Error('sprite is not in cutscene');
		cutsceneSprites.value.splice(index, 1);
		cutsceneSprites.value = [...cutsceneSprites.value];
	};
	const walkSprite = async (sprite: CutsceneSprite, to: [number, number], stepMs: number = 300) => {
		const index = cutsceneSprites.value.findIndex((s) => s.id === sprite.id);
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
	const turnSprite = async (sprite: CutsceneSprite, direction: number) => {
		const index = cutsceneSprites.value.findIndex((s) => s.id === sprite.id);
		if (index === -1) throw Error('sprite is not in cutscene');
		if (direction < 0 && direction > 3) {
			throw Error('can only turn in 4 directions...');
		}
		sprite.coords[0] = direction;
		cutsceneSprites.value = [...cutsceneSprites.value];
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
			turnSprite: typeof turnSprite;
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
			turnSprite,
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
	useCutsceneStore().runCutscene(
		'Bluffs',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, playAudio, showImage }) => {
			const sprite: CutsceneSprite = {
				imgSrc: 'Char_PC_Dark',
				coords: [3, 1],
				position: [27, 11],
			};
			addSprite(sprite);
			// const promptStore = usePromptStore();
			await camera.move([0, 11], 0);
			const introLength = 5000;
			await Promise.all([camera.fade('in', introLength), camera.move([24, 11], introLength)]);
			await wait(1000);
			setTimeout(() => {
				removeSprite(sprite);
			}, 500);
			await Promise.all([
				//playAudio('woodBreak.wav'),
				showImage('fenceBreak.png', 2000, { fade: 'in-out', fadeDurationMs: 500 }),
			]);

			setTimeout(() => {
				showImage('TitleScreen.png', 10000, { fade: 'in-out', fadeDurationMs: 2000 });
			}, 2000);
			await Promise.all([camera.move([5, 11], introLength)]);
			// await wait(1000);
		},
	);
};

export const FarmBothCutscene = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	const character = `PC_${pawnStore.characterId}`;
	useCutsceneStore().runCutscene(
		'Farm_Half',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			// Add PC, Character 0, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [10, 3],
			};
			addSprite(CharacterSprite);
			const Name1Sprite: CutsceneSprite = {
				imgSrc: 'Name1',
				coords: [0, 1],
				position: [7, 22],
			};
			addSprite(Name1Sprite);
			const Name0Sprite: CutsceneSprite = {
				imgSrc: 'Name0',
				coords: [3, 1],
				position: [8, 22],
			};
			addSprite(Name0Sprite);

			// Starting camera position
			await camera.move([10, 2], 0);

			// Fade In
			await Promise.all([camera.fade('in', 500)]);

			// Player Character walks part of the path
			await Promise.all([
				walkSprite(CharacterSprite, [10, 11], 300),
				camera.move([10, 14], 300 * 5, 'linear'),
			]);

			// PC observes the two
			await wait(750);
			// Conversation with no return plays
			await runInteraction('noReturnDialogue', ['014e0']);

			await turnSprite(CharacterSprite, 1);

			// PC walks back while screen fades, then cutscene ends
			await Promise.all([
				walkSprite(CharacterSprite, [10, 3], 300),
				camera.move([10, 17], 300 * 5, 'linear'),
			]);
			await removeSprite(CharacterSprite);

			if (timelineStore.Name1_angry) {
				await runInteraction('returnDialogue', ['01e0']);
			} else {
				await runInteraction('returnDialogue', ['01e1']);
			}
			await Promise.all([camera.move([10, 11], 300 * 5, 'linear'), camera.fade('out', 1000)]);
		},
	);
};

export const FarmCutscene = () => {
	const pawnStore = usePawnStore();
	const character = `PC_${pawnStore.characterId}`;
	useCutsceneStore().runCutscene(
		'Farm_Half',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			// Add PC, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [10, 3],
			};
			addSprite(CharacterSprite);
			const Name1Sprite: CutsceneSprite = {
				imgSrc: 'Name1',
				coords: [1, 1],
				position: [4, 13],
			};
			addSprite(Name1Sprite);

			// Starting camera position
			await camera.move([10, 2], 0);

			// Fade In
			await Promise.all([camera.fade('in', 500)]);

			// Player Character walks part of the path
			await Promise.all([
				walkSprite(CharacterSprite, [10, 11], 300),
				camera.move([10, 14], 300 * 5, 'linear'),
			]);

			// PC turns north to see Character 1
			await turnSprite(CharacterSprite, 3);

			// PC observes Character 1
			await wait(750);
			// Conversation with no return plays
			await runInteraction('noReturnDialogue', ['14e0']);

			// PC turns back
			await turnSprite(CharacterSprite, 1);

			// PC walks back while screen fades, then cutscene ends
			await Promise.all([
				walkSprite(CharacterSprite, [10, 0], 300),
				camera.move([10, 11], 300 * 5, 'linear'),
				camera.fade('out', 1000),
			]);

			await removeSprite(CharacterSprite);
		},
	);
};

export const MarketCutscene = () => {
	const pawnStore = usePawnStore();
	const character = `PC_${pawnStore.characterId}`;
	useCutsceneStore().runCutscene(
		'Market_Full',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			// Add PC, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [16, 19],
			};
			addSprite(CharacterSprite);
			const Name2Sprite: CutsceneSprite = {
				imgSrc: 'Name2',
				coords: [2, 2],
				position: [16, 8],
			};
			addSprite(Name2Sprite);

			const Name3Sprite: CutsceneSprite = {
				imgSrc: 'Name3',
				coords: [1, 1],
				position: [16, 10],
			};
			addSprite(Name3Sprite);

			// Starting camera position
			await camera.move([24, 11], 0);

			// Fade In
			await Promise.all([camera.fade('in', 500), camera.move([16, 11], 300 * 5, 'linear')]);
			await wait(300);

			// Conversation between Characters 2 and 3
			await runInteraction('noReturnDialogue', ['23a0']);

			// Character 3 turns North
			await Promise.all([turnSprite(Name3Sprite, 3), turnSprite(CharacterSprite, 1)]);

			// Character 3 walks North off screen, PC walks to Character 2's stall
			await Promise.all([
				walkSprite(Name3Sprite, [2, 10], 300),
				walkSprite(CharacterSprite, [16, 10], 300),
			]);

			// Conversation between Character 2 and PC
			await runInteraction('noReturnDialogue', ['24a0']);

			// Turn PC East
			await turnSprite(CharacterSprite, 2);

			// PC walks away while the camera fades.
			await Promise.all([walkSprite(CharacterSprite, [16, 14], 300), camera.fade('out', 300)]);
		},
	);
};
