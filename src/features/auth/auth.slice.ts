import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import { LoginArgs, RegisterArgs, authAPI, User, ForgotArgs } from "./auth.api"

const THUNK_PREFIXES = {
  AUTH: "auth",
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  LOGOUT: "auth/logout",
  FORGOT: "auth/forgot",
}

const register = createAppAsyncThunk<{} | void, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  async (arg, thunkAPI) => {
    try {
      const res = await authAPI.registration(arg)
      return { register: "succes" }
    } catch (error) {
      console.log(error)
    }
  },
)

const login = createAppAsyncThunk<{ user: User } | void, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  async (args, thunkAPI) => {
    try {
      const res = await authAPI.login(args)
      return { user: res.data }
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  },
)

const logout = createAppAsyncThunk<void, {}>(
  THUNK_PREFIXES.LOGOUT,
  async () => {
    try {
      const res = await authAPI.logout()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
)

const forgotPassword = createAppAsyncThunk<any, ForgotArgs>(
  THUNK_PREFIXES.FORGOT,
  async (args, thunkAPI) => {
    try {
      const res = await authAPI.forgotPassword(args)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
)

const slice = createSlice({
  name: THUNK_PREFIXES.AUTH,
  initialState: {
    user: {} as User,
    isAuth: false,
    register: "idle" as "succes" | "error" | "idle",
  },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action: any) => {
      if (action.payload.user) {
        state.user = action.payload.user
        state.isAuth = true
        console.log(action.payload.user)
      }
    })
    builder.addCase(logout.fulfilled, (state, action: any) => {
      if (action.payload.register) {
        state.register = action.payload.register
      }
    })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, logout, forgotPassword }
