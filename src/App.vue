<script setup lang="ts">
	import updateLog from './components/UpdateLog/UpdateLog.vue';
	import { useLogComposable } from './composables/logComposable';
	import MenuButtons from './components/MenuButtons.vue';

	const { addLogLine } = useLogComposable();
	addLogLine('This is a new line');
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
</template>

<style scoped></style>
