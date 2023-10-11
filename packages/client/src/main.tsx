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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}
