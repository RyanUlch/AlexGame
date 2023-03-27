<script setup lang="ts">
	import updateLog from './components/UpdateLog/UpdateLog.vue';
	import { useLogComposable } from './composables/logComposable';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import AppPromptVue from './components/Menus/AppPrompt.vue';
	import { useMenuStore } from './stores/menus';
	import { storeToRefs } from 'pinia';
	import { usePromptStore } from './stores/prompt';

	const { addLogLine } = useLogComposable();
	addLogLine('This is a new line');

	const { openSettingsMenu } = useMenuStore();
	const { someGameSetting } = storeToRefs(useMenuStore());

	const { promptMulti } = usePromptStore();

	async function doPrompts() {
		const OPT_1_1 = Symbol();
		const OPT_1_2 = Symbol();
		const OPT_2_1 = Symbol();
		const OPT_2_2 = Symbol();
		const answer1 = await promptMulti({
			message: 'first question',
			choices: [
				{ label: 'option 1', symbol: OPT_1_1 },
				{ label: 'option 2', symbol: OPT_1_2 },
			],
		});
		const answer2 = await promptMulti({
			message: answer1 === OPT_1_1 ? 'you picked option 1' : 'you picked option 2',
			choices: [
				{ label: 'option 1', symbol: OPT_2_1 },
				{ label: 'option 2', symbol: OPT_2_2 },
			],
		});
		alert(answer2 === OPT_2_1 ? 'you picked option 1' : 'you picked option 2');
	}
</script>

<template>
	<updateLog />
	<p>Some game setting: {{ someGameSetting }}</p>

	<button @click="doPrompts">Prompts</button>
	<button @click="openSettingsMenu">Open Settings</button>
	<AppSettingsMenu />
	<AppPromptVue />
</template>

<style scoped></style>
