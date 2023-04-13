/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

interface Tile {
	tileset: number;
	tileCoord: string;
	impassible: boolean;
	layeredImageSrc?: string;
	layeredImageCoord?: [number, number];
	// layeredImageSize?:
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
	const currentLevel = ref<number>(0);
	const levelMatrix = reactive<Tile[][]>([]);
	const req = new XMLHttpRequest();
	req.addEventListener('load', reqListener);
	function reqListener(this: XMLHttpRequest) {
		levelMatrix.splice(0, levelMatrix.length);
		const rows = this.responseText.split('\r\n');
		for (let i = 0; i < rows.length; ++i) {
			levelMatrix.push([]);
			const columns = rows[i].split('\t');
			for (let j = 0; j < columns.length; ++j) {
				levelMatrix[i].push(JSON.parse(columns[j]));
			}
		}
	}

	const openLevel = (levelNum: number) => {
		currentLevel.value = levelNum;
		req.open('GET', `src/assets/levels/level-${levelNum}.tsv`);
		req.send();
	};
	openLevel(0);

	const isImpassible = (x: number, y: number) => {
		return levelMatrix[x][y].impassible;
	};

	return { levelMatrix, isImpassible, openLevel };
});
