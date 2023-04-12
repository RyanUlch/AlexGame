import { usePawnStore } from '@/stores/pawn';
import { useTimelineStore } from '@/stores/timeline';
import { useLevelStore } from '@/stores/level';

const openLevel1 = () => {
	// Set up level store and retrieve necessary values
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();
	const levelStore = useLevelStore();
	// Set up sprite store and register sprites
	pawnStore.registerSprite('doorOutside', true, [7, 4, 's'], 'openLevel', ['level0']);
	if (timelineStore.isCharacterAlive('joan')) {
		pawnStore.registerSprite('joan', false, [3, 8, 's'], 'joanInteraction', [], 10, 'joanDies', [
			1,
		]);
	} else {
		levelStore.levelMatrix[3][8].layeredImageSrc = undefined;
		levelStore.levelMatrix[3][8].layeredImageCoord = undefined;
		levelStore.levelMatrix[3][8].impassible = false;
	}
};

export default openLevel1;
