<script setup lang="ts">
	import { computed } from 'vue';
	import { useLevelStore } from '../../stores/level';
	import { usePawnStore } from '@/stores/pawn';
	import PawnSprite from './PawnSprite.vue';
	import CharacterSprite from './CharacterSprite.vue';
	import { useKeyHandler } from '@/composables/useKeyHandler';
	import { keyHandler } from '@/inputHandlers/keyInput';

	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();

	// Compute whether level matrix is ready to be rendered
	const matrixReady = computed(() => {
		return levelStore.levelMatrix.length > 0;
	});

	// Set up key handler
	useKeyHandler(keyHandler);
</script>

<template>
	<div class="screen">
		<div class="camera">
			<template v-if="matrixReady">
				<div
					class="row"
					v-for="(row, rowIndex) in levelStore.levelMatrix"
					:key="rowIndex">
					<div
						class="column"
						v-for="(col, colIndex) in row"
						:key="colIndex"
						:style="{
							backgroundImage: `url('src/assets/pixelAssets/${col.tileset}.png')`,
							backgroundPosition: `-${col.tileCoord[1] * 16}px -${col.tileCoord[0] * 16}px`,
						}">
						<!-- Render pawn sprite if present at this position -->
						<CharacterSprite
							v-if="
								rowIndex === pawnStore.characterPosition[0] &&
								colIndex === pawnStore.characterPosition[1]
							"
							:characterFilename="pawnStore.characterId"
							:direction="pawnStore.characterPosition[2]"
							class="character" />

						<!-- Render layer image if present at this position -->
						<img
							v-for="layer of col.layers"
							class="objectLayer"
							:src="`src/assets/pixelAssets/${layer.src}.png`"
							:style="{
								objectPosition: `-${layer.coord[1] * 16}px -${
									layer.coord[0] * (col.isCharacter ? 20 : 16)
								}px`,
								objectFit: 'none',
								zIndex: col.isCharacter ? 5 : 0,
							}" />
						<!-- <PawnSprite
							v-if="col.isCharacter"
							class="npc"
							:spriteName="col.layeredImageSrc"
							:coords="col.layeredImageCoord" /> -->
					</div>
				</div>
			</template>
			<template v-else>
				<div>Loading...</div>
			</template>
		</div>
	</div>
</template>

<style scoped>
	.npc {
		width: 16px;
		height: 20px;
		transform: translateY(-4px);
		position: absolute;
	}

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
		position: absolute;
	}

	.screen {
		pointer-events: none;
		user-select: none;
		transform: scale(v-bind('`${pawnStore.scale}`'));
		transform-origin: top left;
	}
	.camera {
		display: inline-flex;
		flex-direction: column;
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
		position: relative;
		top: v-bind('`${(((20/pawnStore.scale) - pawnStore.characterPosition[0]) * 16)}px`');
		left: v-bind('`${(((20/pawnStore.scale) - pawnStore.characterPosition[1]) * 16)}px`');
	}
	.full {
		display: inline-flex;
		flex-direction: column;
		transform: scale(5);
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
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
