import { reactive, ref } from 'vue';

// log array contains all logs lines. Can be exported to file or saved in storage
let log = reactive<{line: string, dev: boolean}[]>([]);
// Which line to start log (after the log is cleared - log isn't deleted, just shows lines after clearing)
const readFromLine = ref(0);

// Composable handling UpdateLog
export const useLogComposable = () => {
	const addLogLine = (line: string, dev: boolean = false) => log.unshift({line: line, dev: dev});

	// Empty log window of all lines, full log is still available
	const clear = () => readFromLine.value = log.length;
	// Used in tests - should not be used in production code
	const emptyLog = () => log.length = 0;

	return {
		// Called in UpdateLog Component
		log,
		readFromLine,
		clear,
		// Called from everywhere in game to update log
		addLogLine,
		// Called only in tests
		emptyLog,
	};
};
