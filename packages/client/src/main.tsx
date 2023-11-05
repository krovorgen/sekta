import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import { AppWithoutRedux } from './AppWithoutRedux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from './redux/store'

const initialState = window.initialState

delete window.initialState

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={createStore(initialState)}>
      <BrowserRouter>
        <AppWithoutRedux />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// использовать когда будет ssr && redux
// ReactDOM.hydrateRoot(
//   document.getElementById('root') as HTMLElement,
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// )
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
