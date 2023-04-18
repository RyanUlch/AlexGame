/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { usePawnStore } from './pawn';

import openName0_House_EmptyLevel from '../assets/levels/Name0_House_Empty';
import openName0_House_FullLevel from '@/assets/levels/Name0_House_Full';
import openName1_House_LowerLevel from '@/assets/levels/Name1_House_Lower';
import openName1_House_UpperLevel from '@/assets/levels/Name1_House_Upper';
import openName2_House_LowerClosedLevel from '@/assets/levels/Name2_House_LowerClosed';
import openName2_House_LowerOpenLevel from '@/assets/levels/Name2_House_LowerOpen';
import openName2_House_UpperLevel from '@/assets/levels/Name2_House_Upper';
import openName3_HouseLevel from '@/assets/levels/Name3_House';
import openName4_HouseLevel from '@/assets/levels/Name4_House';
import openBluffs_BrokenLevel from '@/assets/levels/Bluffs_Broken';
import openBluffs_FullLevel from '@/assets/levels/Bluffs_Full';
import openFarm_DeadLevel from '@/assets/levels/Farm_Dead';
import openFarm_EmptyLevel from '@/assets/levels/Farm_Empty';
import openFarm_FullLevel from '@/assets/levels/Farm_Full';
import openFarm_HalfLevel from '@/assets/levels/Farm_Half';
import openMarket_BothGoneLevel from '@/assets/levels/Market_BothGone';
import openMarket_EmptyLevel from '@/assets/levels/Market_Empty';
import openMarket_FullLevel from '@/assets/levels/Market_Full';
import openMarket_Name0GoneLevel from '@/assets/levels/Market_Name0Gone';
import openMarket_Name2GoneLevel from '@/assets/levels/Market_Name2Gone';
import openTavernLevel from '@/assets/levels/Tavern';
import openVillageLevel from '@/assets/levels/Village';

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
// prettier-ignore
const levels: { [levelName: string]: () => void } = {
	"Name0_House_Empty":		openName0_House_EmptyLevel,
 	"Name0_House_Full":			openName0_House_FullLevel,
	"Name1_House_Lower":		openName1_House_LowerLevel,
	"Name1_House_Upper": 		openName1_House_UpperLevel,
	"Name2_House_LowerClosed":	openName2_House_LowerClosedLevel,
	"Name2_House_LowerOpen":	openName2_House_LowerOpenLevel,
	"Name2_House_Upper":		openName2_House_UpperLevel,
	"Name3_House":				openName3_HouseLevel,
	"Name4_House":				openName4_HouseLevel,
	"Bluffs_Broken": 			openBluffs_BrokenLevel,
	"Bluffs_Full":				openBluffs_FullLevel,
	"Farm_Dead":				openFarm_DeadLevel,
	"Farm_Empty":				openFarm_EmptyLevel,
	"Farm_Full":				openFarm_FullLevel,
	"Farm_Half":				openFarm_HalfLevel,
	"Market_BothGone":			openMarket_BothGoneLevel,
	"Market_Empty":				openMarket_EmptyLevel,
	"Market_Full":				openMarket_FullLevel,
	"Market_Name0Gone":			openMarket_Name0GoneLevel,
	"Market_Name2Gone":			openMarket_Name2GoneLevel,
	"Tavern":					openTavernLevel,
	"Village":					openVillageLevel,
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const cutsceneMatrix = reactive<Tile[][]>([]);
	const pawnStore = usePawnStore();

	const openLevel = async (
		levelName: string,
		cutscene: boolean = false,
		startingPos?: [number, number, string],
	) => {
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
			pawnStore.characterPosition[0] = startingPos ? startingPos[0] : +startingPosition[0];
			pawnStore.characterPosition[1] = startingPos ? startingPos[1] : +startingPosition[1];
			pawnStore.characterPosition[2] = startingPos ? startingPos[2] : `${startingPosition[2]}`;
			levels[levelName]();
		}
	};

	const addSpriteLocation = (position: [number, number]) => {
		levelMatrix[position[0]][position[1]].impassible = true;
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
		addSpriteLocation,
		cutsceneMatrix,
		isImpassible, 
		openLevel 
	};
});
