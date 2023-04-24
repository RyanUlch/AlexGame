import { AudioPlayer } from '@/Audio/Audio';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePromptStore } from './prompt';
import { usePawnStore } from './pawn';
import { runInteraction } from '@/assets/interactions/interactions';
import { useTimelineStore } from './timeline';
import { useFilterStore } from './filters';
import { useSettingsStore } from './settings';
import { audios } from '@/Audio/audios';

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

export const openingCutscene = () => {
	useCutsceneStore().runCutscene(
		'Bluffs_Full',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, playAudio, showImage }) => {
			const filterStore = useFilterStore();
			const levelStore = useLevelStore();
			const wood = audios['break'];
			const splash = audios['splash'];
			filterStore.enableFilter('night');
			const sprite: CutsceneSprite = {
				imgSrc: 'PC_Dark',
				coords: [0, 1],
				position: [27, 11],
			};
			addSprite(sprite);
			// const promptStore = usePromptStore();
			await camera.move([8, 11], 0);
			const introLength = 5000;
			await Promise.all([camera.fade('in', introLength), camera.move([20, 11], introLength)]);
			await wait(1000);
			setTimeout(() => {
				levelStore.cutsceneMatrix[26][11].layers[1].coord = [6, 5];
				removeSprite(sprite);
			}, 500);
			await Promise.all([
				wood.play(),
				showImage('fenceBreak.png', 1000, { fade: 'in-out', fadeDurationMs: 500 }),
			]);
			splash.play(),
				setTimeout(() => {
					showImage('TitleScreen.png', 8000, { fade: 'in-out', fadeDurationMs: 2000 });
				}, 2000);
			await Promise.all([camera.move([8, 11], introLength)]);
			await camera.fade('out', 1000);
			await wait(3000);
			await runInteraction('noReturnDialogue', ['intro']);
			await wait(1000);
			await levelStore.openLevel('Alex_House', false, [4, 7, 'w']);
			await camera.move([4, 7]);
			levelStore.cutsceneMatrix = [];
			await camera.fade('in', 1000);
			useTimelineStore().gameStarted = true;
		},
	);
};

export const altarCutscene = () => {
	useCutsceneStore().runCutscene(
		'Lavelle_House_Upper',
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
			const LavelleSprite: CutsceneSprite = {
				imgSrc: 'Lavelle',
				coords: [3, 1],
				position: [4, 3],
			};
			addSprite(LavelleSprite);
			const TeddySprite: CutsceneSprite = {
				imgSrc: 'Teddy',
				coords: [3, 1],
				position: [6, 5],
			};
			const Lavelle_DeadSprite: CutsceneSprite = {
				imgSrc: 'Lavelle_Dead',
				coords: [0, 1],
				position: [4, 3],
			};

			// Starting camera position
			await camera.move([4, 3], 0);
			await Promise.all([camera.fade('in', 500)]);
			await wait(300);
			await runInteraction('noReturnDialogue', ['23n0']);
			await turnSprite(LavelleSprite, 2);
			await wait(300);
			// Fade In
			addSprite(TeddySprite);

			// Player Character walks part of the path
			await walkSprite(TeddySprite, [4, 5], 300);
			await turnSprite(TeddySprite, 1);
			await walkSprite(TeddySprite, [4, 4]);
			await wait(300);
			await runInteraction('noReturnDialogue', ['23n1']);
			await wait(200);
			setTimeout(() => {
				removeSprite(LavelleSprite);
				addSprite(Lavelle_DeadSprite);
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
	useCutsceneStore().runCutscene(
		'Farm_Half',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			const timelineStore = useTimelineStore();
			const character = `PC_F`;
			// Add PC, Character 0, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [10, 3],
			};
			addSprite(CharacterSprite);
			const AbigailSprite: CutsceneSprite = {
				imgSrc: 'Abigail',
				coords: [0, 1],
				position: [7, 22],
			};
			addSprite(AbigailSprite);
			const SamSprite: CutsceneSprite = {
				imgSrc: 'Sam',
				coords: [3, 1],
				position: [8, 22],
			};
			addSprite(SamSprite);

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

			if (timelineStore.Abigail_angry) {
				await runInteraction('returnDialogue', ['01e0']);
			} else {
				await runInteraction('returnDialogue', ['01e1']);
			}
			await Promise.all([camera.move([10, 11], 300 * 5, 'linear'), camera.fade('out', 1000)]);
			timelineStore.farmSceneOccurred = true;
		},
	);
};

export const FarmCutscene = () => {
	useCutsceneStore().runCutscene(
		'Farm_Half',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			const timelineStore = useTimelineStore();
			const character = `PC_F`;
			// Add PC, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [10, 3],
			};
			addSprite(CharacterSprite);
			const AbigailSprite: CutsceneSprite = {
				imgSrc: 'Abigail',
				coords: [1, 1],
				position: [4, 13],
			};
			addSprite(AbigailSprite);

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
			timelineStore.farmSceneOccurred = true;
		},
	);
};

