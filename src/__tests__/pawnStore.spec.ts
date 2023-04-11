import { setActivePinia, createPinia } from 'pinia';
import { usePawnStore } from '../stores/pawn';
import { test, describe, expect, beforeEach } from 'vitest';
import { useLogComposable } from '@/composables/logComposable';

/* STORE INFO
State:
	health: Ref<number>;
	maxHealth: Ref<number>;
	energy: Ref<number>;
	maxEnergy: Ref<number>;
Methods:
	heal,
	takeDamage,
	energize,
	useEnergy,
*/

const { log } = useLogComposable();

describe('Player Store', () => {
	let store: any;

	beforeEach(() => {
		setActivePinia(createPinia());
		store = usePawnStore();
	});

	// Initial
	test('Player starts with full health and energy', () => {
		expect(store.health).toEqual(store.maxHealth);
		expect(store.energy).toEqual(store.maxEnergy);
	});

	// takeDamage - Health left
	test('taking damages lowers players health', () => {
		expect(store.takeDamage(4)).toEqual(true);
		expect(store.health).toEqual(store.maxHealth - 4);
	});

	// takeDamage - No More Health
	test('taking damage more than maxHealth kills player', () => {
		expect(store.takeDamage(store.maxHealth + 1)).toEqual(false);
		expect(store.health).toEqual(0);
		expect(log).toHaveLength(1);
	});

	// heal - Under maxHealth
	test('healing after damage sets the players health to the correct value', () => {
		store.takeDamage(store.maxHealth - 1);
		store.heal(1);
		expect(store.health).toEqual(2);
	});

	// heal - over maxHealth
	test('healing after damage sets the players health to maxHealth', () => {
		store.takeDamage(store.maxHealth - 1);
		store.heal(store.maxHealth + 1);
		expect(store.health).toEqual(store.maxHealth);
	});

	// useEnergy - Energy left
	test('using energy lowers players energy', () => {
		expect(store.useEnergy(4)).toEqual(true);
		expect(store.energy).toEqual(store.maxEnergy - 4);
	});

	// useEnergy - No More Energy
	test('Trying to use energy more than maxEnergy fails use any', () => {
		expect(store.useEnergy(store.maxEnergy + 1)).toEqual(false);
		expect(store.energy).toEqual(store.maxEnergy);
		expect(log).toHaveLength(2);
	});

	// energize - Under maxEnergy
	test('Energizing sets the players energy to the correct value', () => {
		store.useEnergy(store.maxEnergy - 1);
		store.energize(1);
		expect(store.energy).toEqual(2);
	});

	// energize - over maxEnergy
	test('Energizing over maxEnergy sets the players energy to maxEnergy', () => {
		store.useEnergy(store.maxEnergy - 1);
		store.energize(store.maxEnergy + 1);
		expect(store.energy).toEqual(store.maxEnergy);
	});
});
