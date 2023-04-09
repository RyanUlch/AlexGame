## To Use

- use the template found here (you can add to this file or make your own): https://docs.google.com/spreadsheets/d/1DoEhjqB9NokO3FcHrz6oCpHxebqiP4SBOd5pFj0e5-A/edit?usp=sharing
- export as TSV
- place TSV file(s) in @/src/conversations
- install ts-node if necessary
  - `npm i -g ts-node`
- run the ingest script with ts-node
  - `ts-node src/conversations/ingest.ts`
  - this will update `@/assets/conversations.json`
- you can now do this:

```javascript
import { usePromptStore } from '@/stores/prompt.ts';

// Promise.then
usePromptStore().doConversation('conversation name').then(console.log);

// await
const { result } = await usePromptStore().doConversation('conversation name');
```
