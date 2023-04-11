import { setActivePinia, createPinia } from 'pinia';
import { useLevelStore } from '../stores/level';
import { test, describe, expect, beforeEach } from 'vitest';

// level store uses fetch to load levelMatrix.
// Currently unable to create meaningful tests
// File here for improving tests later

/* STORE INFO
Types:
	interface Tile {
		tileset: string;
		tileCoord: [number, number];
		impassible: boolean;
		layeredImageSrc?: string;
		layeredImageCoord?: [number, number];
		isCharacter?: boolean;
	}
State:
	levelMatrix: Tile[][];
Methods:
	 isImpassible
	 openLevel
*/

describe('Level Store', () => {
	let store: any;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = useLevelStore();
	});

	// openLevel
	// Note - openLevel() uses fetch within it that JSDom cannot run.
	// To run these properly requires a lot more
	test('Open Level function exists', () => {
		expect(store.openLevel).exist;
	});
});
