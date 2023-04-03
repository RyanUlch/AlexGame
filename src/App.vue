<script setup lang="ts">
	import { useLevelStore } from './stores/levelStore';
	const levelStore = useLevelStore();
	levelStore.openLevel(0);
</script>
<template>
	<p></p>
</template>
<style scoped></style>
