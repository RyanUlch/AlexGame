<script setup lang="ts">
	import EventLog from './components/EventLog/EventLog.vue';
	import { useLogComposable } from './composables/logComposable';

	const { addLogLine } = useLogComposable();
	addLogLine('This is a new line');
	let i = 0;
	setInterval(() => {
		addLogLine(`another one, ${i}`);
		++i;
	}, 500);
</script>

<template>
	<EventLog />
</template>

<style scoped></style>
