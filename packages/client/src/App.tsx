import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { routes } from './router'

const router = createBrowserRouter(createRoutesFromElements(routes))

export const App = () => <RouterProvider router={router} />
