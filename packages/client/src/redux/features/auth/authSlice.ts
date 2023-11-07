import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { AuthApi } from '../../../api/AuthAPI'
import { User } from '../../../types'
import { RootState } from '../../store'

export type AuthState = {
  user: User | null
  loadingStatus: 'idle' | 'loaded' | 'error'
}

const initialState: AuthState = {
  user: null,
  loadingStatus: 'idle',
}

export const getUserTC = createAsyncThunk('auth/getUser', async () => {
  return await AuthApi.read()
})

export const logoutTC = createAsyncThunk('auth/logout', async () => {
  await AuthApi.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: () => initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserTC.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.loadingStatus = 'loaded'
      })
      .addCase(getUserTC.rejected, state => {
        state.loadingStatus = 'error'
      })
      .addCase(logoutTC.fulfilled, state => {
        state.user = null
      })
  },
})

export const authSelector = (state: RootState) => state.auth

export const userLoadingStatusSelector = createSelector(
  authSelector,
  state => state.loadingStatus
)

export const authReducer = authSlice.reducer
