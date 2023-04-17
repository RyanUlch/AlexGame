import type { ChoicePromptOptions, PromptChoice } from '../src/stores/prompt';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { extname } from 'path';
import * as zod from 'zod';

const zConversationData = zod.array(zod.array(zod.string()));

export type Conversation = {
	name: string;
	title?: string;
	imgSrc?: string;
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

		// These will track where we are as we parse the rows
		let currentConversation: Conversation | null = null;
		const promptStack: ChoicePromptOptions[] = [];
		let currentChoice: PromptChoice | null = null;

		// Loop over rows of TSV
		result.forEach((row, i) => {
			const error = (message: string) => {
				throw Error(`row ${i + 1}: ${message}`);
			};
			if (row[0]) {
				// Current conversation ended, track it
				if (currentConversation) conversations.push(currentConversation);

				// Parse the "title__imgSrc__name" ("name" also valid without separators)
				const split = row[0].split('__');
				const name = split.pop();
				if (!name) error('conversation must define a name');
				if (conversations.some((c) => c.name === name))
					error('conversations must have unique names');
				const imgSrc = split.pop();
				const title = split.pop();
				if (!!imgSrc !== !!title) error('either imgSrc and title or neither must be provided');

				// Create new conversation and intialize prompt/choice data
				currentConversation = {
					name: name!,
					title,
					imgSrc,
				};
				promptStack.length = 0;
				currentChoice = null;
				return;
			}
			console.log(currentConversation);
			// Ensure we found a conversation row before a message/choice row
			if (!currentConversation)
				error(i + ': found non conversation row when there was no active conversation');

			// Get details about this row
			const rowDetails = getRowDetails(row);
			if (rowDetails === null) return;
			const { promptIndex, rowType, data, result } = rowDetails;

			// Handle message or choice row
			if (rowType === 'message') {
				// Parse message like "title__imgSrc__message" or "message" without separators
				const split = data.split('__');
				const message = split.pop();
				const imgSrc = split.pop();
				const title = split.pop();

				// Create new prompt
				const prompt = {
					message,
					imgSrc: imgSrc ?? currentConversation!.imgSrc,
					title: title ?? currentConversation!.title,
					choices: [],
				};

				if (currentChoice && currentChoice.result === '') {
					// If previous choice didn't have a result, this prompt is the result of that choice
					currentChoice.result = prompt;
				} else if (!currentChoice) {
					// If there hasn't been any choices yet, this must be the root prompt for the conversation
					currentConversation!.prompt = prompt;
				}

				// Track this prompt
				promptStack.push(prompt);
			} else if (rowType === 'choice') {
				// Ensure we haven't discovered a choice row before creating a prompt to contain it
				if (promptStack.length === 0)
					error(i + ': discovered choice without discovering a prompt message');

				// If this choice doesn't belong to the most recent prompt, remove all prompts
				// after the one it does belong to.  This happens when two choice rows
				// belonging to different prompts are consecutive (because of nesting)
				if (promptIndex !== promptStack.length - 1) {
					const deleteIndex = promptIndex + 1;
					promptStack.splice(deleteIndex, promptStack.length - deleteIndex);
				}

				// Create choice and track it in both the current prompt and as the current choice
				const choice: PromptChoice = {
					text: data,
					result,
				};
				promptStack[promptIndex]!.choices.push(choice);
				currentChoice = choice;
			} else {
				error(i + ': invalid conversation row type');
			}
		});

		// Track the final conversation
		if (currentConversation) conversations.push(currentConversation);
	});

writeFileSync(
	'../src/assets/conversations/conversations.json',
	JSON.stringify(conversations, undefined, 4),
	{
		encoding: 'utf8',
	},
);
console.log(`${conversations.length} conversations ingested`);
