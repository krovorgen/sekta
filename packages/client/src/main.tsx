import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './App'
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from 'react-router-dom'
import { createStore } from './redux/store'
import { Provider } from 'react-redux'

const store = (window as any).initialState

delete (window as any).initialState

hydrate()

async function hydrate() {
  // Determine if any of the initial routes are lazy
  // let lazyMatches = matchRoutes(routes, window.location)?.filter(
  //   (m) => m.route.lazy
  // );

  // Load the lazy matches and update the routes before creating your router
  // so we can hydrate the SSR-rendered content synchronously
  // if (lazyMatches && lazyMatches?.length > 0) {
  //   await Promise.all(
  //     lazyMatches.map(async (m) => {
  //       let routeModule = await m.route.lazy!();
  //       Object.assign(m.route, { ...routeModule, lazy: undefined });
  //     })
  //   );
  // }

  const container = document.getElementById('root') as HTMLElement

  hydrateRoot(
    container,
    <React.StrictMode>
      <Provider store={createStore(store)}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(registration => {
//         console.log(
//           'ServiceWorker registration successful with scope: ',
//           registration.scope
//         )
//       })
//       .catch((error: string) => {
//         console.log('ServiceWorker registration failed: ', error)
//       })
//   })
// }
