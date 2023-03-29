<!-- DropElement is a state-agnostic element -->
<script setup lang="ts">
	// Vue Imports:
	import { onMounted, onBeforeUnmount } from 'vue';
	import { useDragDropStore } from '../../stores/dragStore';

	// Props
	const props = defineProps<{
		dropElementIndex: number;
		dragElementType: string;
	}>();

	// Store:
	const store = useDragDropStore();

	// Lifecycle Hooks:
	// When mounted, it runs a callback to register it with registerDropElement
	onMounted(() => {
		store.registerDropElement(props.dragElementType, props.dropElementIndex);
	});
	// Deregister element if it gets unmounted for some reason
	onBeforeUnmount(() => {
		store.deregisterDropElement(props.dragElementType, props.dropElementIndex);
	});

	// Set store with the current DropElement ID and Type when a pointer enters the bounds of the element. Set to null when leaving.
	const updateHoverHandler = (e: Event) => {
		store.hoveringUpdateHandler(
			e.type === 'mouseenter' || e.type === 'touchenter'
				? { dropId: props.dropElementIndex, dropType: props.dragElementType }
				: null,
		);
	};
</script>

<template>
	<div
		@mouseenter="updateHoverHandler"
		@mouseleave="updateHoverHandler"
		@touchenter="updateHoverHandler"
		@touchleave="updateHoverHandler">
		<slot></slot>
	</div>
</template>
