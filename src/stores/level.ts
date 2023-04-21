/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePawnStore } from './pawn';
import { useTimelineStore } from './timeline';
import { useLogComposable } from '@/composables/logComposable';
import { useFilterStore } from './filters';
import openName0_House_EmptyLevel from '../assets/levels/Name0_House_Empty';
import openName0_House_FullLevel from '@/assets/levels/Name0_House_Full';
import openName0_House_BedLevel from '@/assets/levels/Name0_House_Bed';
import openName1_House_LowerLevel from '@/assets/levels/Name1_House_Lower';
import openName1_House_UpperLevel from '@/assets/levels/Name1_House_Upper';
import openName1_House_UpperBedLevel from '@/assets/levels/Name1_House_UpperBed';
import openName1_House_UpperBedBothLevel from '@/assets/levels/Name1_House_UpperBedBoth';
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
	"Name0_House_Bed": 			openName0_House_BedLevel,
	"Name1_House_Lower":		openName1_House_LowerLevel,
	"Name1_House_Upper": 		openName1_House_UpperLevel,
	"Name1_House_UpperBed": 	openName1_House_UpperBedLevel,
	"Name1_House_UpperBedBoth": openName1_House_UpperBedBothLevel,
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
	"Tavern":					openTavernLevel,
	"Village":					openVillageLevel,
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const cutsceneMatrix = reactive<Tile[][]>([]);
	const filterStore = useFilterStore();
	const pawnStore = usePawnStore();
	const levelNameRef = ref('Name4_House');
	const timelineStore = useTimelineStore();
	const { addLogLine } = useLogComposable();

	const openLevel = async (
		levelName: string,
		cutscene: boolean = false,
		startingPos?: [number, number, string],
	) => {
		addLogLine(`Entering: ${levelName}`);
		pawnStore.cleanupSprites();
		if (!levelName.includes('House') && !levelName.includes('Tavern')) {
			switch (timelineStore.currentTime) {
				case 0:
					filterStore.enableFilter('morning');
					break;
				case 1:
					filterStore.disableFilter();
					break;
				case 2:
					filterStore.enableFilter('evening');
					break;
				case 3:
					filterStore.enableFilter('night');
					break;
			}
		} else {
			filterStore.disableFilter();
		}
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

	const openLevelArea = (levelName: string, startingPos?: [number, number, string]) => {
		let destination: string;
		levelNameRef.value = levelName;
		switch (levelName) {
			case 'Market':
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
					destination = 'Market_Full';
				} else if (timelineStore.currentTime === 2 && timelineStore.Name2_home) {
					destination = 'Market_BothGone';
				} else if (timelineStore.currentTime === 2) {
					destination = 'Market_Name0Gone';
				} else {
					destination = 'Market_Empty';
				}
				break;
			case 'Farm':
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
					destination = 'Farm_Full';
				} else if (timelineStore.currentTime === 2) {
					destination = 'Farm_Half';
				} else if (timelineStore.Name1_GaveUp) {
					destination = 'Farm_Dead';
				} else {
					destination = 'Farm_Empty';
				}
				break;
			case 'Bluffs':
				if (timelineStore.Name4_dead) {
					destination = 'Bluffs_Broken';
				} else {
					destination = 'Bluffs_Full';
				}
				break;
			case 'Village':
				destination = 'Village';
				break;
			case 'Tavern':
				destination = 'Tavern';
				break;
			case '0':
				if (timelineStore.Name0_Moving && timelineStore.currentTime === 3) {
					destination = 'Name0_House_Empty';
				} else if (
					!timelineStore.Name0_Moving &&
					!timelineStore.Name0_atFarm &&
					timelineStore.currentTime === 3
				) {
					destination = 'Name0_House_Bed';
				} else {
					destination = 'Name0_House_Full';
				}
				break;
			case '1':
				destination = 'Name1_House_Lower';
				break;
			case '1up':
				if (timelineStore.currentTime === 3) {
					if (!timelineStore.Name1_angry && timelineStore.Name0_atFarm) {
						destination = 'Name1_House_UpperBedBoth';
					} else {
						destination = 'Name1_House_UpperBed';
					}
				} else {
					destination = 'Name1_House_Upper';
				}
				if (
					!timelineStore.Name1_angry &&
					timelineStore.Name0_atFarm &&
					timelineStore.currentTime === 3
				) {
					destination = 'Name1_House_UpperBedBoth';
				} else if (timelineStore.Name1_GaveUp && timelineStore.currentTime === 3) {
					destination = 'Name1_House_UpperBed';
				} else {
				}

				break;
			case '2':
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 3) {
					destination = 'Name2_House_LowerOpen';
				} else {
					destination = 'Name2_House_LowerClosed';
				}
				break;
			case '2up':
				destination = 'Name2_House_Upper';
				break;
			case '3':
				destination = 'Name3_House';
				break;
			case '4':
				destination = 'Name4_House';
				break;

			default:
				destination = 'Name4_House';
		}
		openLevel(destination, false, startingPos);
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
		levelNameRef,
		levelMatrix, // Save
		addSpriteLocation,
		cutsceneMatrix,
		isImpassible, 
		openLevel,
		openLevelArea,
	};
});
