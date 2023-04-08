<script setup lang="ts">

import { usePromptStore, type PromptChoice } from '@/stores/prompt';
import { storeToRefs } from 'pinia';
import AppModalVue from './AppModal.vue';

const { options, resolver } = storeToRefs(usePromptStore());

function handleChoiceClick(choice: PromptChoice) {
	if (resolver.value === null) throw Error('no resolver registered for choicen prompt');
	resolver.value(choice);
}

</script>

<template>
	<Teleport to="#prompt">
		<AppModalVue
			v-if="options !== null && resolver !== null" 
			title="Prompt"
			no-close>
			<div v-if="options.message" class="message">{{ options.message }}</div>
			<div
				class="options"
				v-for="(choice, i) in options.choices"
				:key="i"
				@click="handleChoiceClick(choice)">
				{{ choice }}
			</div>
		</AppModalVue>
	</Teleport>
</template>