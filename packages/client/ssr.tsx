import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppWithoutRedux } from './src/AppWithoutRedux'
import { Provider } from 'react-redux'
import { RootState, createStore } from './src/redux/store'

export const render = async (url: string, data?: RootState) => {
  return renderToString(
    <Provider store={createStore(data)}>
      <StaticRouter location={url}>
        <AppWithoutRedux />
      </StaticRouter>
    </Provider>
  )
}
