import { AudioPlayer } from '@/Audio/Audio';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePromptStore } from './prompt';
import { usePawnStore } from './pawn';
import { runInteraction } from '@/assets/interactions/interactions';
import { useTimelineStore } from './timeline';
import { useFilterStore } from './filters';

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
		console.log('turing sprite');
		const index = cutsceneSprites.value.findIndex((s) => s.id === sprite.id);
		if (index === -1) throw Error('sprite is not in cutscene');
		if (direction < 0 || direction > 3) {
			throw Error('can only turn in 4 directions...');
		}
		cutsceneSprites.value[index].coords[0] = direction;
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
		'Bluffs_Full',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, playAudio, showImage }) => {
			const filterStore = useFilterStore();
			const levelStore = useLevelStore();
			filterStore.enableFilter('night');
			const sprite: CutsceneSprite = {
				imgSrc: 'PC_Dark',
				coords: [0, 1],
				position: [27, 11],
			};
			addSprite(sprite);
			// const promptStore = usePromptStore();
			await camera.move([0, 11], 0);
			const introLength = 5000;
			await Promise.all([camera.fade('in', introLength), camera.move([24, 11], introLength)]);
			await wait(1000);
			setTimeout(() => {
				levelStore.cutsceneMatrix[26][11].layers[1].coord = [6, 5];
				removeSprite(sprite);
			}, 500);
			await Promise.all([
				//playAudio('woodBreak.wav'),
				showImage('fenceBreak.png', 2000, { fade: 'in-out', fadeDurationMs: 500 }),
			]);

			setTimeout(() => {
				showImage('TitleScreen.png', 8000, { fade: 'in-out', fadeDurationMs: 2000 });
			}, 2000);
			await Promise.all([camera.move([5, 11], introLength)]);
			await camera.fade('out', 1000);
			await wait(5000);
			await runInteraction('noReturnDialogue', ['intro']);
			await wait(1000);
			await levelStore.openLevel('Name4_House', false, [4, 7, 'w']);
			await camera.move([4, 7]);
			levelStore.cutsceneMatrix = [];
			await camera.fade('in', 1000);
		},
	);
};

