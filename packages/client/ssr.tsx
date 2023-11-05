import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppWithoutRedux } from './src/AppWithoutRedux'
import { Provider } from 'react-redux'
import { createStore } from './src/redux/store'

export const render = async (url: string) => {
  return renderToString(
    <Provider store={createStore()}>
      <StaticRouter location={url}>
        <AppWithoutRedux />
      </StaticRouter>
    </Provider>
  )
}
