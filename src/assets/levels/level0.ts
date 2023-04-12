import { useLevelStore } from '../../stores/level';
import { usePawnStore } from '@/stores/pawn';

const openLevel0 = () => {
	// Set up level store and retrieve necessary values

	const levelStore = useLevelStore();
	const pawnStore = usePawnStore();

	// Set up sprite store and register sprites
	pawnStore.registerSprite('houseDoor', false, [2, 1, 's'], 'openLevel', ['level1']);

	if (pawnStore.characterId === '1') {
		pawnStore.registerSprite('hat', false, [5, 2, 'n'], 'hatInteraction', []);
	} else {
		levelStore.levelMatrix[5][2].impassible = false;
		levelStore.levelMatrix[5][2].layeredImageSrc = undefined;
		levelStore.levelMatrix[5][2].layeredImageCoord = undefined;
	}
};

export default openLevel0;
