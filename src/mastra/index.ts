import { Mastra } from '@mastra/core/mastra'
import { PinoLogger } from '@mastra/loggers'

import { weatherAgent } from './agents/weatherAgent'
import { mcpAgent } from './agents/mcpAgent'
import { newsAgent } from './agents/newsAgent'
import { faqAgent } from './agents/faqAgent'
import { VercelDeployer } from '@mastra/deployer-vercel'

export const mastra = new Mastra({
  agents: { weatherAgent, mcpAgent, newsAgent, faqAgent },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  // 以下追加
  server: {
    middleware: [
      {
        handler: async (c, next) => {
          const authHeader = c.req.header('Authorization')
          console.log('Authorization Header:', authHeader)
          if (!authHeader) {
            return new Response('Unauthorized', { status: 401 })
          }

          await next()

          // CORS
          c.res.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
        },
        path: '/api/*',
      },
      async (c, next) => {
        console.log(`${c.req.method} ${c.req.url} ${c.req.header}`)
        await next()
      },
    ],
  },
  deployer: new VercelDeployer(),
})
