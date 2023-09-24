import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import './scss/index.scss'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
