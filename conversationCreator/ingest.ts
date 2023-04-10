import type { ChoicePromptOptions, PromptChoice } from '../src/stores/prompt';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import * as zod from 'zod';

const zConversationData = zod.array(zod.array(zod.string()));

export type Conversation = {
	name: string;
	title?: string;
	prompt?: ChoicePromptOptions;
};

const getRowDetails = (row: string[]) => {
	const firstDataIndex = row.findIndex((v) => v);
	if (firstDataIndex === -1) return null; // empty line
	const promptIndex = Math.ceil(firstDataIndex / 2) - 1;
	const rowType = firstDataIndex % 2 === 0 ? 'choice' : 'message';
	return { promptIndex, rowType, data: row[firstDataIndex], result: row[firstDataIndex + 1] };
};

const conversations: Conversation[] = [];
readdirSync('.')
	.filter((item) => extname(item) === '.tsv')
	.map((conversationFile) => readFileSync(conversationFile, { encoding: 'utf8' }))
	.map((tsvData) => tsvData.split('\n').map((row) => row.split('\t').map((value) => value.trim())))
	.map((rows) => {
		// Assert the data as string[][]
		const result = zConversationData.parse(rows);

		// Format rows to all be the same length
		const maxRowLength = rows.reduce((max, row) => Math.max(max, row.length), 0);
		rows.forEach((row) => {
			while (row.length < maxRowLength) row.push('');
		});

		let currentConversation: Conversation | null = null;
		const promptStack: ChoicePromptOptions[] = [];
		let currentChoice: PromptChoice | null = null;
		result.forEach((row, i) => {
			if (row[0]) {
				if (currentConversation) conversations.push(currentConversation);
				const [name, title] = row[0].split('__');
				currentConversation = {
					name,
					title,
				};
				promptStack.length = 0;
				currentChoice = null;
				return;
			}
			if (!currentConversation)
				throw Error(i + ': found non conversation row when there was no active conversation');

			const rowDetails = getRowDetails(row);
			if (rowDetails === null) return;
			const { promptIndex, rowType, data, result } = rowDetails;
			if (rowType === 'message') {
				const prompt = {
					message: data,
					title: currentConversation.title,
					choices: [],
				};
				if (currentChoice && currentChoice.result === '') {
					currentChoice.result = prompt;
				} else if (!currentChoice) {
					currentConversation.prompt = prompt;
				}
				promptStack.push(prompt);
			} else if (rowType === 'choice') {
				if (promptStack.length === 0)
					throw Error(i + ': discovered choice without discovering a prompt message');
				if (promptIndex !== promptStack.length - 1) {
					const deleteIndex = promptIndex + 1;
					promptStack.splice(deleteIndex, promptStack.length - deleteIndex);
				}
				const choice: PromptChoice = {
					text: data,
					result,
				};
				promptStack[promptIndex]!.choices.push(choice);
				currentChoice = choice;
			} else {
				throw Error(i + ': invalid conversation row type');
			}
		});
		if (currentConversation) conversations.push(currentConversation);
	});

writeFileSync('../src/assets/conversations.json', JSON.stringify(conversations, undefined, 4), {
	encoding: 'utf8',
});
console.log(`${conversations.length} conversations ingested`);
