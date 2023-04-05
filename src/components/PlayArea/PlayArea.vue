<script setup lang="ts">
	import { computed } from 'vue';
	import { useLevelStore, autotileCoord } from '../../stores/levelStore';
	import { storeToRefs } from 'pinia';
	const store = useLevelStore();
	const { levelMatrix } = storeToRefs(store);
	store.openLevel(0);

	const matrixReady = computed(() => {
		console.log(autotileCoord);
		return levelMatrix.value.length > 0;
	});
</script>
<template>
	<div class="full">
		<template v-if="matrixReady">
			<div
				class="row"
				v-for="(row, rowIndex) in levelMatrix"
				:key="rowIndex">
				<div
					class="column"
					v-for="(col, colIndex) in row"
					:key="colIndex"
					:style="{
						backgroundImage: `url('src/assets/levels/tilesets/${col.tileset}.png')`,
						backgroundPosition: `-${autotileCoord[col.tileCoord][1] * 16}px -${
							autotileCoord[col.tileCoord][0] * 16
						}px`,
					}">
					<img
						v-if="col.layeredImageSrc"
						class="objectLayer"
						:src="`src/assets/levels/objects/${col.layeredImageSrc}.png`" />
				</div>
			</div>
		</template>
		<template v-else>
			<div>Loading...</div>
		</template>
	</div>
</template>
<style scoped>
	.objectLayer {
		width: 16px;
		height: 16px;
	}
	.full {
		display: inline-flex;
		flex-direction: column;
	}
	.row {
		display: inline-flex;
		flex-direction: row;
		height: 16px;
		/* border: 1px solid black; */
	}
	.column {
		width: 16px;
		height: 16px;
	}
</style>
