<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { storeToRefs } from 'pinia';
	import AppModal from './AppModal.vue';
	const { settingsMenuIsOpen, isNoAudio } = storeToRefs(useSettingsStore());
	const { closeSettingsMenu } = useSettingsStore();
</script>

<template>
	<AppModal
		v-if="settingsMenuIsOpen"
		title="Settings"
		@close="closeSettingsMenu">
		<template v-slot="modal">
			<table>
				<tr>
					<td>Mute All Sounds:</td>
					<td>
						<input
							type="checkbox"
							v-model.boolean="isNoAudio" />
					</td>
				</tr>
			</table>
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>
