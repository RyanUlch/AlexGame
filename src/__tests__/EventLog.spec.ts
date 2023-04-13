import { describe, test, expect, beforeEach } from 'vitest';
import { useLogComposable } from '../composables/logComposable';

/* STORE INFO
State:
	log,
	logLines,
	readFromLine,
Methods:
	clear,
	addLogLine,
	addLogLines,
	emptyLog,
*/

describe('Event Log', () => {
	let composable: any;

	beforeEach(() => {
		composable = useLogComposable();
		composable.emptyLog();
	});

	// Initial
	test('displays no log on initialization', () => {
		expect(composable.log.length).toEqual(0);
	});

	// addLogLine
	test('adds one log line, log then contains one element, with the correct line string', () => {
		composable.addLogLine('Testing Line');
		expect(composable.log.length).toEqual(1);
		expect(composable.log[0].line).toEqual('Testing Line');
		expect(composable.log[0].dev).toEqual(false);
	});

	// addLogLine - dev
	test('add one log line as dev', () => {
		composable.addLogLine('Testing Dev Line', true);
		expect(composable.log[0].dev).toEqual(true);
	});

	// addLogLines
	test('log contains 3 lines', () => {
		composable.addLogLines([
			{ line: 'Testing Line 1' },
			{ line: 'Testing Line 2' },
			{ line: 'Testing Line 3', dev: true },
		]);
		expect(composable.log.length).toEqual(3);
	});

	// addLogLines
	test('multiple logs are added in the correct order', () => {
		composable.addLogLines([
			{ line: 'Testing Line 1' },
			{ line: 'Testing Line 2' },
			{ line: 'Testing Line 3', dev: true },
		]);
		expect(composable.log[0].line).toEqual('Testing Line 3');
		expect(composable.log[1].line).toEqual('Testing Line 2');
		expect(composable.log[2].line).toEqual('Testing Line 1');
	});

	// addLogLines
	test('adding multiple log sets dev lines separately when provided', () => {
		composable.addLogLines([
			{ line: 'Testing Line 1' },
			{ line: 'Testing Line 2' },
			{ line: 'Testing Line 3', dev: true },
		]);
		expect(composable.log[0].dev).toEqual(true);
		expect(composable.log[1].dev).toEqual(false);
		expect(composable.log[2].dev).toEqual(false);
	});

	// clear
	test('clear log display, but keep log in memory', () => {
		composable.addLogLine('Testing Line');
		composable.clear();
		expect(composable.readFromLine.value).toEqual(1);
	});

	// emptyLog
	test('Remove all log lines', () => {
		composable.addLogLines([
			{ line: 'Testing Line 1' },
			{ line: 'Testing Line 2' },
			{ line: 'Testing Line 3', dev: true },
		]);
		composable.emptyLog();
		expect(composable.log).toHaveLength(0);
	});
});
