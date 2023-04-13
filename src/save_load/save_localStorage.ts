import saveState from './globalSave';

const save = () => {
	const saveData = saveState();
	for (const store in saveData) {
		localStorage.setItem(store, JSON.stringify(saveData[store]));
	}
	return true;
};

export default save;
