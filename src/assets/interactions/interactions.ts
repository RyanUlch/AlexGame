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
			await levelStore.openLevelArea(interactionArgs[0], interactionArgs[1]);
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

		case 'returnDialogue':
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
				const choice = await usePromptStore().doConversation(interactionArgs[0]);
				addLogLine(choice);
				if (choice) {
					switch (choice) {
						case '0a0_0':
							timelineStore.Name0_bitter = true;
							break;
						case '0a0_1':
							timelineStore.Name0_atFarm = true;
							break;
						case '1a0_2':
							timelineStore.Name1_angry = true;
							break;
						case '2a0_1':
							timelineStore.Name2_home = false;
							break;
						case '0e0_1':
							timelineStore.Name0_hate = false;
							timelineStore.Name0_Moving = false;
							break;
						case '0e0_1':
							timelineStore.Name0_hate = true;
							timelineStore.Name0_Moving = true;
							break;
						case '1e1_1':
							timelineStore.Name1_GaveUp = false;
							break;
						case '3e0_0':
							timelineStore.Name3_follow = true;
					}
				}
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
