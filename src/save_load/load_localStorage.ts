import loadState from './globalLoad';

const load = () => {
	const file: string = `{"card": ${localStorage.getItem('card')},"pawn": ${localStorage.getItem(
		'pawn',
	)},"level": ${localStorage.getItem('level')},"AudioPlayer": ${localStorage.getItem(
		'AudioPlayer',
	)}}`;
	loadState(file);
	return true;
};

export default load;
