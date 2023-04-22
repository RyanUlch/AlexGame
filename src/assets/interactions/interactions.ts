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
			if (
				timelineStore.conversationsActivated[interactionArgs[0]] &&
				interactionArgs[1] !== 'environment'
			) {
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
				if (interactionArgs[1] !== 'environment') {
					addLogLine(`Interacted with ${interactionArgs[1]} ${timelineStore.currentTimeString}`);
				}
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
				if (choice) {
					switch (choice) {
						case '0a0_0':
							timelineStore.Sam_bitter = true;
							break;
						case '0a0_1':
							timelineStore.Sam_atFarm = true;
							break;
						case '1a0_2':
							timelineStore.Abigail_angry = true;
							break;
						case '2a0_0':
							timelineStore.Lavelle_home = false;
							break;
						case '2e0_0':
							timelineStore.Lavelle_toBluffs = true;
							break;
						case '0e0_0':
							timelineStore.Sam_hate = false;
							timelineStore.Sam_Moving = false;
							break;
						case '0e0_1':
							timelineStore.Sam_hate = true;
							timelineStore.Sam_Moving = true;
							break;
						case '1e1_1':
							timelineStore.Abigail_GaveUp = false;
							break;
						case '3e0_0':
							timelineStore.Name3_follow = true;
							break;
						case '01e0_0':
							timelineStore.Sam_atFarm = false;
							break;
						case '014e0_1':
							timelineStore.Abigail_angry = false;
							break;
						case '24n1_0':
							timelineStore.Lavelle_sawDeath = true;
							timelineStore.Name4_dead = true;
							break;
						case 'fc3_0':
							timelineStore.finalSceneControl = true;
							break;
						case 'fcEnd0_1alt':
						case 'fcEnd0_alt':
							timelineStore.endingChoice = 0;
							break;
						case 'fcEnd1':
							timelineStore.endingChoice = 1;
							break;
						case 'fcEnd2':
							timelineStore.endingChoice = 2;
							break;
						case 'fcEnd3':
							timelineStore.endingChoice = 3;
							break;
						case 'fcEnd4':
							timelineStore.endingChoice = 4;
							break;
						case 'fcEnd5':
							timelineStore.endingChoice = 5;
							break;
						case 'fcEnd6':
							timelineStore.endingChoice = 6;
							break;
						case 'fc5End1':
							timelineStore.PCKillsName3 = true;
							break;
						default:
							break;
					}
				}
				timelineStore.conversationsActivated[interactionArgs[0]] = true;
				if (typeof interactionArgs[1] === 'string') {
					addLogLine(`Interacted with ${interactionArgs[1]} ${timelineStore.currentTimeString}`);
				}
			}
			break;

		case 'readout':
			addLogLine(interactionArgs[0]);
			break;

		case 'noEntry':
			addLogLine('I have no need to go here right now.');
			break;
	}
};
