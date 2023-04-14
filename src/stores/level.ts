/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import openTestLevel from '../assets/levels/testLevel';
import openBluffLevel from '@/assets/levels/bluffs';
import { usePawnStore } from './pawn';

interface Tile {
	tileset: string;
	tileCoord: [number, number];
	impassible: boolean;
	layeredImageSrc?: string;
	layeredImageCoord?: [number, number];
	isCharacter?: boolean;
}

interface JSONTiles {
	rows: { columns: Tile[]; startY?: number; startX?: number; startDir?: string }[];
}

const levels: { [levelName: string]: () => void } = {
	test_level: openTestLevel,
	bluff_level: openBluffLevel,
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const pawnStore = usePawnStore();

	const openLevel = async (levelName: string) => {
		pawnStore.cleanupSprites();
		const startingPosition = convertToMatrix(
			await fetch(`src/assets/levels/${levelName}.json`)
				.then((response: Response) => response.json())
				.then((json: any) => {
					return json;
				}),
		);
		pawnStore.characterPosition[0] = +startingPosition[0];
		pawnStore.characterPosition[1] = +startingPosition[1];
		pawnStore.characterPosition[2] = `${startingPosition[2]}`;
		levels[levelName]();
	};

	const convertToMatrix = (jsonObj: JSONTiles) => {
		levelMatrix.splice(0, Infinity);
		const startPosition = [0, 0, 's'];
		for (let i = 0; i < jsonObj.rows.length; ++i) {
			const row = jsonObj.rows[i];

			if (i === 0 && row.startY && row.startX && row.startDir) {
				startPosition[0] = Number(jsonObj.rows[0].startY);
				startPosition[1] = Number(jsonObj.rows[0].startX);
				startPosition[2] = String(jsonObj.rows[0].startDir);
				continue;
			}
			levelMatrix.push([]);
			for (let j = 0; j < row.columns.length; ++j) {
				const column = jsonObj.rows[i].columns[j];
				levelMatrix[i - 1].push({
					tileset: column.tileset,
					tileCoord: column.tileCoord,
					impassible: column.impassible,
					layeredImageSrc: column.layeredImageSrc,
					layeredImageCoord: column.layeredImageCoord
						? [+column.layeredImageCoord[0], +column.layeredImageCoord[1]]
						: undefined,
					isCharacter: column.isCharacter,
				});
			}
		}
		return startPosition;
	};

	const isImpassible = (x: number, y: number) => {
		return levelMatrix[x][y].impassible;
	};

	// prettier-ignore
	return { 
		levelMatrix, // Save
		isImpassible, 
		openLevel 
	};
});
