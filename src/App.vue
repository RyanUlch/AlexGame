<script setup lang="ts">
	import { useLevelStore } from './stores/levelStore';
	import PlayArea from './components/PlayArea/PlayArea.vue';
</script>
<template>
	<div class="group">
		<PlayArea />
	</div>
</template>
<style scoped>
	.group {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
