import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { routes } from './src/router/index'
import { Provider } from 'react-redux'
import { createStore } from './src/redux/store'
import { Routes } from 'react-router-dom'

export const render = async (url: string) => {
  return renderToString(
    <Provider store={createStore()}>
      <StaticRouter location={url}>
        <Routes children={routes} />
      </StaticRouter>
    </Provider>
  )
}
