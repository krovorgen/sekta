import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { AppWithoutRedux } from './src/AppWithoutRedux'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export const render = (url: string) => {
  console.log(url)
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <AppWithoutRedux />
      </StaticRouter>
    </Provider>
  )
}
