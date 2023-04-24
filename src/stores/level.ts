/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { usePawnStore } from './pawn';
import { useTimelineStore } from './timeline';
import { useLogComposable } from '@/composables/logComposable';
import { useFilterStore } from './filters';
import { audios, playTrackAudio } from '@/Audio/audios';
import openSam_House_EmptyLevel from '../assets/levels/Sam_House_Empty';
import openSam_House_FullLevel from '@/assets/levels/Sam_House_Full';
import openSam_House_BedLevel from '@/assets/levels/Sam_House_Bed';
import openAbigail_House_LowerLevel from '@/assets/levels/Abigail_House_Lower';
import openAbigail_House_UpperLevel from '@/assets/levels/Abigail_House_Upper';
import openAbigail_House_UpperBedLevel from '@/assets/levels/Abigail_House_UpperBed';
import openAbigail_House_UpperBedBothLevel from '@/assets/levels/Abigail_House_UpperBedBoth';
import openLavelle_House_LowerClosedLevel from '@/assets/levels/Lavelle_House_LowerClosed';
import openLavelle_House_LowerOpenLevel from '@/assets/levels/Lavelle_House_LowerOpen';
import openLavelle_House_UpperLevel from '@/assets/levels/Lavelle_House_Upper';
import openTeddy_HouseLevel from '@/assets/levels/Teddy_House';
import openAlex_HouseLevel from '@/assets/levels/Alex_House';
import openBluffs_BrokenLevel from '@/assets/levels/Bluffs_Broken';
import openBluffs_FullLevel from '@/assets/levels/Bluffs_Full';
import openFarm_DeadLevel from '@/assets/levels/Farm_Dead';
import openFarm_EmptyLevel from '@/assets/levels/Farm_Empty';
import openFarm_FullLevel from '@/assets/levels/Farm_Full';
import openFarm_HalfLevel from '@/assets/levels/Farm_Half';
import openMarket_BothGoneLevel from '@/assets/levels/Market_BothGone';
import openMarket_EmptyLevel from '@/assets/levels/Market_Empty';
import openMarket_FullLevel from '@/assets/levels/Market_Full';
import openMarket_SamGoneLevel from '@/assets/levels/Market_SamGone';
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
	"Sam_House_Empty":		openSam_House_EmptyLevel,
 	"Sam_House_Full":			openSam_House_FullLevel,
	"Sam_House_Bed": 			openSam_House_BedLevel,
	"Abigail_House_Lower":		openAbigail_House_LowerLevel,
	"Abigail_House_Upper": 		openAbigail_House_UpperLevel,
	"Abigail_House_UpperBed": 	openAbigail_House_UpperBedLevel,
	"Abigail_House_UpperBedBoth": openAbigail_House_UpperBedBothLevel,
	"Lavelle_House_LowerClosed":	openLavelle_House_LowerClosedLevel,
	"Lavelle_House_LowerOpen":	openLavelle_House_LowerOpenLevel,
	"Lavelle_House_Upper":		openLavelle_House_UpperLevel,
	"Teddy_House":				openTeddy_HouseLevel,
	"Alex_House":				openAlex_HouseLevel,
	"Bluffs_Broken": 			openBluffs_BrokenLevel,
	"Bluffs_Full":				openBluffs_FullLevel,
	"Farm_Dead":				openFarm_DeadLevel,
	"Farm_Empty":				openFarm_EmptyLevel,
	"Farm_Full":				openFarm_FullLevel,
	"Farm_Half":				openFarm_HalfLevel,
	"Market_BothGone":			openMarket_BothGoneLevel,
	"Market_Empty":				openMarket_EmptyLevel,
	"Market_Full":				openMarket_FullLevel,
	"Market_SamGone":			openMarket_SamGoneLevel,
	"Tavern":					openTavernLevel,
	"Village":					openVillageLevel,
};

const overworld = audios['overworld'];
const final = audios['final'];
const inside = audios['inside'];
const doorOpen = audios['doorOpen'];

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);
	const cutsceneMatrix = reactive<Tile[][]>([]);
	const filterStore = useFilterStore();
	const pawnStore = usePawnStore();
	const levelNameRef = ref('Alex_House');
	const timelineStore = useTimelineStore();
	const { addLogLine } = useLogComposable();

	const openLevel = async (
		levelName: string,
		cutscene: boolean = false,
		startingPos?: [number, number, string],
	) => {
		// addLogLine(`Entering: ${levelName}`);

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
				playTrackAudio('overworld', overworld, { fadeInterval: 500, loop: true });
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
					destination = 'Market_Full';
				} else if (timelineStore.currentTime === 2 && timelineStore.Lavelle_home) {
					destination = 'Market_BothGone';
				} else if (timelineStore.currentTime === 2) {
					destination = 'Market_SamGone';
				} else {
					destination = 'Market_Empty';
				}
				break;
			case 'Farm':
				playTrackAudio('overworld', overworld, { fadeInterval: 500, loop: true });
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 1) {
					destination = 'Farm_Full';
				} else if (timelineStore.currentTime === 2) {
					destination = 'Farm_Half';
				} else if (timelineStore.Abigail_GaveUp) {
					destination = 'Farm_Dead';
				} else {
					destination = 'Farm_Empty';
				}
				break;
			case 'Bluffs':
				if (timelineStore.currentTime === 3) {
					playTrackAudio('final', final, { fadeInterval: 500, loop: true });
				} else {
					playTrackAudio('overworld', overworld, { fadeInterval: 500, loop: true });
				}
				if (timelineStore.Alex_dead) {
					destination = 'Bluffs_Broken';
				} else {
					destination = 'Bluffs_Full';
				}
				break;
			case 'Village':
				playTrackAudio('overworld', overworld, { fadeInterval: 500, loop: true });
				destination = 'Village';
				break;
			case 'Tavern':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Tavern';
				break;
			case '0':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				if (timelineStore.Sam_Moving && timelineStore.currentTime === 3) {
					destination = 'Sam_House_Empty';
				} else if (
					!timelineStore.Sam_Moving &&
					!timelineStore.Sam_atFarm &&
					timelineStore.currentTime === 3
				) {
					destination = 'Sam_House_Bed';
				} else {
					destination = 'Sam_House_Full';
				}
				break;
			case '1':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Abigail_House_Lower';
				break;
			case '1up':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				if (timelineStore.currentTime === 3) {
					if (!timelineStore.Abigail_angry && timelineStore.Sam_atFarm) {
						destination = 'Abigail_House_UpperBedBoth';
					} else {
						destination = 'Abigail_House_UpperBed';
					}
				} else {
					destination = 'Abigail_House_Upper';
				}
				if (
					!timelineStore.Abigail_angry &&
					timelineStore.Sam_atFarm &&
					timelineStore.currentTime === 3
				) {
					destination = 'Abigail_House_UpperBedBoth';
				} else if (timelineStore.Abigail_GaveUp && timelineStore.currentTime === 3) {
					destination = 'Abigail_House_UpperBed';
				}

				break;
			case '2':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				if (timelineStore.currentTime === 0 || timelineStore.currentTime === 3) {
					destination = 'Lavelle_House_LowerOpen';
				} else {
					destination = 'Lavelle_House_LowerClosed';
				}
				break;
			case '2up':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Lavelle_House_Upper';
				break;
			case '3':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Teddy_House';
				break;
			case '4':
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Alex_House';
				break;

			default:
				playTrackAudio('inside', inside, { fadeInterval: 500, loop: true });
				destination = 'Alex_House';
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
