<script setup lang="ts">
	import { computed } from 'vue';
	import { useLevelStore } from '../../stores/level';
	import { usePawnStore } from '@/stores/pawn';
	import { useCutsceneStore } from '@/stores/cutscene';
	import PawnSprite from './PawnSprite.vue';
	import CharacterSprite from './CharacterSprite.vue';
	import { useKeyHandler } from '@/composables/useKeyHandler';
	import { keyHandler } from '@/inputHandlers/keyInput';

	const pawnStore = usePawnStore();
	const levelStore = useLevelStore();
	const cutsceneStore = useCutsceneStore();

	const matrixToUse = computed(() => {
		if (levelStore.cutsceneMatrix.length > 0) return levelStore.cutsceneMatrix;
		return levelStore.levelMatrix;
	});

	// Compute whether level matrix is ready to be rendered
	const matrixReady = computed(() => {
		return matrixToUse.value.length > 0;
	});

	const cameraTop = computed(() => {
		if (cutsceneStore.cutsceneActive) {
			return `${(20 / pawnStore.scale - cutsceneStore.cutsceneCameraPosition[0]) * 16}px`;
		}
		return `${(20 / pawnStore.scale - pawnStore.characterPosition[0]) * 16}px`;
	});
	const cameraLeft = computed(() => {
		if (cutsceneStore.cutsceneActive) {
			return `${(20 / pawnStore.scale - cutsceneStore.cutsceneCameraPosition[1]) * 16}px`;
		}
		return `${(20 / pawnStore.scale - pawnStore.characterPosition[1]) * 16}px`;
	});

	// Set up key handler
	useKeyHandler(keyHandler);
</script>

<template>
	<div class="screen">
		<div
			class="camera"
			id="camera">
			<template v-if="matrixReady">
				<div
					class="row"
					v-for="(row, rowIndex) in matrixToUse"
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
								!cutsceneStore.cutsceneActive &&
								rowIndex === pawnStore.characterPosition[0] &&
								colIndex === pawnStore.characterPosition[1]
							"
							:characterFilename="pawnStore.characterId"
							:direction="pawnStore.characterPosition[2]"
							class="character" />

						<!-- Render layer image if present at this position -->
						<img
							v-for="(layer, i) of col.layers"
							class="objectLayer"
							:src="`src/assets/pixelAssets/${layer.src}.png`"
							:style="{
								objectPosition: `-${layer.coord[1] * 16}px -${
									layer.coord[0] * (col.isCharacter ? 20 : 16)
								}px`,
								objectFit: 'none',
								zIndex: col.isCharacter ? 5 : 0,
							}"
							:key="i" />
						<template
							v-if="cutsceneStore.cutsceneActive && cutsceneStore.cutsceneSprites.length > 0">
							<PawnSprite
								v-for="(sprite, i) of cutsceneStore.cutsceneSprites.filter(
									(s) => s.position[0] === rowIndex && s.position[1] === colIndex,
								)"
								class="npc"
								:spriteName="sprite.imgSrc"
								:coords="sprite.coords"
								:key="i" />
						</template>
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
			<div id="curtain"></div>
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
		top: v-bind('cameraTop');
		left: v-bind('cameraLeft');
	}
	#curtain {
		position: absolute;
		pointer-events: none;
		width: 100%;
		height: 100%;
		background-color: black;
		top: 0;
		left: 0;
		opacity: v-bind('cutsceneStore.curtainOpacity');
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
