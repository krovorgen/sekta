import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import './scss/index.scss'
import { Provider } from 'react-redux'
import { store } from './redux/store'

hydrate()

async function hydrate() {
  const container = document.getElementById('root') as HTMLElement

  hydrateRoot(
    container,
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
}
