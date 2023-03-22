<script setup lang="ts">
	import updateLog from './components/UpdateLog/UpdateLog.vue';
	import { useLogComposable } from './composables/logComposable';

	const { addLogLine } = useLogComposable();
	addLogLine('This is a new line');
</script>

<template>
	<updateLog />
</template>

<style scoped></style>
