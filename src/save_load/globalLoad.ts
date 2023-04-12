import { useCardStore } from '@/stores/card';
import { usePawnStore } from '@/stores/pawn';
import { useLevelStore } from '@/stores/level';
import { AudioPlayer } from '@/Audio/Audio';

const loadState = (state: string) => {
	const json = JSON.parse(state);
	console.log(json);
	const cardStore = useCardStore();
	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();

	AudioPlayer.isMuted = json.AudioPlayer.isMuted;
	AudioPlayer.volume = json.AudioPlayer.volume;

	cardStore.characterCardHand.splice(0, Infinity);
	cardStore.characterCardHand.push(...json.card.characterCardHand);

	cardStore.characterDrawPile.splice(0, Infinity);
	cardStore.characterDrawPile.push(...json.card.characterDrawPile);

	cardStore.characterDiscard.splice(0, Infinity);
	cardStore.characterDiscard.push(...json.card.characterDiscard);

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
};
export default loadState;
