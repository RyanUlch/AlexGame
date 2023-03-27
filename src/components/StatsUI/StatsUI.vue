<script setup lang="ts">
const props = defineProps<{
	stats: {
		type: string;
		value: number;
		maxValue: number;
		iconAmount: number;
		tooltip: string;
		imgFileName: string;
		hasPartialIcon?: boolean
	}[];
}>();

/* 
<StatsUI :stats="[
		{
			type: 'health',
			value: ,
			maxValue: 10,
			iconAmount: 5,
			tooltip: 'This is your health',
			imgFileName: 'heart',
		}
	]" ></StatsUI>
*/

</script>
<template>
	<ul>
		<li 
			v-for="(stat, index) in props.stats"
			:key="index"
			:title="stat.tooltip"
		>
			<img 
				v-for="(icon, iconIndex) in stat.iconAmount"
				:key="iconIndex"
				:src="`src/assets/UI/statsIcons/${stat.imgFileName}-${icon < Math.floor((stat.value / stat.maxValue) * stat.iconAmount) ? 'full' : icon > ((stat.value / stat.maxValue) * stat.iconAmount) ? 'empty' : 'partial' }.png`"
				/>
		</li>
	</ul>
</template>
<style scoped>

</style>

