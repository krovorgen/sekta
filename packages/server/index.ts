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
import { checkAuth } from './src/middlewares/checkAuth'
import { themeRoutes } from './src/routes/theme-routes'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
  await createClientAndConnect()
  const app = express()

  app.use(cookieParser(), cors())

  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined
  const appPath = isDev() ? '' : './'
  const distPath = path.dirname(
    require.resolve(appPath + 'client/dist/index.html')
  )
  const srcPath = path.dirname(require.resolve(appPath + 'client'))
  const ssrClientPath = require.resolve(appPath + 'client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })
    require.extensions['.css'] = () => undefined
    app.use(vite.middlewares)
  }

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

  app.use(express.json())

  app.use('/api', checkAuth, topicRouter)
  app.use('/api', checkAuth, commentsRoutes)
  app.use('/api', checkAuth, themeRoutes)

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

      let render: (url: string, state: unknown) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')))
          .render
      }

      const initialState = await loadState(req)

      const appHtml = await render(url, initialState)

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

  const app2 = express()
  // запускаем второй сервер для редиректа
  // так как у нас oauth.yandex.ru настроен с redirect_uri=http://localhost:3000
  app2.use('*', (req, res) => {
    res.redirect(`http://localhost:3001${req.originalUrl}`)
  })

  app2.listen(3000, () => {
    console.log(`Server 2 is listening on port: 3000`)
  })
}

startServer()
