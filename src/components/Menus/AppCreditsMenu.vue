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
			<h2 class="title">The Life and Death of Alex</h2>
			<h4 class="subtitle">This game was created by best friends:</h4>
			<p class="p">Eric Sartor</p>
			<p class="p">
				Ryan Ulch:&emsp;<a href="https://github.com/RyanUlch"><span>github</span></a
				>&emsp;<a href="http://ryanulch.com/"><span>website</span></a>
			</p>
			<hr />
			<h4 class="subtitle">Pixel assets were purchased and modified. The original artists:</h4>
			<p class="p">Gif:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;@gif_not_jif</p>
			<p class="p">Noiracide:&emsp;@Noiracide</p>
			<p class="p">Romi:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;@DessRomaric</p>
			<hr />
			<h4 class="subtitle music">
				Music and Sound effects used under
				<a href="https://creativecommons.org/publicdomain/zero/1.0/">Creative Commons</a> and
				<a href="https://creativecommons.org/licenses/by/4.0/">Attribution Licenses.</a>
			</h4>
			<h4 class="subtitle">Contributions by:</h4>
			<div class="group">
				<a href="https://freesound.org/people/FawfulGrox/sounds/103336/">FawfulGrox</a>
				<a href="https://freesound.org/people/danieldouch/sounds/466556/">danieldouch</a>
				<a href="https://freesound.org/people/PeteBarry/sounds/647463/">PeteBarry</a>
				<a href="https://freesound.org/people/InspectorJ/sounds/352102/"
					>InspectorJ (www.jshaw.co.uk)</a
				>
			</div>
		</template>
	</AppModal>
</template>

<style scoped>
	.title {
		text-align: center;
		text-decoration: underline;
		padding-bottom: 20px;
		font-size: 1.3rem;
	}
	.subtitle {
		padding: 15px 0;
	}

	.group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		align-items: center;
		text-align: center;
	}

	.music {
		font-size: 0.8rem;
		text-align: center;
	}
	.p {
		padding-bottom: 10px;
	}
</style>
