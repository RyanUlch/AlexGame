<!-- Update log is the screen the Player can see that provides context to what they are doing in the game -->
<!-- Also provides ability to show dev logs, to help verify other components are functioning while building them -->

<script setup lang="ts">
	import { useLogComposable } from '../../composables/logComposable';
	import { usePawnStore } from '@/stores/pawn';
	const { logLines, readFromLine } = useLogComposable();

	const screenHeight = usePawnStore().screenSize;
</script>

<template>
	<div class="outerContainer">
		<div class="innerContainer">
			<p
				v-for="(logLine, lineIndex) in logLines.slice(readFromLine, 100)"
				:key="lineIndex"
				class="logLine">
				&gt; {{ logLine.line }}
			</p>
		</div>
	</div>
</template>

<style scoped>
	.outerContainer {
		width: calc(var(--menuSide) * 4);
		background-color: black;
		height: 89%;
		max-height: 89%;
		color: white;
		overflow: hidden;
		border-left: var(--borderSize) solid var(--borderColor);
		border-top: var(--borderSize) solid var(--borderColor);
	}
	.innerContainer {
		display: flex;
		flex-direction: column-reverse;
		height: 100%;
		/* max-height: calc(v-bind(screenHeight) - var(--menuSide)); */
		word-wrap: normal;
		scrollbar-color: grey;
		scrollbar-width: 12px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.logLine {
		font-family: 'Courier New', Courier, monospace;
		padding: 2px 5px;
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
