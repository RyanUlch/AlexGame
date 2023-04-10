<script setup lang="ts">
	import { usePromptStore, type PromptChoice } from '@/stores/prompt';
	import { storeToRefs } from 'pinia';
	import AppModalVue from './AppModal.vue';

	const promptStore = usePromptStore();
	const { options, resolver, selectedChoiceIndex } = storeToRefs(promptStore);

	function handleChoiceClick(choice: PromptChoice) {
		if (resolver.value === null) throw Error('no resolver registered for choice prompt');
		resolver.value(choice);
	}
	function handleChoiceMouseIn(index: number) {
		selectedChoiceIndex.value = index;
	}
</script>

<template>
	<Teleport to="#prompt">
		<AppModalVue
			v-if="options !== null && resolver !== null"
			:title="options.title ?? 'Prompt'"
			no-close>
			<div
				v-if="options.message"
				class="message">
				{{ options.message }}
			</div>
			<div class="choices">
				<button
					class="choice"
					:class="{
						selected: selectedChoiceIndex === i,
					}"
					v-for="(choice, i) in options.choices"
					:key="i"
					@click="handleChoiceClick(choice)"
					@mouseenter="handleChoiceMouseIn(i)">
					{{ choice.text }}
				</button>
			</div>
		</AppModalVue>
	</Teleport>
</template>

<style scoped>
	.message {
		font-size: 0.8em;
	}
	.choices {
		padding: 12px;
		display: flex;
		flex-flow: column;
		gap: 12px;
	}
	.choice {
		font-family: 'Press Start 2P', monospace;
	}
	.choice.selected {
		background-color: red;
	}
</style>
