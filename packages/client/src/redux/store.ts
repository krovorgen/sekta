import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AuthState, authReducer } from './features/auth/authSlice'

export const createStore = (initialState?: { auth: AuthState }) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: initialState,
  })
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
