<!-- Update log is the screen the Player can see that provides context to what they are doing in the game -->
<!-- Also provides ability to show dev logs, to help verify other components are functioning while building them -->

<script setup lang="ts">
	import { useLogComposable } from '../../composables/logComposable';
</script>

<template>
	<div class="tempLogClass">
		<p
			v-for="(logLine, lineIndex) in useLogComposable().log.value.slice(
				useLogComposable().readFromLine.value,
			)"
			:key="`line-${lineIndex}`">
			> {{ logLine }}
		</p>
	</div>
</template>

<style scoped>
	/* Temp Styles to see log */
	.tempLogClass {
		height: 300px;
		width: 300px;
		background-color: black;
		color: white;
		overflow-y: scroll;
		overflow-x: hidden;
		word-wrap: normal;
	}
</style>
