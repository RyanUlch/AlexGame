const fs = require('fs');
// import fs from 'fs';

const jsonFile: {
	rows: {
		columns: {
			tileset: string;
			tileCoord: string;
			impassible: boolean;
			layeredImageSrc?: string;
			layeredImageCoord?: [number, number];
		}[];
	}[];
} = {
	rows: [],
};

fs.readFile('./levelDesign.tsv', (err: any, data) => {
	const stringFile = data.toString();
	const lines = stringFile.split('\r\n');
	const cells = lines.map((line) => line.split('\t'));
	for (let i = 0; i < cells.length; ++i) {
		jsonFile.rows.push({ columns: [] });
		for (let j = 0; j < cells[i].length; ++j) {
			const cell = cells[i][j].split(' ');
			jsonFile.rows[i].columns.push({
				tileset: cell[0],
				tileCoord: cell[1],
				impassible: cell[2],
				layeredImageSrc: cell[3],
				layeredImageCoord: cell[4] ? [+cell[4], +cell[5]] : undefined,
			});
		}
	}
	fs.writeFile('../src/assets/levels/newLevel-RENAME.json', JSON.stringify(jsonFile), (err) => {
		err ? console.error(err) : console.log('succeeded');
	});
});
