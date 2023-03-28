<script setup lang="ts">
	import StatsUi from './components/StatsUi/StatsUi.vue';
</script>

<template>
	<StatsUi
		tooltip="This is your health"
		iconFileBase="heart"
		:isIconBased="true"
		:value="5"
		:maxValue="10"
		:hasPartialIcons="true"
	/>
	<StatsUi
		tooltip="This is your energy"
		iconFileBase="energy"
		:isIconBased="false"
		:value="5"
		:maxValue="10"
	/>
	<StatsUi
		tooltip="You are poisoned!"
		iconFileBase="poison"
		:isIconBased="false"
		:value="0"
		:maxValue="0"
	/>
</template>

<style scoped></style>
