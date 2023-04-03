/* eslint-disable no-mixed-spaces-and-tabs */
// Pinia/Vue type Imports:
import { defineStore } from 'pinia';
import { useLogComposable } from '@/composables/logComposable';
const { addLogLine } = useLogComposable();
// Drag (and) Drop Store used to store drop elements references, and handle logic with dragging/dropping elements
export const useDragDropStore = defineStore('dragAndDropStore', () => {
	// State:
	// References to each DropElements div to check bounding client
	// index for easier comparisons and handling logic
	const dropElements: {
		[dragType: string]: (number | string)[];
	} = {};

	let hoveringOver: { dropId: number | string; dropType: number | string } | null = null;

	// Methods:
	// When Drop element is mounted, add ref to state for easy reference
	const registerDropElement = (dragType: number | string, dropIndex: number | string): void => {
		if (!dropElements[dragType]) {
			dropElements[dragType] = [];
		}
		dropElements[dragType].push(dropIndex);
	};

	// Remove element ref from state if the element unmounts (handled in DropElement.vue)
	const deregisterDropElement = (dragType: number | string, dropIndex: number | string): void => {
		const removalIndex = dropElements[dragType].findIndex((element) => element === dropIndex);
		if (removalIndex > -1) {
			dropElements[dragType].splice(removalIndex, 1);
		} else {
			throw new Error(`Tried to delete array of ${dragType}, in dropElements, that does not exist`);
		}
		if (dropElements[dragType].length === 0) {
			delete dropElements[dragType];
		}
	};

	// Optional: Used when user passes in a hoverHandler in DragElement.vue
	// Use-Case: User wants a Card to glow when being held over a valid dropElement
	const draggingHandler = (dragType: number | string | undefined) => {
		return dragType === hoveringOver?.dropType;
	};

	// Check if the location the DragElement is being dropped is within a valid DropElement
	// On a successful drop, return identifier of the DropElement that DragElement is over
	const droppingHandler = (dragType: number | string, fromDropId: number | string) => {
		if (dragType === hoveringOver?.dropType && fromDropId !== hoveringOver.dropId) {
			return hoveringOver.dropId;
		} else {
			return null;
		}
	};

	// Update which element, if any, is being hovered over currently
	const hoveringUpdateHandler = (
		dropOver: { dropId: number | string; dropType: number | string } | null,
	) => {
		hoveringOver = dropOver;
	};

	return {
		dropElements,
		hoveringUpdateHandler,
		registerDropElement, // Mandatory in DropElement.vue
		deregisterDropElement, // Mandatory in DropElement.vue
		draggingHandler, // Optional: If user wants to know when DragElement is hovering over valid Drop Element
		droppingHandler, // Optional: If user wants to limit the area that DragElement can be dropped
	};
});
