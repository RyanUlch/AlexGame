import saveState from './globalSave';
// const fs = require('fs');
import fs from 'fs';

const exportSave = (filePath: string) => {
	const saveData = JSON.stringify(saveState());
	fs.writeFile(filePath, saveData, (err) => {
		console.error(err);
		return false;
	});
	return true;
};

export default exportSave;
