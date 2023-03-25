<script setup lang="ts">

import { usePromptStore } from '@/stores/prompt';
import { storeToRefs } from 'pinia';
import AppModalVue from './AppModal.vue';

const { options, resolver } = storeToRefs(usePromptStore());

</script>

<template>
	<Teleport to="#prompt">
		<AppModalVue v-if="options !== null && resolver !== null" title="Prompt">
			<div class="message">{{ options.message }}</div>
			<div
				class="options"
				v-for="(choice, i) in options.choices"
				:key="i"
				@click="resolver!(choice.symbol)">
				{{ choice.label }}
			</div>
		</AppModalVue>
	</Teleport>
</template>