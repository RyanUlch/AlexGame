/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useLogComposable } from '@/composables/logComposable';
import { useLevelStore } from './level';
import { runInteraction } from '../assets/interactions/interactions';

export const usePawnStore = defineStore('pawnStore', () => {
	const { addLogLine } = useLogComposable();
	const levelStore = useLevelStore();
	const scale = ref(1);
	const gridCellSize = 16;
	const screenSize = gridCellSize * 41;
	const characterPosition = reactive<[number, number, string]>([5, 3, 's']);
	const screenPosition = reactive<[number, number]>([0, 0]);
	const characterId = ref('1');
	const health = ref(10);
	const maxHealth = ref(10);
	const energy = ref(5);
	const maxEnergy = ref(5);

	const spriteList = reactive<
		{
			spriteId: number | string;
			isAutoInteract: boolean;
			position: [number, number, string];
			interactionName: string;
			interactionArgs: any[];
			health?: number;
			deathInteraction?: string;
			deathInteractionArgs?: any[];
		}[]
	>([]);

	const registerSprite = (
		id: number | string,
		isAutoInteract: boolean,
		startingPosition: [number, number, string],
		interactionName: string,
		interactionArgs: any[],
		startingHealth?: number,
		deathInteraction?: string,
		deathInteractionArgs?: any[],
	) => {
		spriteList.push({
			spriteId: id,
			isAutoInteract: isAutoInteract,
			position: [...startingPosition],
			interactionName: interactionName,
			interactionArgs: interactionArgs,
			health: startingHealth,
			deathInteraction: deathInteraction,
			deathInteractionArgs: deathInteractionArgs,
		});
	};

	const deregisterSprite = (spriteIndex: number) => {
		const spritePos = spriteList[spriteIndex].position;
		if (spritePos[0] > -1) {
			levelStore.levelMatrix[spritePos[0]][spritePos[1]].layeredImageSrc = undefined;
			levelStore.levelMatrix[spritePos[0]][spritePos[1]].layeredImageCoord = undefined;
			levelStore.levelMatrix[spritePos[0]][spritePos[1]].impassible = false;
		}
		spriteList.splice(spriteIndex, 1);
	};

	const cleanupSprites = () => {
		spriteList.splice(0, Infinity);
	};

	const heal = (amount: number, index: number) => {
		if (index < 0) {
			if (amount + health.value > maxHealth.value) {
				health.value = maxHealth.value;
			} else {
				health.value += amount;
			}
		} else {
			if (typeof spriteList[index].health === 'number') {
				// Bug: getting "Object is possibly 'null'.ts(2531)" even with checks
				//@ts-ignore
				spriteList[index].health += amount;
			}
		}
	};

	const takeDamage = (amount: number, index: number) => {
		if (index < 0) {
			if (health.value - amount <= 0) {
				addLogLine('You died. Bummer...');
				health.value = 0;
				return false;
			} else {
				health.value -= amount;
				return true;
			}
		} else {
			if (typeof spriteList[index].health === 'number') {
				// Bug: getting "Object is possibly 'null'.ts(2531)" even with checks
				//@ts-ignore
				spriteList[index].health -= amount;
				//@ts-ignore
				if (spriteList[index].health <= 0) {
					if (spriteList[index].deathInteraction) {
						runInteraction(
							//@ts-ignore
							spriteList[index].deathInteraction,
							spriteList[index].deathInteractionArgs,
						);
					}
				}
			}
		}
	};

	const energize = (amount: number) => {
		if (amount + energy.value > maxEnergy.value) {
			energy.value = maxEnergy.value;
		} else {
			energy.value += amount;
		}
	};

	const useEnergy = (amount: number) => {
		if (energy.value - amount < 0) {
			addLogLine(`You don't have enough energy to use that.`);
			return false;
		} else {
			energy.value -= amount;
			return true;
		}
	};

	const teleportPlayer = (teleportTo: [number, number, string]) => {
		characterPosition[0] = teleportTo[0];
		characterPosition[1] = teleportTo[1];
		characterPosition[2] = teleportTo[2];
	};

	const playerInteract = () => {
		const facingPosition: [number, number, string] = [...characterPosition];
		switch (facingPosition[2]) {
			case 'n':
				--facingPosition[0];
				break;
			case 'e':
				++facingPosition[1];
				break;
			case 's':
				++facingPosition[0];
				break;
			case 'w':
				--facingPosition[1];
				break;
		}
		const interactingSprite = spriteList.findIndex(
			(sprite) =>
				sprite.position[0] === facingPosition[0] && sprite.position[1] === facingPosition[1],
		);
		if (interactingSprite > -1 && !spriteList[interactingSprite].isAutoInteract) {
			if (spriteList[interactingSprite].interactionName) {
				runInteraction(
					spriteList[interactingSprite].interactionName,
					spriteList[interactingSprite].interactionArgs,
				);
				return true;
			}
		}
		return false;
	};

	const movePosition = (direction: string, startingPosition: [number, number, string]) => {
		const newPosition: [number, number, string] = [...startingPosition];
		switch (direction) {
			case 'n':
				--newPosition[0];
				break;
			case 'e':
				++newPosition[1];
				break;
			case 's':
				++newPosition[0];
				break;
			case 'w':
				--newPosition[1];
				break;
		}
		return newPosition;
	};

	const playerMoveListener = (direction: string) => {
		const newPosition = movePosition(direction, characterPosition);
		if (
			!(newPosition[0] < 0) &&
			!(newPosition[1] < 0) &&
			!(newPosition[0] >= levelStore.levelMatrix.length) &&
			!(newPosition[1] >= levelStore.levelMatrix[0].length)
			//&& !levelStore.isImpassible(newPosition[0], newPosition[1])
		) {
			const actionCell = spriteList.findIndex((action) => {
				return action.position[0] === newPosition[0] && action.position[1] === newPosition[1];
			});
			if (actionCell >= 0 && spriteList[actionCell].isAutoInteract) {
				runInteraction(
					spriteList[actionCell].interactionName,
					spriteList[actionCell].interactionArgs,
				);
			}
			characterPosition[0] = newPosition[0];
			characterPosition[1] = newPosition[1];
		}
		characterPosition[2] = direction;
	};

	const affectedSprites = (type: string) => {
		const affectedSpritesList: number[] = [];
		switch (type) {
			case 'front':
				const frontPosition = movePosition(characterPosition[2], characterPosition);
				const frontSprite = spriteList.findIndex(
					(sprite) =>
						sprite.position[0] === frontPosition[0] && sprite.position[1] === frontPosition[1],
				);
				if (frontSprite >= 0) {
					affectedSpritesList.push(frontSprite);
				}
				break;
			case 'line':
				const linePosition1 = movePosition(characterPosition[2], characterPosition);
				const linePosition2 = movePosition(characterPosition[2], linePosition1);
				const linePosition3 = movePosition(characterPosition[2], linePosition2);
				const sprite1 = spriteList.findIndex(
					(sprite) =>
						sprite.position[0] === linePosition1[0] && sprite.position[1] === linePosition1[1],
				);
				const sprite2 = spriteList.findIndex(
					(sprite) =>
						sprite.position[0] === linePosition2[0] && sprite.position[1] === linePosition2[1],
				);
				const sprite3 = spriteList.findIndex(
					(sprite) =>
						sprite.position[0] === linePosition3[0] && sprite.position[1] === linePosition3[1],
				);
				if (sprite1 >= 0) {
					affectedSpritesList.push(sprite1);
				}
				if (sprite2 >= 0) {
					affectedSpritesList.push(sprite2);
				}
				if (sprite3 >= 0) {
					affectedSpritesList.push(sprite3);
				}
				break;
			case 'self':
				affectedSpritesList.push(-1);
				break;
		}
		return affectedSpritesList;
	};

	// prettier-ignore
	return {
		characterPosition,	// Save
		characterId,		// Save
		health,				// Save
		maxHealth,			// Save
		energy,				// Save
		maxEnergy,			// Save
		heal,
		takeDamage,
		energize,
		useEnergy,
		spriteList,			// Save
		screenPosition,
		scale,
		screenSize,
		gridCellSize,
		affectedSprites,
		movePosition,
		playerMoveListener,
		playerInteract,
		teleportPlayer,
		registerSprite,
		deregisterSprite,
		cleanupSprites,
	};
});