export const MarketCutscene = () => {
	useCutsceneStore().runCutscene(
		'Market_Full',
		async ({ camera, wait, addSprite, removeSprite, walkSprite, turnSprite, playAudio }) => {
			const character = `PC_F`;
			// Add PC, and Character 1
			const CharacterSprite: CutsceneSprite = {
				imgSrc: character,
				coords: [2, 1],
				position: [16, 19],
			};
			addSprite(CharacterSprite);
			const LavelleSprite: CutsceneSprite = {
				imgSrc: 'Lavelle',
				coords: [2, 2],
				position: [16, 8],
			};
			addSprite(LavelleSprite);

			const marketStall1: CutsceneSprite = {
				imgSrc: 'Char00',
				position: [8, 8],
				coords: [2, 1],
			};
			addSprite(marketStall1);
			const marketStall2: CutsceneSprite = {
				imgSrc: 'Char02',
				position: [19, 12],
				coords: [3, 1],
			};
			addSprite(marketStall2);
			const marketStall3: CutsceneSprite = {
				imgSrc: 'Char03',
				position: [5, 12],
				coords: [0, 1],
			};
			addSprite(marketStall3);
			const marketStall4: CutsceneSprite = {
				imgSrc: 'Char18',
				position: [5, 7],
				coords: [0, 1],
			};
			addSprite(marketStall4);
			const marketStall5: CutsceneSprite = {
				imgSrc: 'Char12',
				position: [19, 17],
				coords: [3, 1],
			};
			addSprite(marketStall5);
			const marketStall6: CutsceneSprite = {
				imgSrc: 'Char05',
				position: [16, 21],
				coords: [1, 1],
			};
			addSprite(marketStall6);

			const TeddySprite: CutsceneSprite = {
				imgSrc: 'Teddy',
				coords: [1, 1],
				position: [16, 10],
			};
			addSprite(TeddySprite);

			// Starting camera position
			await camera.move([24, 11], 0);

			// Fade In
			await Promise.all([camera.fade('in', 500), camera.move([16, 11], 300 * 5, 'linear')]);
			await wait(300);

			// Conversation between Characters 2 and 3
			await runInteraction('noReturnDialogue', ['23a0']);

			// Character 3 turns North
			await Promise.all([turnSprite(TeddySprite, 3), turnSprite(CharacterSprite, 1)]);

			// Character 3 walks North off screen, PC walks to Character 2's stall
			await Promise.all([
				walkSprite(TeddySprite, [2, 10], 300),
				walkSprite(CharacterSprite, [16, 10], 300),
			]);

			// Conversation between Character 2 and PC
			await runInteraction('noReturnDialogue', ['24a0']);

			// Turn PC East
			await turnSprite(CharacterSprite, 2);

			// PC walks away while the camera fades.
			await walkSprite(CharacterSprite, [16, 14], 300);
			await camera.fade('out', 300);
		},
	);
};

