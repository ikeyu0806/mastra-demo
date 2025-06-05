import * as fs from 'fs'

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const faqInfo = createTool({
  id: 'Get Faq Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the current faq information for a given query`,
  execute: async ({ context: { query } }) => {
    const filePath = '../../mastra/texts/faq.txt'
    const contents = fs.readFileSync(filePath, 'utf8')

    return {
      contents: contents ? contents : 'No faq found for the given query.',
    }
  },
})