export const altarCutscene = () => {
	useCutsceneStore().runCutscene(
		'Name2_House_Upper',
		async ({
			camera,
			wait,
			showImage,
			addSprite,
			removeSprite,
			walkSprite,
			turnSprite,
			playAudio,
		}) => {
			// Add PC, Character 0, and Character 1
			const Name2Sprite: CutsceneSprite = {
				imgSrc: 'Name2',
				coords: [3, 1],
				position: [4, 3],
			};
			addSprite(Name2Sprite);
			const Name3Sprite: CutsceneSprite = {
				imgSrc: 'Name3',
				coords: [3, 1],
				position: [6, 5],
			};
			const Name2_DeadSprite: CutsceneSprite = {
				imgSrc: 'Name2_Dead',
				coords: [0, 1],
				position: [4, 3],
			};

			// Starting camera position
			await camera.move([4, 3], 0);
			await Promise.all([camera.fade('in', 500)]);
			await wait(300);
			await runInteraction('noReturnDialogue', ['23n0']);
			await turnSprite(Name2Sprite, 2);
			await wait(300);
			// Fade In
			addSprite(Name3Sprite);

			// Player Character walks part of the path
			await walkSprite(Name3Sprite, [4, 5], 300);
			await turnSprite(Name3Sprite, 1);
			await walkSprite(Name3Sprite, [4, 4]);
			await wait(300);
			await runInteraction('noReturnDialogue', ['23n1']);
			await wait(200);
			setTimeout(() => {
				removeSprite(Name2Sprite);
				addSprite(Name2_DeadSprite);
			}, 100);

			await Promise.all([
				//playAudio('woodBreak.wav'),
				showImage('KnifeIndoor.png', 1000, { fade: 'in-out', fadeDurationMs: 500 }),
			]);
			await wait(1000);

			await Promise.all([camera.fade('out', 1000)]);
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
	timelineStore.farmSceneOccurred = true;
};

export const FarmCutscene = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
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
	timelineStore.farmSceneOccurred = true;
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

export const BluffsCutscene = () => {
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	const levelStore = useLevelStore();
	const character = `PC_${pawnStore.characterId}`;
	const smallWait = 300;
	const longWait = 1000;
	const endWait = 5000;

	useCutsceneStore().runCutscene(
		'Bluffs_Full',
		async ({
			camera,
			wait,
			addSprite,
			removeSprite,
			showImage,
			walkSprite,
			turnSprite,
			playAudio,
		}) => {
			camera.move([22, 10], 0);
			// FINAL CONFRONTATION Start
			if (!timelineStore.Name2_toBluffs && timelineStore.Name3_follow) {
				// Add PC and Name4 to scene
				const CharacterSprite: CutsceneSprite = {
					imgSrc: character,
					coords: [3, 1],
					position: [29, 11],
				};
				addSprite(CharacterSprite);
				const CharacterGhostSprite: CutsceneSprite = {
					imgSrc: pawnStore.characterId,
					coords: [3, 1],
					position: [31, 11],
				};
				addSprite(CharacterGhostSprite);
				const Name3Sprite: CutsceneSprite = {
					imgSrc: 'Name3',
					coords: [3, 1],
					position: [31, 14],
				};
				addSprite(Name3Sprite);

				// Fade in
				await camera.fade('in', longWait);
				await wait(smallWait);

				// PC attempts to walk to ledge, Name4 walks out and stops them
				await walkSprite(CharacterSprite, [28, 11], smallWait);
				await walkSprite(Name3Sprite, [30, 14], 100);
				await runInteraction('noReturnDialogue', ['fc0']);

				// PC turns around
				await turnSprite(CharacterSprite, 0);
				await wait(smallWait);

				// Name3 comes into scene
				const Name2Sprite: CutsceneSprite = {
					imgSrc: 'Name2',
					coords: [3, 1],
					position: [31, 9],
				};
				addSprite(Name2Sprite);

				// Setting Name2 passed out
				const Name2PassedOutSprite: CutsceneSprite = {
					imgSrc: 'Name2_Unconscious',
					coords: [0, 0],
					position: [30, 10],
				};

				// Name 2 turns in confusion, Name 3 goes up to Name3 and punched them
				await walkSprite(Name2Sprite, [30, 9]);
				await wait(smallWait);
				await turnSprite(Name2Sprite, 2);
				await wait(smallWait);
				await turnSprite(Name2Sprite, 3);
				await wait(smallWait);
				await runInteraction('noReturnDialogue', ['fc1']);
				await wait(smallWait);
				await Promise.all([
					turnSprite(Name2Sprite, 2),
					turnSprite(Name3Sprite, 1),
					walkSprite(Name3Sprite, [30, 11], smallWait),
					walkSprite(Name2Sprite, [30, 10], smallWait),
				]);
				await runInteraction('noReturnDialogue', ['fc2']);
				// Switch standing up Name2 for the unconscious Name2 with punch
				setTimeout(() => {
					removeSprite(Name2Sprite);
					addSprite(Name2PassedOutSprite);
				}, 100);

				await Promise.all([
					//playAudio('woodBreak.wav'),
					showImage('punch.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
				]);
				await wait(longWait);
				await turnSprite(Name3Sprite, 3);
				await walkSprite(CharacterSprite, [28, 11], smallWait);
				await wait(longWait);
				await runInteraction('returnDialogue', ['fc3']);
				await wait(longWait);
				// Player takes control. This is gonna be long!
				if (timelineStore.finalSceneControl) {
					await walkSprite(CharacterGhostSprite, [28, 11], 50);
					await removeSprite(CharacterGhostSprite);
					await wait(smallWait);
					await runInteraction('returnDialogue', ['fc4']);
					await wait(longWait);
					console.log(timelineStore.endingChoice);
					switch (timelineStore.endingChoice) {
						case 6: {
							await wait(smallWait);
							const Name2Sprite: CutsceneSprite = {
								imgSrc: 'Name2',
								coords: [3, 1],
								position: [30, 10],
							};
							await Promise.all([removeSprite(Name2PassedOutSprite), addSprite(Name2Sprite)]);
							await runInteraction('noReturnDialogue', ['fc6']);
							await wait(smallWait);
							camera.fade('out', endWait);
							break;
						}
						case 5: {
							const Name2DeadSprite: CutsceneSprite = {
								imgSrc: 'Name2_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							await turnSprite(Name3Sprite, 1);
							await wait(smallWait);
							setTimeout(() => {
								removeSprite(Name2PassedOutSprite);
								addSprite(Name2DeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							const Name3DeadSprite: CutsceneSprite = {
								imgSrc: 'Name2_Dead',
								coords: [0, 0],
								position: [30, 11],
							};
							setTimeout(() => {
								removeSprite(Name3Sprite);
								addSprite(Name3DeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife3.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							camera.fade('out', endWait * 2);
							break;
						}
						case 4: {
							const Name3DeadSprite: CutsceneSprite = {
								imgSrc: 'Name2_Dead',
								coords: [0, 0],
								position: [30, 11],
							};
							setTimeout(() => {
								removeSprite(Name3Sprite);
								addSprite(Name3DeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);

							await wait(smallWait);
							const Name2Sprite: CutsceneSprite = {
								imgSrc: 'Name2',
								coords: [3, 1],
								position: [31, 14],
							};
							await Promise.all([removeSprite(Name2PassedOutSprite), addSprite(Name2Sprite)]);
							await wait(smallWait);
							camera.fade('out', endWait * 2);
							break;
						}
						case 2: {
							const Name2DeadSprite: CutsceneSprite = {
								imgSrc: 'Name2_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							await turnSprite(Name3Sprite, 1);
							await wait(smallWait);
							setTimeout(() => {
								removeSprite(Name2PassedOutSprite);
								addSprite(Name2DeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							await walkSprite(CharacterSprite, [29, 11], smallWait);
							await wait(smallWait);
							await runInteraction('returnDialogue', ['fc5']);
							await wait(smallWait);
							if (timelineStore.PCKillsName3) {
								const Name3DeadSprite: CutsceneSprite = {
									imgSrc: 'Name3_Dead',
									coords: [0, 0],
									position: [30, 11],
								};

								setTimeout(() => {
									removeSprite(Name3Sprite);
									addSprite(Name3DeadSprite);
								}, 100);

								await Promise.all([
									//playAudio('woodBreak.wav'),
									showImage('Knife3.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
								]);
								camera.fade('out', endWait);
								break;
							} else {
								camera.fade('out', endWait * 2);
								break;
							}
						}
						case 1: {
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Punch.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Punch1.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							const CharacterDeadSprite: CutsceneSprite = {
								imgSrc: `PC_Dead_${pawnStore.characterId}`,
								coords: [0, 0],
								position: [29, 11],
							};

							setTimeout(() => {
								removeSprite(CharacterSprite);
								addSprite(CharacterDeadSprite);
							}, 100);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							const Name2Sprite: CutsceneSprite = {
								imgSrc: 'Name2',
								coords: [3, 1],
								position: [31, 14],
							};
							await Promise.all([removeSprite(Name2PassedOutSprite), addSprite(Name2Sprite)]);
							await turnSprite(Name2Sprite, 0);
							await walkSprite(Name2Sprite, [31, 14]);
							await removeSprite(Name2Sprite);

							await turnSprite(Name3Sprite, 1);
							await wait(smallWait);
							await turnSprite(Name3Sprite, 2);
							await wait(smallWait);
							await turnSprite(Name3Sprite, 1);
							await wait(smallWait);
							await turnSprite(Name3Sprite, 2);
							await wait(smallWait);
							await turnSprite(Name3Sprite, 0);
							await wait(smallWait);

							const Name2SpriteBack: CutsceneSprite = {
								imgSrc: 'Name2',
								coords: [3, 1],
								position: [31, 9],
							};
							const GuardSprite: CutsceneSprite = {
								imgSrc: 'Name2',
								coords: [3, 1],
								position: [31, 9],
							};
							await addSprite(GuardSprite);
							await walkSprite(GuardSprite, [30, 9], smallWait);
							await addSprite(Name2SpriteBack);
							await Promise.all([
								walkSprite(GuardSprite, [28, 9], smallWait),
								walkSprite(Name2SpriteBack, [29, 9], smallWait),
							]);
							await wait(smallWait);
							camera.fade('out', endWait);
							break;
						}

						case 0: {
							const Name2DeadSprite: CutsceneSprite = {
								imgSrc: 'Name2_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							const CharacterDeadSprite: CutsceneSprite = {
								imgSrc: `PC_Dead_${pawnStore.characterId}`,
								coords: [0, 0],
								position: [29, 11],
							};
							await turnSprite(Name3Sprite, 1);
							await runInteraction('noReturnDialogue', ['fcEnd0_0']);
							// Switch unconscious Name2 for the dead Name2 with knife
							await wait(500);
							setTimeout(() => {
								removeSprite(Name2PassedOutSprite);
							}, 100);
							addSprite(Name2DeadSprite);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await walkSprite(CharacterSprite, [29, 11], smallWait);
							await turnSprite(Name3Sprite, 3);
							await runInteraction('noReturnDialogue', ['fcEnd0_1alt']);
							// Switch unconscious PC for the dead Name2 with knife
							setTimeout(() => {
								removeSprite(CharacterSprite);
							}, 100);
							addSprite(CharacterDeadSprite);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							camera.fade('out', endWait);
							break;
						}
					}
				}
				// Player chose not to take control.
				else {
					const Name2DeadSprite: CutsceneSprite = {
						imgSrc: 'Name2_Dead',
						coords: [0, 0],
						position: [30, 10],
					};
					const CharacterDeadSprite: CutsceneSprite = {
						imgSrc: `PC_Dead_${pawnStore.characterId}`,
						coords: [0, 0],
						position: [29, 11],
					};
					await turnSprite(Name3Sprite, 1);
					await runInteraction('noReturnDialogue', ['fcEnd0_0']);
					// Switch unconscious Name2 for the dead Name2 with knife
					await wait(500);
					setTimeout(() => {
						removeSprite(Name2PassedOutSprite);
					}, 100);
					addSprite(Name2DeadSprite);
					await Promise.all([
						//playAudio('woodBreak.wav'),
						showImage('Knife2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
					]);
					await walkSprite(CharacterSprite, [29, 11], smallWait);
					await turnSprite(Name3Sprite, 3);
					await runInteraction('noReturnDialogue', ['fcEnd0_1']);
					// Switch unconscious PC for the dead Name2 with knife
					setTimeout(() => {
						removeSprite(CharacterSprite);
					}, 100);
					addSprite(CharacterDeadSprite);
					await Promise.all([
						//playAudio('woodBreak.wav'),
						showImage('Knife4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
					]);
					await camera.fade('out', endWait);
				}
			}
			// Name2 watches Name4 die
			else if (!timelineStore.Name2_home && !timelineStore.Name3_follow) {
				const CharacterSprite: CutsceneSprite = {
					imgSrc: character,
					coords: [3, 1],
					position: [29, 11],
				};
				addSprite(CharacterSprite);
				const Name2Sprite: CutsceneSprite = {
					imgSrc: 'Name2',
					coords: [3, 1],
					position: [31, 9],
				};
				addSprite(Name2Sprite);
				await camera.fade('in', smallWait);

				await walkSprite(CharacterSprite, [27, 11], smallWait);
				await walkSprite(Name2Sprite, [29, 9], smallWait);

				setTimeout(() => {
					removeSprite(CharacterSprite);
					levelStore.cutsceneMatrix[26][11].layers[1].coord = [6, 5];
					levelStore.levelMatrix[26][11].layers[1].coord = [6, 5];
				}, 100);
				await Promise.all([
					//playAudio('woodBreak.wav'),
					showImage('fenceBreak.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
				]);

				await runInteraction('returnDialogue', ['24n1']);
				await wait(smallWait);
				turnSprite(Name2Sprite, 0);
				await Promise.all([walkSprite(Name2Sprite, [31, 9], 100), camera.fade('out', smallWait)]);
			}
			// Name4 falls alone
			else {
				const CharacterSprite: CutsceneSprite = {
					imgSrc: character,
					coords: [3, 1],
					position: [29, 11],
				};
				addSprite(CharacterSprite);
				await camera.fade('in', smallWait);

				await walkSprite(CharacterSprite, [27, 11], smallWait);

				await wait(1000);
				setTimeout(() => {
					removeSprite(CharacterSprite);
					levelStore.cutsceneMatrix[26][11].layers[1].coord = [6, 5];
				}, 100);
				await Promise.all([
					//playAudio('woodBreak.wav'),
					showImage('fenceBreak.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
				]);
				timelineStore.Name4_dead = true;
				await camera.fade('out', endWait);
			}
		},
	);
};
