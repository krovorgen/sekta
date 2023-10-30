import React from 'react'
import type * as express from 'express'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { routes } from './src/router'
import { store } from './src/redux/store'

export async function render(request: express.Request) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const remixRequest = createFetchRequest(request)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  return renderToString(
    <Provider store={store}>
      <StaticRouterProvider router={router} context={context} />
    </Provider>
  )
}

// из документации react router dom v6 ssr
function createFetchRequest(req: express.Request): Request {
  const origin = `${req.protocol}://${req.get('host')}`

  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
