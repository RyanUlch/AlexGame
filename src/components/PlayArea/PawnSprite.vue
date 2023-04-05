<script setup lang="ts">
	import { computed, ref } from 'vue';

	import { storeToRefs } from 'pinia';
	/* Characters Sprites should be on their own sheets in a 3 x 4 grid, with a width of 16px, and a height of 20px. They should also have the still animation in the middle column */
	/* All of this is to make it easier to have the correct displaying of all sprites */
	const props = defineProps<{
		characterFilename: string;
		direction: string; // n = 60, e = 40, s = 0, w = 20
	}>();

	const facing = computed(() => {
		switch (props.direction) {
			case 'n':
				return 60;
			case 'e':
				return 40;
			case 's':
				return 0;
			case 'w':
				return 20;
			default:
				return 0;
		}
	});
	let animation = ref(0);
	setInterval(() => {
		let isLeft = false;
		if (animation.value === 16 && isLeft) {
			animation.value = 0;
		} else if (animation.value === 16) {
			animation.value = 32;
		} else {
			animation.value = 16;
		}
	}, 1000);
</script>
<template>
	<img
		:src="`src/assets/levels/characters/${props.characterFilename}.png`"
		:style="{
			objectFit: 'none',
			objectPosition: `-${animation}px -${facing}px`,
		}" />
</template>
<style scoped></style>
