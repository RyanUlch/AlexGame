<!-- Update log is the screen the Player can see that provides context to what they are doing in the game -->
<!-- Also provides ability to show dev logs, to help verify other components are functioning while building them -->

<script setup lang="ts">
	import { computed } from 'vue';
	import { useLogComposable } from '../../composables/logComposable';
	const props = defineProps<{
		dev?: boolean; // optional prop to show all log lines
	}>();

	const { log, readFromLine } = useLogComposable();

	const lines = computed(() => {
		if (props.dev) {
			return log;
		}
		return log.filter((lineObj) => lineObj.dev === false);
	});
</script>

<template>
	<div class="outerContainer">
		<div class="innerContainer">
			<p
				v-for="(logLine, lineIndex) in lines.slice(readFromLine, 100)"
				:key="`line-${lineIndex}`"
				class="logLine">
				&gt; {{ logLine.line }}
			</p>
		</div>
	</div>
</template>

<style scoped>
	.outerContainer {
		box-sizing: border-box;
		width: 300px;
		background-color: black;
		color: white;
		border-radius: 1rem;
		overflow: hidden;
		border: 5px solid grey;
	}
	.innerContainer {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
		height: 300px;
		word-wrap: normal;
		scrollbar-color: grey;
		scrollbar-width: 12px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.logLine {
		font-family: 'Courier New', Courier, monospace;
		padding: 0 0 2px 5px;
		margin: 0;
	}
	/* WebKit and Chromiums */
	::-webkit-scrollbar {
		width: 12px;
		background-color: black;
	}
	::-webkit-scrollbar-thumb {
		background: grey;
		border-radius: 3px;
	}
</style>
