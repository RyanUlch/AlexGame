const fs = require('fs');
// import fs from 'fs';

const jsonFile: {
	rows: {
		columns: {
			tileset: string;
			tileCoord: string | [number, number];
			impassible: boolean;
			layeredImageSrc?: string;
			layeredImageCoord?: [number, number];
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
};

// Reads cells in the format - type tilesetSource (tileCoord string || [tileCoord0, tileCoord1]) impassible layeredImageSrc layeredImageCoord0 layeredImageCoord1
// type: a = Auto Floor Tiles, c = Coordinate based
fs.readFile('./levelDesign.tsv', (err: Error, data) => {
	const stringFile = data.toString();
	const lines = stringFile.split('\r\n');
	const cells = lines.map((line) => line.split('\t'));
	for (let i = 0; i < cells.length; ++i) {
		jsonFile.rows.push({ columns: [] });
		for (let j = 0; j < cells[i].length; ++j) {
			const cell = cells[i][j].split(' ');
			if (cell[0] === 'a') {
				jsonFile.rows[i].columns.push({
					tileset: cell[1],
					tileCoord: autotileCoord[cell[2]],
					impassible: cell[3] === 'true',
					layeredImageSrc: cell[4],
					layeredImageCoord: cell[5] ? [+cell[5], +cell[6]] : undefined,
				});
			} else if (cell[0] === 'c') {
				jsonFile.rows[i].columns.push({
					tileset: cell[1],
					tileCoord: [+cell[2], +cell[3]],
					impassible: cell[4] === 'true',
					layeredImageSrc: cell[5],
					layeredImageCoord: cell[6] ? [+cell[6], +cell[7]] : undefined,
				});
			} else if (cell[0] === 's') {
				jsonFile.rows[0] = { columns: [], startY: +cell[1], startX: +cell[2], startDir: cell[3] };
			}
		}
	}
	fs.writeFile('../src/levels/newLevel-RENAME.json', JSON.stringify(jsonFile), (err: Error) => {
		err ? console.error(err) : console.log('succeeded');
	});
});
