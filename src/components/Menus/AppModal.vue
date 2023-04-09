<script setup lang="ts">
	type ModalProps = {
		title: string;
		noClose?: boolean;
	};

	const props = defineProps<ModalProps>();
	const emit = defineEmits<{
		(e: 'close'): void;
	}>();
</script>

<template>
	<Teleport to="#modals">
		<div
			class="background-blocker"
			@click="emit('close')">
			<div
				class="modal-root"
				@click.stop>
				<header>
					<span class="title">{{ props.title }}</span>
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
	.background-blocker {
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		top: 0;
	}

	.modal-root {
		width: 50%;
		min-width: 300px;
		background: white;
	}

	header {
		border-radius: var(--space-large) var(--space-large) 0 0;

		padding: var(--p-medium);
		display: flex;
		justify-content: space-between;
		background-color: var(--modal-header-background);
	}

	main {
		border-radius: 0 0 var(--space-large) var(--space-large);
		padding: var(--p-medium);
		background-color: var(--modal-main-background);
	}

	.close {
		border-radius: var(--space-large);
		background-color: var(--modal-main-background);
		cursor: pointer;
	}
</style>
