import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const faqFromFile = createTool({
  id: 'Get Faq Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the FAQ information from a file`,
  execute: async () => {
    const filePath = join(__dirname, '../../src/mastra/texts/faq.txt')
    const contents = fs.readFileSync(filePath, 'utf8')

    return {
      contents: contents ? contents : 'No faq found.',
    }
  },
})
