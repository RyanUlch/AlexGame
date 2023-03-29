import { setActivePinia, createPinia } from 'pinia';
import { ref } from 'vue';
import { useDragDropStore } from '../stores/dragStore';
import { test, describe, expect, beforeEach, expectTypeOf } from 'vitest';
import type { Ref } from 'vue';
describe('Drag Drop Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	describe('registerDropElement', () => {
		test('registers a new DropElement', () => {
			const store = useDragDropStore();
			store.registerDropElement('Card', 0);
			expect(store.dropElements['Card']).toHaveLength(1);
		});

		test('newly registered DropElement contains correct info', () => {
			const store = useDragDropStore();
			store.registerDropElement('Card', 0);
			expect(store.dropElements['Card'][0]).toEqual(0);
		});

		test.fails('there is no elements on initialization', () => {
			const store = useDragDropStore();
			expect(store.dropElements).toHaveProperty('Card');
		});
	});

	describe('deregisterDropElement', () => {
		test('deregisters a given DropElement', () => {
			const store = useDragDropStore();
			store.registerDropElement('Card', 0);
			store.registerDropElement('Card', 1);
			expect(store.dropElements['Card']).toHaveLength(2);
			store.deregisterDropElement('Card', 0);
			expect(store.dropElements['Card']).toHaveLength(1);
		});

		test('removes property when all DropElements of a given type are deregistered', () => {
			const store = useDragDropStore();
			store.registerDropElement('Card', 0);
			expect(store.dropElements['Card']).toHaveLength(1);
			store.deregisterDropElement('Card', 0);
			expect(store.dropElements).not.haveOwnProperty('Card');
		});
	});
});
