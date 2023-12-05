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
  theme: string
}

const initialState: AuthState = {
  user: null,
  loadingStatus: 'idle',
  theme: 'light',
}

type GetUserResponse = { user: User; theme: string }

export const getUserTC = createAsyncThunk<
  GetUserResponse,
  void,
  { state: RootState }
>('auth/getUser', async (_, { getState }) => {
  const { auth } = getState()
  return await AuthApi.read(auth.theme)
})

export const updateUserTheme = createAsyncThunk(
  'theme',
  async (value: { id: number; theme: string }) => {
    return await AuthApi.updateTheme(value)
  }
)

export const logoutTC = createAsyncThunk('auth/logout', async () => {
  await AuthApi.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: () => initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getUserTC.fulfilled,
        (state, action: PayloadAction<GetUserResponse>) => {
          state.user = action.payload.user
          state.theme = action.payload.theme
          state.loadingStatus = 'loaded'
        }
      )
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

export const { setTheme } = authSlice.actions
export const authReducer = authSlice.reducer
