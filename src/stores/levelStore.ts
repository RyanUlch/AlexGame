/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

interface Tile {
	tileset: string;
	tileCoord: string;
	impassible: boolean;
	layeredImageSrc?: string;
	layeredImageCoord?: [number, number];
	// layeredImageSize?:
}

interface JSONTiles {
	rows: { columns: Tile[] }[];
}

// prettier-ignore
export const autotileCoord: { [direction: string]: [number, number] } = {
	"none": [3, 0], // No sides touches
	"all": 	[1, 2], // All sides touching
	"n": 	[2, 1], // North (up)
	"e": 	[0, 1], // East (left)
	"s": 	[0, 3], // South (down)
	"w": 	[2, 3], // West (right)
	"ne": 	[2, 2], // North-East (up and right)
	"se": 	[1, 1], // South-East (down and right)
	"sw": 	[0, 2], // South-West (down and left)
	"nw": 	[1, 3], // North-West (up and left)
	"ul": 	[3, 3], // Upper-Left corner
	"ur": 	[2, 0], // Upper-Right corner
	"ll": 	[0, 0], // Lower-Left corner
	"lr": 	[3, 1], // Lower-Right corner
	"ullr": [1, 0], // Upper-Left and Lower-Right corners
	"urll": [3, 2], // Upper-Right and Lower-Left corners
};

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const levelMatrix = reactive<Tile[][]>([]);

	const openLevel = async (levelName: string) => {
		convertToMatrix(
			await fetch(`src/assets/levels/${levelName}.json`)
				.then((response: Response) => response.json())
				.then((json: JSONTiles) => {
					console.log(json);
					return json;
				}),
		);
	};

	const convertToMatrix = (jsonObj: { rows: { columns: any[] }[] }) => {
		levelMatrix.splice(0, Infinity);
		for (let i = 0; i < jsonObj.rows.length; ++i) {
			levelMatrix.push([]);
			for (let j = 0; j < jsonObj.rows[i].columns.length; ++j) {
				const obj = jsonObj.rows[i].columns[j];
				console.log(obj.layeredImageSrc);
				levelMatrix[i].push({
					tileset: obj.tileset,
					tileCoord: obj.tileCoord,
					impassible: obj.impassible === 'true',
					layeredImageSrc: obj.layeredImageSrc,
					layeredImageCoord: obj.layeredImageCoord
						? [+obj.layeredImageCoord[0], +obj.layeredImageCoord[1]]
						: undefined,
				});
			}
		}
	};

	const isImpassible = (x: number, y: number) => {
		return levelMatrix[x][y].impassible;
	};

	return { levelMatrix, isImpassible, openLevel };
});
