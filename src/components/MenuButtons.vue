<!-- Requires the icon filename within src/assets/UI/menuBtnIcons as a png -->
<!-- Every button should open up a modal when clicked, pass callbacks for specific modal handlers -->
<script setup lang="ts">
	const props = defineProps<{
		btnInfoArray: {
			imgFileName: string;
			tooltip: string;
			modalHandler: () => void;
		}[];
	}>();
</script>

<template>
	<div class="menuBtnContainer">
		<button
			v-for="(btn, btnIndex) in props.btnInfoArray"
			:key="`btn-${btnIndex}`"
			class="menuBtn"
			:style="{ backgroundImage: `url('src/assets/UI/menuBtnIcons/${btn.imgFileName}.png')` }"
			:title="btn.tooltip"
			@click="btn.modalHandler"></button>
	</div>
</template>

<style scoped>
	/* Based on current design, buttons are in a 2x2 grid, can change grid-template-columns for adding/removing buttons */
	.menuBtnContainer {
		display: inline-grid;
		grid-template-columns: 1fr 1fr;
	}
	.menuBtn {
		height: var(--menuSide);
		width: var(--menuSide);
		background-size: contain;
		background-color: var(--menuBtnBack);
	}
	.menuBtn:hover {
		background-color: var(--menuBtnBackHover);
	}
	.menuBtn:active {
		background-color: var(--menuBtnBackActive);
	}
</style>
