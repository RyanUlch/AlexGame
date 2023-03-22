import { describe, test, expect, beforeEach } from 'vitest';
import { useLogComposable } from '@/composables/logComposable';
describe('Update Log', () => {
	let composable: any;

	beforeEach(() => {
		composable = useLogComposable();
		composable.emptyLog();
	});

	test('displays no log on initialization', () => {
		expect(composable.log.value.length).toEqual(0);
	});

	test('add line to log', () => {
		composable.addLogLine('Testing Line');
		test('log contains one element', () => {
			expect(composable.log.value.length).toEqual(1);
		});
		test('singular line reads "Testing Line"', () => {
			expect(composable.log.value[0]).toEqual('Testing Line');
		});
	});

	test('clear log display, but keep log in memory', () => {
		composable.addLogLine('Testing Line');
		composable.clear();
		expect(composable.readFromLine.value).toEqual(1);
	});
});
