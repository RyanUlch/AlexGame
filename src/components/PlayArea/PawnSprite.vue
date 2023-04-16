<script setup lang="ts">
	import { computed, ref } from 'vue';

	/* Characters Sprites should be on their own sheets in a 3 x 4 grid, with a width of 16px, and a height of 20px. They should also have the still animation in the middle column */
	/* All of this is to make it easier to have the correct displaying of all sprites */
	const props = defineProps<{
		spriteName: string | undefined;
		coords: [number, number] | undefined;
	}>();

	const facing = computed(() => {
		if (props.coords) {
			switch (props.coords[0]) {
				case 3:
					return 60;
				case 2:
					return 40;
				case 0:
					return 0;
				case 1:
					return 20;
				default:
					return 0;
			}
		}
		throw Error('no pawn coords');
	});
	let animation = ref(0);

	let isLeft = false;
	setInterval(() => {
		if (animation.value === 16 && isLeft) {
			animation.value = 0;
			isLeft = false;
		} else if (animation.value === 16) {
			animation.value = 32;
			isLeft = true;
		} else {
			animation.value = 16;
		}
	}, 1000);
</script>
<template>
	<img
		v-if="props.spriteName"
		:src="`src/assets/pixelAssets/${props.spriteName}.png`"
		:style="{
			objectFit: 'none',
			objectPosition: `-${animation}px -${facing}px`,
		}" />
</template>
<style scoped></style>
