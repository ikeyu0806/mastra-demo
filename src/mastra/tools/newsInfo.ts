import { createTool } from '@mastra/core/tools'
import { z } from 'zod'
import axios from 'axios'

export const newsInfo = createTool({
  id: 'Get News Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the current news information for a given query`,
  execute: async ({ context: { query } }) => {
    console.log('Using tool to fetch news information for', query)

    const now = new Date()
    now.setDate(now.getDate() - 1)

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // 月は0始まり
    const day = String(now.getDate()).padStart(2, '0')

    const from = `${year}-${month}-${day}`

    const endpoint = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
    const response = await axios.get(endpoint)

    const articles = response.data.articles
    const contents = articles
      .map((article: { title: string; url: string }) => {
        return `${article.title} ${article.url}`
      })
      .join('\n')
    return {
      contents: contents ? contents : 'No news found for the given query.',
    }
  },
})
