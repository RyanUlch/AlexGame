<!-- DragElement is an encapsulated-state element -->
<script setup lang="ts">
	/* eslint-disable no-mixed-spaces-and-tabs */

	// Vue Imports:
	import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
	// Drag Store Import:
	import { useDragDropStore } from '../../stores/dragStore';

	// Props: NOTE: All props are optional - Some props if provided, require other props
	const props = withDefaults(
		defineProps<{
			// If any below used; all are required: - These allow DragElement to be dropped into specific DropElements
			dragInit?: {
				dragType: number | string; // This Elements
				dragId: number;
				dropId: number;
				dropHandler: (
					dropType: number | string,
					dragID: number,
					droppedIntoId: number | string,
					droppedFromId: number | string,
				) => void;
			};
			// Optional - Can be used regardless of if the above props are supplied
			startingOffset?: [string, string];
			bounds?: {
				top?: number;
				right?: number;
				bottom?: number;
				left?: number;
			};
			preventX?: boolean;
			preventY?: boolean;
			hoverClass?: string;
			canBeDropped?: (dragType: number | string, dragId: number | string) => boolean;
			disabled?: boolean;
		}>(),
		{
			disabled: false,
		},
	);

	// Store:
	const store = useDragDropStore();

	// Lifecycle Hooks:

	// When mounted, move card to the top left of the parent container
	// props.startingOffset used to space elements manually from initialization
	onMounted(() => {
		dragCurrentLocation[0] = props.startingOffset ? props.startingOffset[0] : '0px';
		dragCurrentLocation[1] = props.startingOffset ? props.startingOffset[1] : '0px'
	});

	// Clear any outstanding interval/timers/listeners before unmounting
	onBeforeUnmount(() => {
		cleanupSideEffects();
	});

	// State:

	const dragCurrentLocation = reactive<[string, string]>(['0px', '0px']);
	const dragStartingLocation = reactive<[string, string]>(['0px', '0px']);
	const isBeingDragged = ref<boolean>(false);
	const isCurrentlyDragged = ref<boolean>(false);

	// Update and prevent pointer events if user is currently dragging this element
	const styleObject = reactive({
		PointerEvent: isCurrentlyDragged.value ? 'none' : 'auto',
	});

	// Methods:
	const cleanupSideEffects = () => {
		document.removeEventListener('mouseup', dragStopHandler);
		document.removeEventListener('mousemove', mouseHandle);
		isValidHovering.value = false;
	};

	// If the user provided bounds, check bounds against mouse position in 4 directions.
	// Any position is allowed to be undefined, as constraints can be made in any combination of directions.
	const checkBounds = (vertical: number, horizontal: number): [string, string] => {
		if (props.bounds) {
			return [
				props.preventY
					? dragCurrentLocation[0]
					: (props.bounds.top === undefined || props.bounds.top < vertical) &&
					  (props.bounds.bottom === undefined || vertical < props.bounds.bottom)
					? `${vertical}px`
					: dragCurrentLocation[0],
				props.preventX
					? dragCurrentLocation[1]
					: (props.bounds.left === undefined || props.bounds.left < horizontal) &&
					  (props.bounds.right === undefined || horizontal < props.bounds.right)
					? `${horizontal}px`
					: dragCurrentLocation[1],
			];
		} else {
			return [`${vertical}px`, `${horizontal}px`];
		}
	};

	// Listener Handlers:

	const mouseHandle = (event: MouseEvent) => {
		dragHandler(event.clientY, event.clientX);
	};


	// When user clicks and holds onto a DragElement, kick off listeners to handle everything else
	const mouseDragStartHandler = (event: MouseEvent) => {
		if (props.disabled === false) {
			// Capture current location in case drop is unsuccessful
			dragStartingLocation[0] = dragCurrentLocation[0];
			dragStartingLocation[1] = dragCurrentLocation[1];
			isBeingDragged.value = true;
			dragHandler(event.clientY, event.clientX);

			// Attach listeners to window to monitor movement/dropping
			document.addEventListener('mousemove', mouseHandle);
			document.addEventListener('mouseup', dragStopHandler);
		}
	};

	const isValidHovering = ref(false);

	// While moving Mouse:
	const dragHandler = (vertical: number, horizontal: number) => {
		isValidHovering.value = store.draggingHandler(props.dragInit?.dragType);
		if (props.bounds) {
			const boundReturn = checkBounds(vertical, horizontal);
			dragCurrentLocation[0] = boundReturn[0];
			dragCurrentLocation[1] = boundReturn[1];
		} else {
			dragCurrentLocation[0] = `${props.preventY ? dragStartingLocation[0] : vertical + 'px'}`;
			dragCurrentLocation[1] = `${props.preventX ? dragStartingLocation[1] : horizontal + 'px'}`;
		}
	};

	// When dropped, clean-up, and if applicable, run store drop handler
	const dragStopHandler = () => {
		cleanupSideEffects();
		isBeingDragged.value = false;
		// Run store drop handler only if dragType, dragId, and callback were provided
		if (props.dragInit) {
			// If user passed in a callback to check if element can be dropped or not
			if (
				props.canBeDropped &&
				!props.canBeDropped(props.dragInit.dragType, props.dragInit.dragId)
			) {
				dragCurrentLocation[0] = dragStartingLocation[0];
				dragCurrentLocation[1] = dragStartingLocation[1];
				return;
			}
			const intoDropElementIndex = store.droppingHandler(
				props.dragInit.dragType,
				props.dragInit.dropId,
			);
			if (intoDropElementIndex !== null) {
				props.dragInit.dropHandler(
					props.dragInit.dragType,
					props.dragInit.dragId,
					intoDropElementIndex,
					props.dragInit.dropId,
				);
			} else {
				dragCurrentLocation[0] = dragStartingLocation[0];
				dragCurrentLocation[1] = dragStartingLocation[1];
			}
		}
	};
</script>

<template>
	<div
		class="dragElement"
		:class="{ [String(props.hoverClass)]: isValidHovering }"
		@mousedown.prevent="mouseDragStartHandler"
		:style="styleObject"
		:disabled="props.disabled">
		<slot></slot>
	</div>
</template>

<style scoped>
	.dragElement {
		position: v-bind('props.dragInit && !props.disabled ? "relative" : "absolute"');
		top: v-bind('dragCurrentLocation[0]');
		left: v-bind('dragCurrentLocation[1]');
		transition: v-bind('!isBeingDragged ? "top 250ms, left 250ms" : "none"');
	}

	.dragElement:active {
		position: absolute;
	}
</style>
