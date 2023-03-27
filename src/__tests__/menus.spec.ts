import { describe, test, expect, beforeEach } from 'vitest';
import { useMenuStore } from '../stores/menus';
import { storeToRefs, setActivePinia, createPinia } from 'pinia';

describe('menus store', () => {
	let store: any;
	// const { settingsMenuIsOpen } = storeToRefs(useMenuStore());
	beforeEach(() => {
		setActivePinia(createPinia());
		store = useMenuStore();
	});

	test('settings menu is initially closed', () => {
		expect(store.settingsMenuIsOpen).equals(false);
	});

	test('settings menu is open after function call', () => {
		store.openSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(true);
	});

	test('settings menu is closed after function call', () => {
		store.openSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(true);
		store.closeSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(false);
	});
});
