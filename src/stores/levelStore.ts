/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
// import { useSpriteStore } from './spriteStore';
// const { characterPosition } = useSpriteStore();

interface Tile {
	tileset: string;
	tileCoord: [number, number];
	impassible: boolean;
	layeredImageSrc?: string;
	layeredImageCoord?: [number, number];
	// layeredImageSize?:
}

interface JSONTiles {
	rows: { columns: Tile[]; startY?: number; startX?: number; startDir?: string }[];
}

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);

	const openLevel = async (
		levelName: string,
		characterPosition: [number, number, string],
		screenPosition: [number, number],
		scale: number,
	) => {
		const startingPosition = convertToMatrix(
			await fetch(`src/assets/levels/${levelName}.json`)
				.then((response: Response) => response.json())
				.then((json: any) => {
					return json;
				}),
		);
		console.log(startingPosition);
		characterPosition[0] = +startingPosition[0];
		screenPosition[0] = -startingPosition[0] / 2;
		characterPosition[1] = +startingPosition[1];
		screenPosition[1] = -startingPosition[1] / 2;
		characterPosition[2] = `${startingPosition[2]}`;
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
				});
			}
		}
		return startPosition;
	};

	const isImpassible = (x: number, y: number) => {
		return levelMatrix[x][y].impassible;
	};

	return { levelMatrix, isImpassible, openLevel };
});
