<script setup lang="ts">
	import { computed } from 'vue';
	type ModalProps = {
		title: string;
		noClose?: boolean;
		imgSrc?: string;
	};

	const props = defineProps<ModalProps>();
	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const backColor = computed(() => {
		switch (props.imgSrc) {
			case 'Img0':
			case 'Img0_Sleep':
				return ['var(--modal-img0-main)', 'var(--modal-img0-header)'];
			case 'Img1':
			case 'Img1_Sleep':
				return ['var(--modal-img1-main)', 'var(--modal-img1-header)'];
			case 'Img2':
			case 'Img2_Unconscious':
				return ['var(--modal-img2-main)', 'var(--modal-img2-header)'];
			case 'Img3':
			case 'Img3_Sleep':
				return ['var(--modal-img3-main)', 'var(--modal-img3-header)'];
			case 'Img4':
			case 'Img4_Sleep':
				return ['var(--modal-img4-main)', 'var(--modal-img4-header)'];
			case 'PC_F':
				return ['var(--modal-PC_F-main)', 'var(--modal-PC_F-header)'];
			case 'crystal':
				return ['var(--modal-crystal-main)', 'var(--modal-crystal-header)'];
			default:
				return ['var(--modal-main-background)', 'var(--modal-header-background)'];
		}
	});
</script>

<template>
	<Teleport to="#modal-target">
		<div
			class="background-blocker"
			@click="emit('close')">
			<div
				class="modal-root"
				@click.stop>
				<header>
					<img
						v-if="props.imgSrc"
						class="picture"
						:src="`src/assets/prompt_images/${props.imgSrc}.png`"
						alt="" />
					<span class="title">{{ props.title }}</span>
					<div v-if="noClose"></div>
					<button
						v-if="!noClose"
						class="close"
						@click="emit('close')">
						X
					</button>
				</header>
				<hr />
				<main>
					<slot :close="() => emit('close')"></slot>
				</main>
			</div>
		</div>
	</Teleport>
</template>

<style scoped>
	.picture {
		width: 50px;
		height: 50px;
		margin-right: 10px;
		display: inline;
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
		border: var(--borderSize) solid var(--borderColor);
		padding: 3px;
	}
	.background-blocker {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	.modal-root {
		width: calc(100% - 24px);
	}

	header {
		border-radius: var(--space-large) var(--space-large) 0 0;
		padding: var(--p-medium);
		display: flex;
		background-color: v-bind(backColor[1]);
		justify-content: space-between;
		align-items: center;
	}

	main {
		border-radius: 0 0 var(--space-large) var(--space-large);
		padding: var(--p-large);
		background-color: v-bind(backColor[0]);
	}

	.close {
		border-radius: var(--space-large);
		background-color: var(--modal-red);
		cursor: pointer;
		align-self: flex-end;
		width: 25px;
		height: 25px;
	}
</style>
