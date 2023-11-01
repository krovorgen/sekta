import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/index.scss'
import { AppWithoutRedux } from './AppWithoutRedux'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <AppWithoutRedux />
    </BrowserRouter>
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
