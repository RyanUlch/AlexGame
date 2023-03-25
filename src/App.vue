<script setup lang="ts">

import updateLog from './components/UpdateLog/UpdateLog.vue';
import { useLogComposable } from './composables/logComposable';
// import MenuButtons from './components/MenuButtons.vue';
import AppSettingsMenu from './components/Menus/AppSettingsMenu.vue';
import { useMenuStore } from './stores/menus';
import { storeToRefs } from 'pinia';

const { addLogLine } = useLogComposable();
addLogLine('This is a new line');

const { openSettingsMenu } = useMenuStore();
const { someGameSetting } = storeToRefs(useMenuStore());

</script>

<template>
	<updateLog />
	<MenuButtons
		:btnInfoArray="[
			{
				imgFileName: 'Menu',
				tooltip: 'this is a tooltip',
				modalHandler: () => {},
			},
			{
				imgFileName: 'Menu',
				tooltip: 'this is a tooltip',
				modalHandler: () => {},
			},
			{
				imgFileName: 'Menu',
				tooltip: 'this is a tooltip',
				modalHandler: () => {},
			},
			{
				imgFileName: 'Menu',
				tooltip: 'this is a tooltip',
				modalHandler: () => {},
			},
			{
				imgFileName: 'Menu',
				tooltip: 'this is a tooltip',
				modalHandler: () => {},
			},
		]" />

		<p>Some game setting: {{ someGameSetting }}</p>

		<button @click="openSettingsMenu">Open Settings</button>
		<AppSettingsMenu />

</template>

<style scoped></style>
