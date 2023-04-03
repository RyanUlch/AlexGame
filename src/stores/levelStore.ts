/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import * as d3 from 'd3';

interface Tile {
	tileset: number;
	tileCoords: [number, number];
	impassible: boolean;
}

export const useLevelStore = defineStore('levelStore', () => {
	// State:
	const currentLevel = ref<number>(0);
	let levelMatrix = reactive<Tile[][]>([]);
	const req = new XMLHttpRequest();
	req.addEventListener('load', reqListener);

	function reqListener() {
		const tiles: Tile[][] = [];
		const rows = this.responseText.split('\r\n');
		for (let i = 0; i < rows.length; ++i) {
			tiles.push([]);
			const columns = rows[i].split('\t');
			for (let j = 0; j < columns.length; ++j) {
				console.log(columns[j]);
				tiles[i].push(JSON.parse(columns[j]));
			}
		}
		levelMatrix = tiles;
	}

	const openLevel = (levelNum: number) => {
		req.open('GET', `src/assets/levels/level-${levelNum}.tsv`);
		req.send();
	};

	// Methods:

	return { openLevel };
});
