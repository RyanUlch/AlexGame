import { useLevelStore } from '@/stores/level';
import { usePromptStore } from '@/stores/prompt';
import { AudioPlayer } from '@/Audio/Audio';
import { useLogComposable } from '@/composables/logComposable';

const openDoorSound = new AudioPlayer('src/assets/audio/doorOpen.mp3');

// This is used both for player interacting with sprites, but also when a sprite "dies"
export const runInteraction = async (interactionName: string, interactionArgs: any[]) => {
	const levelStore = useLevelStore();

	const { addLogLine } = useLogComposable();
	switch (interactionName) {
		case 'openLevel':
			openDoorSound.play();
			console.log(interactionArgs[0]);
			await levelStore.openLevel(interactionArgs[0], false, interactionArgs[1]);
			break;

		case 'noReturnDialogue':
			await usePromptStore().doConversation(interactionArgs[0]);
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
