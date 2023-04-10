<script setup lang="ts">
	import { useMenuStore } from '@/stores/menus';
	import { storeToRefs } from 'pinia';
	import AppModal from './AppModal.vue';
	const { settingsMenuIsOpen, dontUseAudio } = storeToRefs(useMenuStore());
	const { closeSettingsMenu } = useMenuStore();
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
							v-model.boolean="dontUseAudio" />
					</td>
				</tr>
			</table>
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>
