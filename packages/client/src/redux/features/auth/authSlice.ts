import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthApi } from '../../../api/AuthAPI'
import { User } from '../../../types'

type AuthState = {
  user: User | null
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
  reducers: {
    setNewUserInfo: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserTC.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload
      })
      .addCase(logoutTC.fulfilled, state => {
        state.user = null
      })
  },
})

export const { setNewUserInfo } = authSlice.actions

export const authReducer = authSlice.reducer
