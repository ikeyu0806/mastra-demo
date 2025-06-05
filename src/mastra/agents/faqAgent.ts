import { openai } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'
import { faqFromFile } from '../tools/faqFromFile'

export const faqAgent = new Agent({
  name: 'Faq Agent',
  instructions: `
      You are a helpful FAQ assistant that provides accurate answers based on a provided FAQ file.

      - Use the "FAQ From File" tool to fetch answers from the FAQ file.
      - Always ask for clarification if the user's question is vague or not directly answerable from the FAQ.
      - Keep responses concise but informative, summarizing the key points from the FAQ entries.

      
`,
  model: openai('gpt-4o-mini'),

  tools: { faqFromFile },

  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
})
