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
			await levelStore.openLevel(interactionArgs[0]);
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
