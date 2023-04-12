import { useLevelStore } from '@/stores/level';
import { usePromptStore } from '@/stores/prompt';
import { usePawnStore } from '@/stores/pawn';
import { AudioPlayer } from '@/Audio/Audio';
import { useLogComposable } from '@/composables/logComposable';
import { useTimelineStore } from '@/stores/timeline';

const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');

// This is used both for player interacting with sprites, but also when a sprite "dies"
export const runInteraction = async (interactionName: string, interactionArgs: any[]) => {
	const levelStore = useLevelStore();
	const pawnStore = usePawnStore();
	const timelineStore = useTimelineStore();

	const { addLogLine } = useLogComposable();
	switch (interactionName) {
		case 'openLevel':
			openDoorSound.play();
			await levelStore.openLevel(interactionArgs[0]);
			break;

		// Level 0 Interactions:
		case 'hatInteraction':
			const hatResult = await usePromptStore().doConversation('hat convo');
			if (hatResult === 'hatWear') {
				pawnStore.characterId = '0';
				pawnStore.deregisterSprite(1);
				levelStore.levelMatrix[5][2].impassible = false;
				levelStore.levelMatrix[5][2].layeredImageSrc = undefined;
				levelStore.levelMatrix[5][2].layeredImageCoord = undefined;
				addLogLine(`You found your hat..... cool.`);
			}
			break;

		// Level 1 Interactions:
		case 'joanInteraction':
			if (levelStore.levelMatrix[3][8].layeredImageCoord) {
				if (pawnStore.characterPosition[2] === 'e') {
					levelStore.levelMatrix[3][8].layeredImageCoord[0] = 1;
				} else if (pawnStore.characterPosition[2] === 'n') {
					levelStore.levelMatrix[3][8].layeredImageCoord[0] = 0;
				}
			}
			const joanResult = await usePromptStore().doConversation('lady in house');
			if (joanResult === 'leave') {
				addLogLine(`That was awkward...`);
			}

			break;
		case 'joanDies':
			pawnStore.deregisterSprite(interactionArgs[0]);
			timelineStore.killCharacter('joan');
			addLogLine('Jesus, why would you kill her?');
			break;
	}
};
