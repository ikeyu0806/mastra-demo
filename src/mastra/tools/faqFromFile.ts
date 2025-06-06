import * as fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

// この方法は ESモジュール ("type": "module" を package.json に書いてる or .mts 拡張子使用) でローカルファイルのパスを取得するためのものです。
// CommonJS では __dirname が使えますが、ESモジュールでは使えないので、代わりに fileURLToPath と dirname を使います。
// もしあなたのプロジェクトが CommonJS を使っている場合は、以下の行を削除して、代わりに __dirname を使ってください。
// CommonJS（.cjsやrequire()を使ってる）なら __dirname が使えます。
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const faqFromFile = createTool({
  id: 'Get Faq Information',
  inputSchema: z.object({
    query: z.string(),
  }),
  description: `Fetches the FAQ information from a file`,
  execute: async () => {
    const filePath = join(__dirname, '../../../src/mastra/texts/faq.txt')
    const contents = fs.readFileSync(filePath, 'utf8')

    return {
      contents: contents ? contents : 'No faq found.',
    }
  },
})
