import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthApi } from '../../../api/AuthAPI'
import { User } from '../../../types'

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
  initialState,
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

export const authReducer = authSlice.reducer
