<script setup lang="ts">
	import updateLog from './components/UpdateLog/UpdateLog.vue';
	import { useLogComposable } from './composables/logComposable';
	import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
	import AppPromptVue from './components/Menus/AppPrompt.vue';

	const { addLogLine } = useLogComposable();
	addLogLine('This is a new line');
</script>

<template>
	<updateLog />

	<AppSettingsMenu />
	<AppPromptVue />
</template>

<style scoped></style>
