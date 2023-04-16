/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import openTestLevel from '../assets/levels/testLevel';
import openBluffLevel from '@/assets/levels/Bluffs';
import { usePawnStore } from './pawn';
import openChar1_HouseLevel from '@/assets/levels/Char1_House';
import openChar2_House_LowerLevel from '@/assets/levels/Char2_House_Lower';
import openChar2_House_UpperLevel from '@/assets/levels/Char2_House_Upper';
import openChar4_HouseLevel from '@/assets/levels/Char4_House';
import openChar3_House_LowerLevel from '@/assets/levels/Char3_House_Lower';
import openChar3_House_UpperLevel from '@/assets/levels/Char3_House_Upper';
import openChar5_HouseLevel from '@/assets/levels/Char5_House';
import openTavernLevel from '@/assets/levels/Tavern';
import openFarmLevel from '@/assets/levels/Farm';
import openVillageLevel from '@/assets/levels/Village';
import openMarketLevel from '@/assets/levels/Market';

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
	Bluff: openBluffLevel,
	Char1_House: openChar1_HouseLevel,
	Char2_House_Lower: openChar2_House_LowerLevel,
	Char2_House_Upper: openChar2_House_UpperLevel,
	Char3_House_Lower: openChar3_House_LowerLevel,
	Char3_House_Upper: openChar3_House_UpperLevel,
	Char4_House: openChar4_HouseLevel,
	Char5_House: openChar5_HouseLevel,
	Tavern: openTavernLevel,
	Farm: openFarmLevel,
	Village: openVillageLevel,
	Market: openMarketLevel,
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const cutsceneMatrix = reactive<Tile[][]>([]);
	const pawnStore = usePawnStore();

	const openLevel = async (levelName: string, cutscene: boolean = false) => {
		pawnStore.cleanupSprites();
		const startingPosition = convertToMatrix(
			await fetch(`src/assets/levels/${levelName}.json`)
				.then((response: Response) => response.json())
				.then((json: any) => {
					return json;
				}),
			cutscene ? cutsceneMatrix : levelMatrix,
		);
		if (!cutscene) {
			pawnStore.characterPosition[0] = +startingPosition[0];
			pawnStore.characterPosition[1] = +startingPosition[1];
			pawnStore.characterPosition[2] = `${startingPosition[2]}`;
			levels[levelName]();
		}
	};

	const convertToMatrix = (jsonObj: JSONTiles, matrix: Tile[][]) => {
		matrix.splice(0, Infinity);
		const startPosition = [0, 0, 's'];
		for (let i = 0; i < jsonObj.rows.length; ++i) {
			const row = jsonObj.rows[i];

			if (i === 0 && row.startY && row.startX && row.startDir) {
				startPosition[0] = Number(jsonObj.rows[0].startY);
				startPosition[1] = Number(jsonObj.rows[0].startX);
				startPosition[2] = String(jsonObj.rows[0].startDir);
				continue;
			}
			matrix.push([]);
			for (let j = 0; j < row.columns.length; ++j) {
				const column = jsonObj.rows[i].columns[j];
				matrix[i - 1].push({
					tileset: column.tileset,
					tileCoord: column.tileCoord,
					impassible: column.impassible,
					isCharacter: column.isCharacter,
					layers: [],
				});
				for (const layer of column.layers) {
					matrix[i - 1][j].layers.push({ src: layer.src, coord: layer.coord });
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
		cutsceneMatrix,
		isImpassible, 
		openLevel 
	};
});
