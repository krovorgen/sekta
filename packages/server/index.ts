import dotenv from 'dotenv'
import cors from 'cors'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

import cookieParser from 'cookie-parser'
import { createProxyMiddleware } from 'http-proxy-middleware'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import jsesc from 'jsesc'
import { loadState } from './preload'
import { createClientAndConnect } from './db'
import { topicRouter } from './src/routes/topic-router'
import { commentsRoutes } from './src/routes/comments-router'

// GET /forum/topic
// POST /forum/topic (body)
// GET /forum/topic/:id
//
// GET /forum/comment/?id_topic=123
//   POST /forum/comment (body)
// GET /forum/comment/:id
const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  await createClientAndConnect()
  const app = express()

  app.use(express.json())
  app.use(cookieParser(), cors())

  const port = Number(process.env.SERVER_PORT) || 3000

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    require.extensions['.css'] = () => undefined
    app.use(vite.middlewares)
  }

  app.use('/api', topicRouter)
  app.use('/api', commentsRoutes)

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  )

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use(express.static(path.resolve(srcPath, 'ssr-dist')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: (url: string) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const initialState = await loadState(req)

      const appHtml = await render(url)

      const initStateSerialized = jsesc(JSON.stringify(initialState), {
        json: true,
        isScriptContext: true,
      })

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--store-data-->', initStateSerialized)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
