/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import openTestLevel from '../assets/levels/testLevel';
import openBluffLevel from '@/assets/levels/bluffs';
import { usePawnStore } from './pawn';
import openChar1_HouseLevel from '@/assets/levels/char1_house';
import openChar2_House0Level from '@/assets/levels/char2_house0';
import openchar2_house1Level from '@/assets/levels/char2_house1';
import openchar4_houseLevel from '@/assets/levels/char4_house';
import openchar3_house0Level from '@/assets/levels/char3_house0';
import openchar3_house1Level from '@/assets/levels/char3_house1';
import openchar5_houseLevel from '@/assets/levels/char5_house';
import opentavernLevel from '@/assets/levels/tavern';

interface Tile {
	tileset: string;
	tileCoord: [number, number];
	impassible: boolean;
	isCharacter: boolean;
	layers: { src: string; coord: [number, number] }[];
}

interface JSONTiles {
	rows: { columns: Tile[]; startY?: number; startX?: number; startDir?: string }[];
}

// Register Levels Here:
const levels: { [levelName: string]: () => void } = {
	test: openTestLevel,
	bluff: openBluffLevel,
	char1_house: openChar1_HouseLevel,
	char2_house0: openChar2_House0Level,
	char2_house1: openchar2_house1Level,
	char3_house0: openchar3_house0Level,
	char3_house1: openchar3_house1Level,
	char4_house: openchar4_houseLevel,
	char5_house: openchar5_houseLevel,
	tavern: opentavernLevel,
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
					isCharacter: column.isCharacter,
					layers: [],
				});
				for (const layer of column.layers) {
					levelMatrix[i - 1][j].layers.push({ src: layer.src, coord: layer.coord });
				}
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
