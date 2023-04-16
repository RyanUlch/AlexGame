import { usePawnStore } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
import { useTimelineStore } from '@/stores/timeline';
import { AudioPlayer } from '@/Audio/Audio';

const saveState = () => {
	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();
	const timelineStore = useTimelineStore();

	// prettier-ignore
	const statesToSave: {[store: string]: {[state: string]: any}} = {
		"pawn": {
			"health": pawnStore.health,
			"maxHealth": pawnStore.maxHealth,
			"energy": pawnStore.energy,
			"maxEnergy": pawnStore.maxEnergy,
			"characterPosition": pawnStore.characterPosition,
			"characterId": pawnStore.characterId,
			"spriteList": pawnStore.spriteList,
		},
		"level": {
			"levelMatrix": levelStore.levelMatrix
		},
		"timeline": {
			"characterStatus": timelineStore.characterStatus,
		}
	}

	// prettier-ignore
	const settingsToSave: { [key: string]: {[state: string]: any} } = {
		"AudioPlayer": {"isMuted": AudioPlayer.isMuted, "volume": AudioPlayer.volume},
	};

	const saveJson: { [store: string]: { [state: string]: any } } = {};
	for (const store in statesToSave) {
		saveJson[store] = {};
		for (const state in statesToSave[store]) {
			saveJson[store][state] = statesToSave[store][state];
		}
	}

	for (const settingType in settingsToSave) {
		saveJson[settingType] = {};
		for (const setting in settingsToSave[settingType]) {
			saveJson[settingType][setting] = settingsToSave[settingType][setting];
		}
	}
	return saveJson;
};
export default saveState;
