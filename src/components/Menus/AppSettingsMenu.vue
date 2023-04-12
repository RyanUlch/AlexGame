<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { ref, onUpdated } from 'vue';
	import { storeToRefs } from 'pinia';
	import AppModal from './AppModal.vue';
	import { AudioPlayer } from '@/Audio/Audio';
	const { settingsMenuIsOpen } = storeToRefs(useSettingsStore());
	const { closeSettingsMenu } = useSettingsStore();

	const volume = ref<number>(100);
	const muted = ref<boolean>(false);
	onUpdated(() => {
		AudioPlayer.isMuted = muted.value;
		AudioPlayer.volume = volume.value;
	});
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
							id="muted"
							name="muted"
							v-model.boolean="muted" />
					</td>
					<td>Set Volume:</td>
					<td>
						<input
							type="range"
							id="vol"
							name="vol"
							min="0"
							max="100"
							v-model.number="volume" />
					</td>
				</tr>
			</table>
			<button @click="modal.close">Close</button>
		</template>
	</AppModal>
</template>
