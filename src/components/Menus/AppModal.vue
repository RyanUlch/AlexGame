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
		<div class="background-blocker" @click="emit('close')">
			<div class="modal-root" @click.stop>
				<header>
					<div class="left">
						<span class="title">{{ props.title }}</span>
					</div>
					<div class="right">
						<button
							v-if="!noClose"
							class="close"
							@click="emit('close')">
							X
						</button>
					</div>
				</header>
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
	background: var(--color-background-soft);
	border-radius: var(--space-large);
	color: var(--color-soft);
	width: 50%;
	min-width: 300px;
}

header {
	padding: var(--p-medium);
	display: flex;
	justify-content: space-between;
}

main {
	padding: var(--p-medium);
}
</style>