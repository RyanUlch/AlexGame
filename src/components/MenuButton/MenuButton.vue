<!-- Requires the icon filename within src/assets/UI/menuBtnIcons as a png -->
<!-- Every button should open up a modal when clicked, pass callbacks for specific modal handlers -->
<script setup lang="ts">
	const props = defineProps<{
		imgFileName: string;
		tooltip: string;
		modalHandler: () => void;
	}>();
</script>

<template>
	<button
		class="menuBtn"
		:style="{ backgroundImage: `url('src/assets/UI/menuBtnIcons/${props.imgFileName}.png')` }"
		:title="props.tooltip"
		@click.prevent="props.modalHandler"></button>
</template>

<style scoped>
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
