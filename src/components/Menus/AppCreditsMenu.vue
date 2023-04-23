<script setup lang="ts">
	import { useSettingsStore } from '@/stores/settings';
	import AppModal from './AppModal.vue';
	const settingStore = useSettingsStore();
</script>

<template>
	<AppModal
		v-if="settingStore.creditsMenuIsOpen"
		title="Credits"
		@close="settingStore.closeCreditsMenu">
		<template v-slot="modal">
			<h2 class="title">Game Title!</h2>
			<h4 class="subtitle">This game was created by best friends:</h4>
			<p class="p">
				Eric Sartor:&emsp;<a href="https://github.com/ericsartor"><span>github</span></a
				>&emsp;<a href=""><span>linkedIn</span></a
				>&emsp;<a href=""><span>whatever</span></a>
			</p>
			<p class="p">
				Ryan Ulch:&emsp;&emsp;&emsp;<a href="https://github.com/RyanUlch"><span>github</span></a
				>&emsp;<a href="http://ryanulch.com/"><span>website</span></a>
			</p>
			<hr />
			<h4 class="subtitle">Pixel assets were purchased and modified. The original artists:</h4>
			<p class="p">Gif:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;@gif_not_jif</p>
			<p class="p">Noiracide:&emsp;@Noiracide</p>
			<p class="p">Romi:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;@DessRomaric</p>
		</template>
	</AppModal>
</template>

<style scoped>
	.title {
		text-align: center;
		text-decoration: underline;
		padding-bottom: 20px;
	}
	.subtitle {
		padding: 15px 0;
	}
	.p {
		padding-bottom: 10px;
	}
</style>
