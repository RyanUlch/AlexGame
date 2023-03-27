<script setup lang="ts">
	import { usePromptStore } from '@/stores/prompt';
	import { storeToRefs } from 'pinia';
	import AppModal from './AppModal.vue';

	const { options, resolver } = storeToRefs(usePromptStore());
</script>

<template>
	<Teleport to="#prompt">
		<AppModal
			v-if="options !== null && resolver !== null"
			title="Prompt"
			no-close>
			<p class="message">{{ options.message }}</p>
			<ul>
				<li
					class="options"
					v-for="(choice, i) in options.choices"
					:key="i"
					@click="resolver!(choice.symbol)">
					{{ choice.label }}
				</li>
			</ul>
		</AppModal>
	</Teleport>
</template>
