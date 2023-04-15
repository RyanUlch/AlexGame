// const fs = require('fs');
// import fs from 'fs';

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { extname } from 'path';

let jsonFile: {
	rows: {
		columns: {
			tileset: string;
			tileCoord: string | [number, number];
			impassible: boolean;
			layers: { src: string; coord: [number, number] }[];
			isCharacter: boolean;
		}[];
		startX?: number;
		startY?: number;
		startDir?: string;
	}[];
} = {
	rows: [],
};

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
	"tn": 	[2, 4], // T-North (up)
	"te": 	[0, 5], // T-East (left)
	"ts": 	[0, 4], // T-South (down)
	"tw": 	[0, 7], // T-West (right)
	"rn":	[1, 5],	// Rounded-North
	"re":	[1, 6],	// Rounded-East
	"rs":	[2, 5],	// Rounded-South
	"rw":	[1, 7],	// Rounded-West
	"eew":	[1, 4],	// Edges East-West
	'ens':	[0, 6],	// Edges North-South
};
// Need to implement rotate
// Reads cells in the format - type tilesetSource (tileCoord string || [tileCoord0, tileCoord1, rotate]) impassible layeredImageSrc layeredImageCoord0 layeredImageCoord1
// type: a = Auto Floor Tiles, c = Coordinate based
let i = 0;
const folder = readdirSync('.').filter((item) => extname(item) === '.tsv');
folder
	.map((levelFile) => readFileSync(levelFile, { encoding: 'utf8' }))
	.map((tsvData) =>
		tsvData.split('\r\n').map((row) => row.split('\t').map((value) => value.trim())),
	)
	.map((cells) => {
		jsonFile = { rows: [] };
		for (let i = 0; i < cells.length; ++i) {
			jsonFile.rows.push({ columns: [] });
			for (let j = 0; j < cells[i].length; ++j) {
				const cell = cells[i][j].split(' ');
				if (cell[0] === 'a') {
					jsonFile.rows[i].columns.push({
						tileset: cell[1],
						tileCoord: autotileCoord[cell[2]],
						impassible: cell[3] === 'true',
						isCharacter: cell[4] === 'true',
						layers: [],
					});
					if (cell[5]) {
						jsonFile.rows[i].columns[j].layers.push({
							src: cell[5],
							coord: [+cell[6], +cell[7]],
						});
						if (cell[8]) {
							jsonFile.rows[i].columns[j].layers.push({
								src: cell[8],
								coord: [+cell[9], +cell[10]],
							});
						}
					}
				} else if (cell[0] === 'c') {
					jsonFile.rows[i].columns.push({
						tileset: cell[1],
						tileCoord: [+cell[2], +cell[3]],
						impassible: cell[4] === 'true',
						isCharacter: cell[5] === 'true',
						layers: [],
					});
					if (cell[6]) {
						jsonFile.rows[i].columns[j].layers.push({
							src: cell[6],
							coord: [+cell[7], +cell[8]],
						});
						if (cell[9]) {
							jsonFile.rows[i].columns[j].layers.push({
								src: cell[9],
								coord: [+cell[10], +cell[11]],
							});
						}
					}
				} else if (cell[0] === 's') {
					jsonFile.rows[0] = { columns: [], startY: +cell[1], startX: +cell[2], startDir: cell[3] };
				}
			}
		}
		const fileName = folder[i].split('.')[0];
		writeFileSync(`../src/assets/levels/${fileName}.json`, JSON.stringify(jsonFile, undefined, 4), {
			encoding: 'utf8',
		});
		if (!existsSync(`../src/assets/levels/${fileName}.ts`)) {
			writeFileSync(
				`../src/assets/levels/${fileName}.ts`,
				`const open${fileName}Level = () => {}; export default open${fileName}Level;`,
				{ encoding: 'utf8' },
			);
		}
		console.log('succeeded: ', fileName);
		++i;
	});
