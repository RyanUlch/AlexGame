<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import AppModal from './AppModal.vue';
	const settingStore = useSettingsStore();
</script>

<template>
	<AppModal
		v-if="settingStore.skillsMenuIsOpen"
		title="skills"
		@close="settingStore.closeSkillsMenu">
		<template v-slot="modal">
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>
