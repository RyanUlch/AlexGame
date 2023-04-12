/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useLevelStore } from './level';
import { usePawnStore } from './pawn';

export const useSpriteStore = defineStore('spriteStore', () => {
	const levelStore = useLevelStore();
	const scale = ref(3);
	// State:

	const gridCellSize = 16;
	const screenSize = gridCellSize * 41;

	const spriteList = reactive<
		{
			isAutoInteract: boolean;
			position: [number, number, string];
			interactionHandler: () => void;
			pawnIndex?: number;
		}[]
	>([]);

	const characterPosition = reactive<[number, number, string]>([5, 3, 's']);

	const screenPosition = reactive<[number, number]>([0, 0]);

	const registerSprite = (
		isAutoInteract: boolean,
		startingPosition: [number, number, string],
		interaction: () => void,
		pawnIndex?: number,
	) => {
		spriteList.push({
			isAutoInteract: isAutoInteract,
			position: [...startingPosition],
			interactionHandler: interaction,
			pawnIndex: pawnIndex,
		});
		return spriteList.length - 1;
	};

	const affectedSprites = (type: string) => {
		const affectedSpritesList: number[] = [];
		switch (type) {
			case 'front':
				const frontPosition = movePosition(characterPosition[2], characterPosition);
				const frontSprite = spriteList.find((sprite) => {
					return sprite.position[0] === frontPosition[0] && sprite.position[1] === frontPosition[1];
				})?.pawnIndex;
				if (frontSprite && frontSprite > -1) {
					affectedSpritesList.push(frontSprite);
				}
				break;
			case 'line':
				const linePosition1 = movePosition(characterPosition[2], characterPosition);
				const linePosition2 = movePosition(characterPosition[2], linePosition1);
				const linePosition3 = movePosition(characterPosition[2], linePosition2);
				const sprite1 = spriteList.find((sprite) => {
					return sprite.position[0] === linePosition1[0] && sprite.position[1] === linePosition1[1];
				})?.pawnIndex;
				const sprite2 = spriteList.find(
					(sprite) =>
						sprite.position[0] === linePosition2[0] && sprite.position[1] === linePosition2[1],
				)?.pawnIndex;
				const sprite3 = spriteList.find(
					(sprite) =>
						sprite.position[0] === linePosition3[0] && sprite.position[1] === linePosition3[1],
				)?.pawnIndex;
				if (sprite1 !== undefined && sprite1 > -1) {
					affectedSpritesList.push(sprite1);
				}
				if (sprite2 !== undefined && sprite2 > -1) {
					affectedSpritesList.push(sprite2);
				}
				if (sprite3 !== undefined && sprite3 > -1) {
					affectedSpritesList.push(sprite3);
				}
				break;
			case 'self':
				affectedSpritesList.push(-1);
				break;
		}
		return affectedSpritesList;
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

	const teleportPlayer = (teleportTo: [number, number, string]) => {
		characterPosition[0] = teleportTo[0];
		characterPosition[1] = teleportTo[1];
		characterPosition[2] = teleportTo[2];
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
			!(newPosition[1] >= levelStore.levelMatrix[0].length) &&
			!levelStore.isImpassible(newPosition[0], newPosition[1])
		) {
			const actionCell = spriteList.findIndex((action) => {
				return action.position[0] === newPosition[0] && action.position[1] === newPosition[1];
			});
			if (actionCell >= 0 && spriteList[actionCell].isAutoInteract) {
				spriteList[actionCell].interactionHandler();
			}
			characterPosition[0] = newPosition[0];
			characterPosition[1] = newPosition[1];
		}
		characterPosition[2] = direction;
	};

	const characterId = ref('1');

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
			if (typeof spriteList[interactingSprite].interactionHandler !== undefined) {
				spriteList[interactingSprite].interactionHandler();
				return true;
			}
		}
		return false;
	};

	return {
		spriteList,
		characterPosition,
		characterId,
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
