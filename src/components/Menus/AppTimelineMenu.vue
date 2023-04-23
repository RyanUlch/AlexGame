<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import { useTimelineStore } from '@/stores/timeline';
	import { computed } from 'vue';
	import AppModal from './AppModal.vue';
	const settingStore = useSettingsStore();
	const timelineStore = useTimelineStore();
	const time = computed(() => {
		switch (timelineStore.currentTime) {
			case 0:
				return 'It is the Morning';
			case 1:
				return 'It is the Afternoon';
			case 2:
				return 'It is the evening';
			case 3:
				return 'It is night';
		}
	});

	const changeTime = () => {
		timelineStore.advanceTime();
		settingStore.closeInventoryMenu();
	};
</script>

<template>
	<AppModal
		v-if="settingStore.inventoryMenuIsOpen"
		title="Time"
		@close="settingStore.closeInventoryMenu">
		<template v-slot="modal">
			<h2 class="title">{{ time }}</h2>
			<p class="p">Would you like to advance time?</p>
			<p
				v-if="timelineStore.currentTime !== 3"
				class="hint">
				If there is any conversations/choices you have not yet made in this time period, advancing
				time will lock you out of them, until the next loop.
			</p>
			<p
				v-if="timelineStore.currentTime === 3"
				class="hint">
				You will be reset at the beginning of the day in your home.
			</p>
			<button
				v-if="timelineStore.currentTime !== 3"
				:onClick="changeTime"
				class="advanceBtn">
				Advance Time!
			</button>
			<button
				v-if="timelineStore.currentTime === 3"
				:onClick="changeTime"
				class="advanceBtn">
				Reset Loop
			</button>
		</template>
	</AppModal>
</template>

<style scoped>
	.title {
		padding-bottom: 20px;
		text-decoration: underline;
		text-align: center;
	}
	.p {
		text-align: center;
	}

	.hint {
		border: 1px solid black;
		width: 90%;
		margin: 10px auto;
		padding: 10px;
		font-size: 0.8rem;
		line-height: 1.2rem;
		background-color: var(--modal-header-background);
	}
	.advanceBtn {
		width: 100%;
		height: 40px;
		background-color: var(--modal-header-background);
	}
</style>
