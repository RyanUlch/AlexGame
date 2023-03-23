import { describe, test, expect, beforeEach } from 'vitest';
import type { Ref } from 'vue';
import { useLogComposable } from '@/composables/logComposable';
import type { logLine } from '@/composables/logComposable';
describe('Event Log', () => {
	let composable: {
		log: logLine[];
		readFromLine: Ref<number>;
		clear: () => number;
		addLogLine: (line: string, dev?: boolean) => number;
		addLogLines: (lines: logLine[]) => void;
		emptyLog: () => number;
	};

	beforeEach(() => {
		composable = useLogComposable();
		composable.emptyLog();
	});

	test('displays no log on initialization', () => {
		expect(composable.log.length).toEqual(0);
	});

	test('add line to log', () => {
		composable.addLogLine('Testing Line');
		test('log contains one element', () => {
			expect(composable.log.length).toEqual(1);
		});
		test('singular line reads "Testing Line"', () => {
			expect(composable.log[0]).toEqual('Testing Line');
		});
	});

	// describe('add multiple lines to log', () => {
		
	test('log contains 3 lines', () => {
		
	})

		// ]);
		test('log contains 3 lines', () => {
			console.log(composable);
		composable.addLogLines([
			{ line: 'Testing Line 1' },
			{ line: 'Testing Line 2' },
			{ line: 'Testing Line 3', dev: true },
			expect(composable.log.length).toEqual(3);
		});
		test('all lines are in the correct order', () => {
			expect(composable.log[0].line).toEqual('Testing Line 3');
			expect(composable.log[1].line).toEqual('Testing Line ');
			expect(composable.log[2].line).toEqual('Testing Line 1');
		});
		test('first two lines are general, the last one is dev only', () => {
			expect(composable.log[0].dev).toEqual(false);
			expect(composable.log[1].dev).toEqual(false);
			expect(composable.log[2].dev).toEqual(true);
		});
	// });

	test('clear log display, but keep log in memory', () => {
		composable.addLogLine('Testing Line');
		composable.clear();
		expect(composable.readFromLine.value).toEqual(1);
	});
});
