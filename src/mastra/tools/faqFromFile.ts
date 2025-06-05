import * as fs from 'fs'

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

export const faqFromFile = createTool({
  id: 'Get Faq Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the FAQ information from a file`,
  execute: async () => {
    const filePath = '../../mastra/texts/faq.txt'
    const contents = fs.readFileSync(filePath, 'utf8')

    return {
      contents: contents ? contents : 'No faq found.',
    }
  },
})
