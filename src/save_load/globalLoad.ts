import { usePawnStore } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
import { useTimelineStore } from '@/stores/timeline';
import { AudioPlayer } from '@/Audio/Audio';

const loadState = (state: string) => {
	const json = JSON.parse(state);
	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();
	const timelineStore = useTimelineStore();

	AudioPlayer.isMuted = json.AudioPlayer.isMuted;
	AudioPlayer.volume = json.AudioPlayer.volume;

	pawnStore.characterId = json.pawn.characterId;
	pawnStore.characterPosition[0] = json.pawn.characterPosition[0];
	pawnStore.characterPosition[1] = json.pawn.characterPosition[1];
	pawnStore.characterPosition[2] = json.pawn.characterPosition[2];
	pawnStore.health = json.pawn.health;
	pawnStore.maxHealth = json.pawn.maxHealth;
	pawnStore.energy = json.pawn.energy;
	pawnStore.maxEnergy = json.pawn.maxEnergy;
	pawnStore.spriteList.splice(0, Infinity);
	pawnStore.spriteList.push(...json.pawn.spriteList);

	levelStore.levelMatrix.splice(0, Infinity);
	levelStore.levelMatrix.push(...json.level.levelMatrix);

	for (let character in timelineStore.characterStatus) {
		if (timelineStore.characterStatus.hasOwnProperty(character)) {
			delete timelineStore.characterStatus[character];
		}
	}

	for (let character in json.timeline.characterStatus) {
		timelineStore.characterStatus[character] = json.timeline.characterStatus[character];
	}
};
export default loadState;
