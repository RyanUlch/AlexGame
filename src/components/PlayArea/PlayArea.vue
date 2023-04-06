<script setup lang="ts">
	import { computed, reactive } from 'vue';
	import { useLevelStore, autotileCoord } from '../../stores/levelStore';
	import { useSpriteStore } from '@/stores/spriteStore';
	import { storeToRefs } from 'pinia';
	import PawnSprite from './PawnSprite.vue';
	import { useKeyHandler } from '@/composables/useKeyHandler';
	import { keyHandler } from '@/inputHandlers/keyInput';
	import { useLogComposable } from '../../composables/logComposable';

	// Set up level store and retrieve necessary values
	const levelStore = useLevelStore();
	const { levelMatrix } = storeToRefs(levelStore);

	const { addLogLine } = useLogComposable();
	levelStore.openLevel('level0');
	// Set up sprite store and register sprites
	const spriteStore = useSpriteStore();
	const { characterPosition, characterId, screenPosition, scale } = storeToRefs(spriteStore);
	spriteStore.registerSprite([2, 1, 's'], () => {
		addLogLine(`It's locked`);
	});
	spriteStore.registerSprite([5, 2, 'n'], () => {
		characterId.value = '0';
		spriteStore.deregisterSprite(1);
		levelMatrix.value[5][2].impassible = false;
		levelMatrix.value[5][2].layeredImageSrc = undefined;
		levelMatrix.value[5][2].layeredImageCoord = undefined;
		addLogLine(`You found your hat. cool.`);
	});

	// Compute whether level matrix is ready to be rendered
	const matrixReady = computed(() => {
		return levelMatrix.value.length > 0;
	});

	// Set up key handler
	useKeyHandler(keyHandler);
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
					<!-- Render pawn sprite if present at this position -->
					<PawnSprite
						v-if="rowIndex === characterPosition[0] && colIndex === characterPosition[1]"
						:characterFilename="characterId"
						:direction="characterPosition[2]"
						class="character" />

					<!-- Render layer image if present at this position -->
					<img
						v-if="col.layeredImageCoord"
						class="objectLayer"
						:src="`src/assets/levels/objects/${col.layeredImageSrc}.png`"
						:style="{
							objectPosition: `-${col.layeredImageCoord[1] * 16}px -${
								col.layeredImageCoord[0] * 16
							}px`,
							objectFit: 'none',
						}" />
				</div>
			</div>
		</template>
		<template v-else>
			<div>Loading...</div>
		</template>
	</div>
</template>

<style scoped>
	.temp {
		color: white;
	}
	.character {
		width: 16px;
		height: 20px;
		transform: translateY(-4px);
		position: absolute;
	}
	.objectLayer {
		width: 16px;
		height: 16px;
	}
	.full {
		pointer-events: none;
		user-select: none;
		display: inline-flex;
		flex-direction: column;
		transform: scale(v-bind(scale));
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
		position: relative;
		top: v-bind('`${screenPosition[0]}px`');
		left: v-bind('`${screenPosition[1]}px`');
	}
	.row {
		display: inline-flex;
		flex-direction: row;
		height: 16px;
	}
	.column {
		width: 16px;
		height: 16px;
	}
</style>
