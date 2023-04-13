import { setActivePinia, createPinia } from 'pinia';
import { useDragDropStore } from '../stores/drag';
import { test, describe, expect, beforeEach } from 'vitest';

/* STORE INFO
State:
	dropElements: {
		[dragType: string]: (number | string)[];
	}
Methods:
	hoveringUpdateHandler,
	registerDropElement,
	deregisterDropElement,
	draggingHandler,
	droppingHandler,
*/

describe('Drag Drop Store', () => {
	let store: any;
	beforeEach(() => {
		setActivePinia(createPinia());
		store = useDragDropStore();
	});

	// registerDropElement
	test('registers a new DropElement', () => {
		store.registerDropElement('Card', 0);
		expect(store.dropElements['Card']).toHaveLength(1);
		expect(store.dropElements['Card'][0]).toEqual(0);
		expect(store.dropElements).toHaveProperty('Card');
	});

	// deregisterDropElement
	test('deregisters a given DropElement', () => {
		const store = useDragDropStore();
		store.registerDropElement('Card', 0);
		store.registerDropElement('Card', 1);
		store.deregisterDropElement('Card', 0);
		expect(store.dropElements['Card']).toHaveLength(1);
	});

	// deregisterDropElement (when all card types are gone)
	test('removes property when all DropElements of a given type are deregistered', () => {
		const store = useDragDropStore();
		store.registerDropElement('Card', 0);
		expect(store.dropElements['Card']).toHaveLength(1);
		store.deregisterDropElement('Card', 0);
		expect(store.dropElements).not.haveOwnProperty('Card');
	});

	// hoveringUpdateHandler - Set
	test('Set hovering over variable when over correct dropArea', () => {
		store.hoveringUpdateHandler({ dropId: 'consumer', dropType: 'card' });
		expect(store.hoveringOver.dropId).toEqual('consumer');
		expect(store.hoveringOver.dropType).toEqual('card');
	});

	//  hoveringUpdateHandler - unset
	test('Set hovering over variable when over correct dropArea', () => {
		store.hoveringUpdateHandler(null);
		expect(store.hoveringOver).toEqual(null);
	});

	// draggingHandler - true
	test('Returns true when matches "hoveringOver', () => {
		store.hoveringUpdateHandler({ dropId: 'consumer', dropType: 'card' });
		expect(store.draggingHandler('card')).toEqual(true);
	});

	// draggingHandler - false
	test('Returns false when matches "hoveringOver', () => {
		store.hoveringUpdateHandler({ dropId: 'consumer', dropType: 'card' });
		expect(store.draggingHandler('wrong')).toEqual(false);
	});

	// droppingHandler - match
	test('Returns dropId when matches "hoveringOver', () => {
		store.hoveringUpdateHandler({ dropId: 'consumer', dropType: 'card' });
		expect(store.droppingHandler('card', 'hand')).toEqual('consumer');
	});

	// droppingHandler - no match
	test('Returns null when args don\'t match "hoveringOver', () => {
		store.hoveringUpdateHandler({ dropId: 'consumer', dropType: 'card' });
		expect(store.droppingHandler('card', 'consumer')).toEqual(null);
	});
});
