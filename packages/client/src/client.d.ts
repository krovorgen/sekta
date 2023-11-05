import { RootState } from './redux/store'

declare global {
  const __SERVER_PORT__: number

  interface Window {
    initialState?: RootState
  }
}
