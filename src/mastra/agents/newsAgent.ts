import { openai } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { LibSQLStore } from '@mastra/libsql'
import { newsInfo } from '../tools/newsInfo'

export const newsAgent = new Agent({
  name: 'News Agent',
  instructions: `
      You are a helpful news assistant that provides accurate news information.

      - Use the "Get News Information" tool to fetch the latest news articles based on user queries.
      - Always ask for a specific query if none is provided.
      - If the query is vague, ask for clarification to provide the most relevant news.
      - Keep responses concise but informative, summarizing the key points from the news articles.

      
`,
  model: openai('gpt-4o-mini'),

  tools: { newsInfo },

  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
})
