import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthApi } from '../../../api/AuthAPI'
import { User } from '../../../types'

type AuthState = {
  user: User | null
  init?: boolean
}

const initialState: AuthState = {
  user: null,
}

export const getUserTC = createAsyncThunk('auth/getUser', async () => {
  return await AuthApi.read()
})

export const logoutTC = createAsyncThunk('auth/logout', async () => {
  return await AuthApi.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserTC.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
        state.init = true
      })
      .addCase(logoutTC.fulfilled, state => {
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer
