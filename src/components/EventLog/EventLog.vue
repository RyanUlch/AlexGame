<!-- Update log is the screen the Player can see that provides context to what they are doing in the game -->
<!-- Also provides ability to show dev logs, to help verify other components are functioning while building them -->

<script setup lang="ts">
	import { useLogComposable } from '../../composables/logComposable';
	const { log, readFromLine } = useLogComposable();
</script>

<template>
	<div class="logContainer">
		<div class="reverseContainer">
			<p
				v-for="(logLine, lineIndex) in log.slice(readFromLine, 20)"
				:key="`line-${lineIndex}`"
				class="logLine">
				&gt; {{ logLine }}
			</p>
		</div>
	</div>
</template>

<style scoped>
	.reverseContainer {
		display: flex;
		flex-direction: column;
	}

	.logContainer {
		height: 300px;
		width: 300px;
		background-color: black;
		color: white;
		overflow-y: visible;
		overflow-x: hidden;
		word-wrap: normal;
	}
	.logLine {
		font-family: 'Courier New', Courier, monospace;
		padding-left: 5px;
	}
	/* WebKit and Chromiums */
	::-webkit-scrollbar {
		width: 12px;
		/* height: 8px; */
		background-color: black;
	}

	::-webkit-scrollbar-thumb {
		background: blue;
		border-radius: 5px;
	}
</style>
