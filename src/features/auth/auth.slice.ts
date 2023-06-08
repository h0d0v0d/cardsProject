import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import { LoginArgs, RegisterArgs, authAPI, User, ForgotArgs } from "./auth.api"

const THUNK_PREFIXES = {
  AUTH: "auth",
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  ME: "auth/me",
  LOGOUT: "auth/logout",
  FORGOT: "auth/forgot",
}

export type RegisterType = "succes" | "error" | "idle"

const register = createAppAsyncThunk<
  { register: RegisterType } | void,
  RegisterArgs
>(THUNK_PREFIXES.REGISTER, async (arg, thunkAPI) => {
  try {
    const res = await authAPI.registration(arg)
    return { register: "succes" }
  } catch (error) {
    console.log(error)
  }
})

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

const logout = createAppAsyncThunk<{ isAuth: boolean } | void, {}>(
  THUNK_PREFIXES.LOGOUT,
  async () => {
    try {
      const res = await authAPI.logout()
      return { isAuth: false }
    } catch (error) {
      console.log(error)
    }
  },
)

const me = createAppAsyncThunk<{ isAuth: boolean } | void, {}>(
  THUNK_PREFIXES.ME,
  async () => {
    try {
      const res = await authAPI.me()
      return { isAuth: true }
    } catch (error) {
      console.log(error)
    }
  },
)

const forgotPassword = createAppAsyncThunk<any, { email: string }>(
  THUNK_PREFIXES.FORGOT,
  async (args, thunkAPI) => {
    try {
      const res = await authAPI.forgotPassword({ email: args.email })
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
    register: "idle" as RegisterType,
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
    builder.addCase(register.fulfilled, (state, action: any) => {
      state.register = action.payload.register
    })
    builder.addCase(logout.fulfilled, (state, action: any) => {
      if (action.payload.isAuth !== undefined) {
        state.isAuth = action.payload.isAuth
      }
    })
    builder.addCase(me.fulfilled, (state, action: any) => {
      if (action.payload.isAuth) {
        state.isAuth = action.payload.isAuth
      }
    })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login, logout, forgotPassword, me }