export const BluffsCutscene = () => {
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
			const pawnStore = usePawnStore();
			const timelineStore = useTimelineStore();
			const levelStore = useLevelStore();
			const wood = audios['break'];
			const splash = audios['splash'];
			const character = `PC_F`;
			const smallWait = 300;
			const longWait = 1000;
			const endWait = 5000;
			camera.move([22, 10], 0);
			// FINAL CONFRONTATION Start
			if (timelineStore.Lavelle_toBluffs && timelineStore.Teddy_follow) {
				// Add PC and Alex to scene
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
				const TeddySprite: CutsceneSprite = {
					imgSrc: 'Teddy',
					coords: [3, 1],
					position: [31, 14],
				};
				addSprite(TeddySprite);

				// Fade in
				await camera.fade('in', longWait);
				await wait(smallWait);

				// PC attempts to walk to ledge, Alex walks out and stops them
				await walkSprite(CharacterSprite, [28, 11], smallWait);
				await walkSprite(TeddySprite, [30, 14], 100);
				await runInteraction('noReturnDialogue', ['fc0']);

				// PC turns around
				await turnSprite(CharacterSprite, 0);
				await wait(smallWait);

				// Lavelle comes into scene
				const LavelleSprite: CutsceneSprite = {
					imgSrc: 'Lavelle',
					coords: [3, 1],
					position: [32, 9],
				};
				addSprite(LavelleSprite);

				// Setting Lavelle passed out
				const LavellePassedOutSprite: CutsceneSprite = {
					imgSrc: 'Lavelle_Unconscious',
					coords: [0, 0],
					position: [30, 10],
				};

				// Lavelle turns in confusion, Teddy goes up to Lavelle and punched them
				await walkSprite(LavelleSprite, [30, 9]);
				await wait(smallWait);
				await turnSprite(LavelleSprite, 2);
				await wait(smallWait);
				await turnSprite(LavelleSprite, 3);
				await wait(smallWait);
				await runInteraction('noReturnDialogue', ['fc1']);
				await wait(smallWait);
				await Promise.all([
					turnSprite(LavelleSprite, 2),
					turnSprite(TeddySprite, 1),
					walkSprite(TeddySprite, [30, 11], smallWait),
					walkSprite(LavelleSprite, [30, 10], smallWait),
				]);
				await runInteraction('noReturnDialogue', ['fc2']);
				// Switch standing up Lavelle for the unconscious Lavelle with punch
				setTimeout(() => {
					removeSprite(LavelleSprite);
					addSprite(LavellePassedOutSprite);
				}, 100);

				await Promise.all([
					//playAudio('woodBreak.wav'),
					showImage('punch1.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
				]);
				await wait(longWait);
				await turnSprite(TeddySprite, 3);
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
					switch (timelineStore.endingChoice) {
						case 6: {
							await wait(smallWait);
							await walkSprite(CharacterSprite, [29, 11], smallWait);
							await wait(smallWait);
							const LavelleSprite1: CutsceneSprite = {
								imgSrc: 'Lavelle',
								coords: [3, 1],
								position: [30, 10],
							};
							await Promise.all([removeSprite(LavellePassedOutSprite), addSprite(LavelleSprite1)]);
							await runInteraction('noReturnDialogue', ['fc6']);
							await wait(smallWait);
							await turnSprite(LavelleSprite1, 2);
							await wait(smallWait);
							await turnSprite(LavelleSprite1, 3);
							await wait(smallWait);
							await turnSprite(LavelleSprite1, 2);
							await wait(smallWait);
							await turnSprite(LavelleSprite1, 3);
							await wait(smallWait);
							await camera.fade('out', endWait);
							break;
						}
						case 5: {
							const LavelleDeadSprite: CutsceneSprite = {
								imgSrc: 'Lavelle_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							await turnSprite(TeddySprite, 1);
							await wait(smallWait);
							setTimeout(() => {
								removeSprite(LavellePassedOutSprite);
								addSprite(LavelleDeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife_2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(smallWait);
							const TeddyDeadSprite: CutsceneSprite = {
								imgSrc: 'Teddy_Dead',
								coords: [0, 0],
								position: [30, 11],
							};
							setTimeout(() => {
								removeSprite(TeddySprite);
								addSprite(TeddyDeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife_3.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await camera.fade('out', endWait * 2);
							break;
						}
						case 4: {
							const TeddyDeadSprite: CutsceneSprite = {
								imgSrc: 'Lavelle_Dead',
								coords: [0, 0],
								position: [30, 11],
							};
							setTimeout(() => {
								removeSprite(TeddySprite);
								addSprite(TeddyDeadSprite);
							}, 100);

							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife_3.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);

							await wait(smallWait);
							const LavelleSprite1: CutsceneSprite = {
								imgSrc: 'Lavelle',
								coords: [3, 1],
								position: [30, 10],
							};
							await Promise.all([removeSprite(LavellePassedOutSprite), addSprite(LavelleSprite1)]);
							await wait(smallWait);
							await camera.fade('out', endWait * 2);
							break;
						}
						case 2: {
							const LavelleDeadSprite: CutsceneSprite = {
								imgSrc: 'Lavelle_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							await turnSprite(TeddySprite, 1);
							await wait(smallWait);
							setTimeout(() => {
								removeSprite(LavellePassedOutSprite);
								addSprite(LavelleDeadSprite);
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
							if (timelineStore.PCKillsTeddy) {
								const TeddyDeadSprite: CutsceneSprite = {
									imgSrc: 'Teddy_Dead',
									coords: [0, 0],
									position: [30, 11],
								};

								setTimeout(() => {
									removeSprite(TeddySprite);
									addSprite(TeddyDeadSprite);
								}, 100);

								await Promise.all([
									//playAudio('woodBreak.wav'),
									showImage('Knife3.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
								]);
								await camera.fade('out', endWait);
								break;
							} else {
								await camera.fade('out', endWait * 2);
								break;
							}
						}
						case 1: {
							await Promise.all([
								walkSprite(CharacterSprite, [29, 11], smallWait),
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
								showImage('Knife_4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await wait(longWait);
							const LavelleSprite1: CutsceneSprite = {
								imgSrc: 'Lavelle',
								coords: [3, 1],
								position: [30, 10],
							};
							await Promise.all([removeSprite(LavellePassedOutSprite), addSprite(LavelleSprite1)]);
							await wait(smallWait);
							await turnSprite(LavelleSprite1, 0);
							await walkSprite(LavelleSprite1, [32, 10]);
							await removeSprite(LavelleSprite1);
							await wait(smallWait);
							await turnSprite(TeddySprite, 1);
							await wait(smallWait);
							await turnSprite(TeddySprite, 2);
							await wait(smallWait);
							await turnSprite(TeddySprite, 1);
							await wait(smallWait);
							await turnSprite(TeddySprite, 2);
							await wait(smallWait);
							await turnSprite(TeddySprite, 0);
							await wait(smallWait);

							const LavelleSpriteBack: CutsceneSprite = {
								imgSrc: 'Lavelle',
								coords: [3, 1],
								position: [32, 9],
							};
							const GuardSprite: CutsceneSprite = {
								imgSrc: 'Char07',
								coords: [3, 1],
								position: [32, 9],
							};
							await addSprite(GuardSprite);
							await wait(smallWait);
							await walkSprite(GuardSprite, [30, 9], smallWait);
							await addSprite(LavelleSpriteBack);
							await wait(smallWait);
							await Promise.all([
								walkSprite(GuardSprite, [29, 9], smallWait),
								walkSprite(LavelleSpriteBack, [30, 9], smallWait),
								wait(smallWait),
								turnSprite(GuardSprite, 2),
								turnSprite(LavelleSpriteBack, 2),
								turnSprite(TeddySprite, 1),
							]);

							await wait(longWait);
							await camera.fade('out', endWait);
							break;
						}

						case 0: {
							const LavelleDeadSprite: CutsceneSprite = {
								imgSrc: 'Lavelle_Dead',
								coords: [0, 0],
								position: [30, 10],
							};
							const CharacterDeadSprite: CutsceneSprite = {
								imgSrc: `PC_Dead_${pawnStore.characterId}`,
								coords: [0, 0],
								position: [29, 11],
							};
							await turnSprite(TeddySprite, 1);
							await runInteraction('noReturnDialogue', ['fcEnd0_0']);
							// Switch unconscious Lavelle for the dead Lavelle with knife
							await wait(500);
							setTimeout(() => {
								removeSprite(LavellePassedOutSprite);
							}, 100);
							addSprite(LavelleDeadSprite);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife_2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await walkSprite(CharacterSprite, [29, 11], smallWait);
							await turnSprite(TeddySprite, 3);
							await runInteraction('noReturnDialogue', ['fcEnd0_1alt']);
							// Switch unconscious PC for the dead Lavelle with knife
							setTimeout(() => {
								removeSprite(CharacterSprite);
							}, 100);
							addSprite(CharacterDeadSprite);
							await Promise.all([
								//playAudio('woodBreak.wav'),
								showImage('Knife_4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
							]);
							await camera.fade('out', endWait);
							break;
						}
					}
				}
				// Player chose not to take control.
				else {
					const LavelleDeadSprite: CutsceneSprite = {
						imgSrc: 'Lavelle_Dead',
						coords: [0, 0],
						position: [30, 10],
					};
					const CharacterDeadSprite: CutsceneSprite = {
						imgSrc: `PC_Dead_${pawnStore.characterId}`,
						coords: [0, 0],
						position: [29, 11],
					};
					await turnSprite(TeddySprite, 1);
					await runInteraction('noReturnDialogue', ['fcEnd0_0']);
					// Switch unconscious Lavelle for the dead Lavelle with knife
					await wait(500);
					setTimeout(() => {
						removeSprite(LavellePassedOutSprite);
					}, 100);
					addSprite(LavelleDeadSprite);
					await Promise.all([
						//playAudio('woodBreak.wav'),
						showImage('Knife_2.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
					]);
					await walkSprite(CharacterSprite, [29, 11], smallWait);
					await turnSprite(TeddySprite, 3);
					await runInteraction('noReturnDialogue', ['fcEnd0_1']);
					// Switch unconscious PC for the dead Lavelle with knife
					setTimeout(() => {
						removeSprite(CharacterSprite);
					}, 100);
					addSprite(CharacterDeadSprite);
					await Promise.all([
						//playAudio('woodBreak.wav'),
						showImage('Knife_4.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
					]);
					await camera.fade('out', endWait);
					timelineStore.endingChoice = 0;
				}
				useSettingsStore().openEndingsMenu();
			}
			// Lavelle watches Alex die
			else if (!timelineStore.Lavelle_home && !timelineStore.Teddy_follow) {
				const CharacterSprite: CutsceneSprite = {
					imgSrc: character,
					coords: [3, 1],
					position: [29, 11],
				};
				addSprite(CharacterSprite);
				const LavelleSprite: CutsceneSprite = {
					imgSrc: 'Lavelle',
					coords: [3, 1],
					position: [31, 9],
				};
				addSprite(LavelleSprite);
				await camera.fade('in', smallWait);

				await walkSprite(CharacterSprite, [27, 11], smallWait);
				await walkSprite(LavelleSprite, [29, 9], smallWait);

				setTimeout(() => {
					removeSprite(CharacterSprite);
					// levelStore.cutsceneMatrix[26][11].layers[1].coord = [6, 5];
					levelStore.levelMatrix[26][11].layers[1].coord = [6, 5];
				}, 100);
				await Promise.all([
					//playAudio('woodBreak.wav'),
					showImage('fenceBreak.png', longWait, { fade: 'in-out', fadeDurationMs: 500 }),
				]);

				await runInteraction('returnDialogue', ['24n1']);
				await wait(smallWait);
				turnSprite(LavelleSprite, 0);
				await Promise.all([walkSprite(LavelleSprite, [31, 9], 100), camera.fade('out', smallWait)]);
			}
			// Alex falls alone
			else {
				const CharacterSprite: CutsceneSprite = {
					imgSrc: character,
					coords: [3, 1],
					position: [29, 11],
				};
				addSprite(CharacterSprite);
				await camera.fade('in', smallWait);
				await wait(smallWait);
				await walkSprite(CharacterSprite, [27, 11], smallWait);
				await wait(smallWait);
				setTimeout(() => {
					removeSprite(CharacterSprite);
					levelStore.levelMatrix[26][11].layers[1].coord = [6, 5];
				}, 500);
				await Promise.all([
					wood.play(),
					showImage('fenceBreak.png', 1000, { fade: 'in-out', fadeDurationMs: 500 }),
				]);
				splash.play();
				await wait(smallWait);
				timelineStore.Alex_dead = true;
				await Promise.all([camera.fade('out', longWait)]);
			}
		},
	);
};
