import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './router'

const router = createBrowserRouter(routes)

export const App = () => <RouterProvider router={router} />
