import { describe, test, expect, beforeEach } from 'vitest';
import { useSettingsStore } from '../stores/settings';
import { setActivePinia, createPinia } from 'pinia';

// Note: Settings store is most likely to change during game development, new tests will most likely need to be added as development continues

/* STORE INFO
State:
	settingsMenuIsOpen: Ref<boolean>

Methods:
	openSettingsMenu,
	closeSettingsMenu,
*/

describe('Settings Store', () => {
	let store: any;
	beforeEach(() => {
		setActivePinia(createPinia());
		store = useSettingsStore();
	});

	// Initial
	test('settings menu is initially closed', () => {
		expect(store.settingsMenuIsOpen).equals(false);
	});

	// openSettingsMenu
	test('settings menu is open after function call', () => {
		store.openSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(true);
	});

	// closeSettingsMenu
	test('settings menu is closed after function call', () => {
		store.openSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(true);
		store.closeSettingsMenu();
		expect(store.settingsMenuIsOpen).toEqual(false);
	});
});
