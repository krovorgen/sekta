import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authReducer } from './features/auth/authSlice'

export function createStore(initialState?: any) {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  })
}

type StoreType = ReturnType<typeof createStore>

export type AppDispatch = StoreType['dispatch']
export type RootState = ReturnType<StoreType['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
