<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { onUpdated } from 'vue';
	import AppModal from './AppModal.vue';
	import { AudioPlayer } from '@/Audio/Audio';

	const settingStore = useSettingsStore();
	onUpdated(() => {
		const volumeEle: HTMLInputElement | null = document.querySelector('#vol');
		console.log(volumeEle);
		if (volumeEle?.value) {
			volumeEle.value = `${AudioPlayer.getVolume() * 100}`;
		}

		const mutedEle: HTMLInputElement | null = document.querySelector('#muted');
		if (mutedEle) {
			mutedEle.checked = AudioPlayer.getIsMuted();
		}
	});

	const setVol = () => {
		const ele: HTMLInputElement | null = document.querySelector('#vol');
		if (ele?.value) {
			const volume = +ele.value;
			AudioPlayer.setVolume(volume / 100);
			localStorage.setItem('volume', ele.value);
		}
	};

	const setMute = () => {
		const ele: HTMLInputElement | null = document.querySelector('#muted');
		if (ele?.checked) {
			AudioPlayer.mute();
			localStorage.setItem('muted', 'true');
		} else {
			AudioPlayer.unmute();
			localStorage.setItem('muted', 'false');
		}
	};
</script>

<template>
	<AppModal
		v-if="settingStore.settingsMenuIsOpen"
		title="Settings"
		@close="settingStore.closeSettingsMenu">
		<template v-slot="modal">
			<div class="settingGroup">
				<label for="muted">Mute All Sounds:&nbsp;</label>
				<input
					type="checkbox"
					id="muted"
					name="muted"
					@change="setMute" />
			</div>
			<div class="settingGroup">
				<label for="vol">Set Volume:</label>
				<input
					type="range"
					id="vol"
					name="vol"
					min="0"
					max="100"
					@change="setVol" />
			</div>
		</template>
	</AppModal>
</template>

<style scoped>
	.settingGroup {
		padding: 10px;
	}
</style>
