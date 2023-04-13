<script setup lang="ts">
	import { computed } from 'vue';
	const props = defineProps<{
		tooltip: string;
		iconFileBase: string;
		isIconBased: boolean;
		value: number;
		maxValue: number;
		hasPartialIcons?: boolean;
	}>();

	const icons = computed(() => {
		const iconArr = [];
		for (let i = 1; i <= props.maxValue; ++i) {
			if (props.hasPartialIcons) {
				if (props.value >= i) {
					if (props.value >= 1 + i) {
						iconArr.push('full');
					} else {
						iconArr.push('partial');
					}
				} else {
					iconArr.push('empty');
				}
				++i;
			} else {
				iconArr.push(props.value >= i ? 'full' : 'empty');
			}
		}
		return iconArr;
	});
</script>
<template>
	<div
		v-if="props.isIconBased"
		:title="props.tooltip"
		class="stats">
		<img
			v-for="(icon, index) in icons"
			:key="index"
			:src="`src/assets/UI/statsIcons/${props.iconFileBase}-${icon}.png`"
			alt="" />
	</div>
	<div
		v-else
		:title="props.tooltip"
		class="stats">
		<img
			:src="`src/assets/UI/statsIcons/${props.iconFileBase}.png`"
			alt="" />
		<p v-if="props.maxValue > 0">{{ props.value }} / {{ props.maxValue }}</p>
	</div>
</template>
<style scoped>
	.stats {
		display: inline-flex;
		flex-direction: row;
		cursor: default;
		/* border: var(--borderSize) solid var(--borderColor); */
		justify-content: center;
		height: 20px;
		padding: 1px;
	}
</style>
