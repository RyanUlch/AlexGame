import { reactive, ref, computed } from 'vue';

export type LogLine = {
	line: string;
	dev?: boolean;
};

// log array contains all logs lines. Can be exported to file or saved in storage
const log = reactive<LogLine[]>([]);
// Which line to start log (after the log is cleared - log isn't deleted, just shows lines after clearing)
const readFromLine = ref(0);
// Composable handling UpdateLog
export const useLogComposable = () => {
	const addLogLine = (line: string, dev: boolean = false) => {
		log.unshift({ line: line, dev: dev });
	};
	const addLogLines = (lines: LogLine[]) => {
		lines.forEach((logLine) => {
			log.unshift({ line: logLine.line, dev: logLine.dev ? logLine.dev : false });
		});
	};
	// Empty log window of all lines, full log is still available
	const clear = () => {
		readFromLine.value = log.length;
	};
	// Used in tests - should not be used in production code
	const emptyLog = () => {
		log.length = 0;
	};

	const logLines = computed(() => {
		if (import.meta.env.DEV) {
			return log;
		}
		return log.filter((lineObj) => lineObj.dev === false);
	});

	return {
		// Called in UpdateLog Component
		log,
		logLines,
		readFromLine,
		clear,
		// Called from everywhere in game to update log
		addLogLine,
		addLogLines,
		// Called only in tests
		emptyLog,
	};
};
