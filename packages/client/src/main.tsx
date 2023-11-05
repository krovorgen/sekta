import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import { App } from './App'
import { Provider } from 'react-redux'
import { createStore } from './redux/store'

const initialState = window.initialState

delete window.initialState

const store = createStore(JSON.parse(initialState ?? '{}'))

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
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
