import { useLevelStore } from '@/stores/level';
import { usePromptStore } from '@/stores/prompt';
import { AudioPlayer } from '@/Audio/Audio';
import { useLogComposable } from '@/composables/logComposable';
import { useTimelineStore } from '@/stores/timeline';
import { usePawnStore } from '@/stores/pawn';

const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');

// This is used both for player interacting with sprites, but also when a sprite "dies"
export const runInteraction = async (interactionName: string, interactionArgs: any[]) => {
	const levelStore = useLevelStore();
	const timelineStore = useTimelineStore();
	const pawnStore = usePawnStore();
	const { addLogLine } = useLogComposable();
	switch (interactionName) {
		case 'openLevel':
			openDoorSound.play();
			console.log(interactionArgs[0]);
			await levelStore.openLevel(interactionArgs[0], false, interactionArgs[1]);
			break;

		case 'noReturnDialogue':
			if (timelineStore.conversationsActivated[interactionArgs[0]]) {
				switch (timelineStore.currentTime) {
					case 0:
						await usePromptStore().doConversation(`doneM${pawnStore.characterId}`);
						break;
					case 1:
						await usePromptStore().doConversation(`doneA${pawnStore.characterId}`);
						break;
					case 2:
						await usePromptStore().doConversation(`doneE${pawnStore.characterId}`);
						break;
					case 3:
						await usePromptStore().doConversation(`doneN${pawnStore.characterId}`);
						break;
				}
			} else {
				await usePromptStore().doConversation(interactionArgs[0]);
				timelineStore.conversationsActivated[interactionArgs[0]] = true;
			}
			break;
		case 'readout':
			addLogLine(interactionArgs[0]);
			break;

		case 'noEntry':
			addLogLine('I have no need to go here right now.');
			break;
		// Test Interaction:
		case 'testInteraction':
			const testResult = await usePromptStore().doConversation('test');
			if (testResult === 'test') {
				addLogLine(`Test Passed`);
			}
			break;
	}
};
