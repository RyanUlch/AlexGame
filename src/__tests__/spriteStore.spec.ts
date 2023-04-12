import { setActivePinia, createPinia } from 'pinia';
import { useSpriteStore } from '../stores/sprite';
import { test, describe, expect, beforeEach } from 'vitest';

/* STORE INFO
State:
	spriteList,
	characterPosition,
	characterId,
	screenPosition,
	scale,
	screenSize,
	gridCellSize,
Methods:
	playerMoveListener,
	playerInteract,
	teleportPlayer
	registerSprite,
	deregisterSprite,
	cleanupSprites,
*/

describe('Sprite Store', () => {
	let store: any;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = useSpriteStore();
	});

	// registerSprite
	test('registers spirit to interact with', () => {
		store.registerSprite(false, [-1, -1, 'n'], () => {});
		expect(store.spriteList).toHaveLength(1);
	});

	// deregisterSprite
	test('deregisters specific spirit to interact with', () => {
		store.registerSprite(false, [-1, -1, 'n'], () => {});
		store.deregisterSprite(0);
		expect(store.spriteList).toHaveLength(0);
	});

	// cleanupSprites
	test('Remove all sprites (used to clean up level for new load)', () => {
		store.registerSprite(false, [-1, -1, 'n'], () => {});
		store.registerSprite(true, [-1, -1, 'n'], () => {});
		store.cleanupSprites();
		expect(store.spriteList).toHaveLength(0);
	});

	// teleportPlayer
	test('Teleport player to specific cell and direction', () => {
		store.teleportPlayer([5, 5, 'n']);
		expect(store.characterPosition).toEqual([5, 5, 'n']);
	});

	// playerMoveListener
	/* 
		Note: 	currently cannot test playerMoveListener due to the reliance of fetch
				in levelStore. Should come up with tests eventually.
	*/

	// playerInteract - true
	test('Player can interact with a sprite if in the correct position', () => {
		store.teleportPlayer([0, 0, 's']);
		store.registerSprite(false, [1, 0, 'n'], () => {
			return true;
		});
		expect(store.playerInteract()).toEqual(true);
	});

	// playerInteract - false
	test('Player does not interact with sprites if not in the correct position', () => {
		store.teleportPlayer([7, 2, 'n']);
		store.registerSprite(false, [1, 0, 'n'], () => {
			return true;
		});
		expect(store.playerInteract()).toEqual(false);
	});
});
