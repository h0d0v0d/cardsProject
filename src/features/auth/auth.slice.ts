import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { thunkTryCatch } from "../../common/utilis/thunk-try-catch"

import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import {
  LoginArgs,
  RegisterArgs,
  authAPI,
  User,
  ForgotArgs,
  SetNewPasswordArgs,
  SetUserDataArgs,
} from "./auth.api"

const THUNK_PREFIXES = {
  AUTH: "auth",
  REGISTER: "auth/register",
  LOGIN: "auth/login",
  ME: "auth/me",
  LOGOUT: "auth/logout",
  FORGOT: "auth/forgot",
  SET_NEW_PASSWORD: "auth/set-new-password",
  SET_USER_DATA: "auth/set-user-data",
}

const register = createAppAsyncThunk<any, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  async (arg, thunkAPI) => {
    thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.registration(arg)
    })
  },
)

const login = createAppAsyncThunk<any, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  async (args, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(args)
      return { user: res.data }
    })
  },
)

const logout = createAppAsyncThunk<any, {}>(THUNK_PREFIXES.LOGOUT, async () => {
  try {
    const res = await authAPI.logout()
    return { isAuth: false }
  } catch (error) {
    console.log(error)
  }
})

const me = createAppAsyncThunk<any, any>(THUNK_PREFIXES.ME, async () => {
  try {
    const res = await authAPI.me()
    return { isAuth: true, user: res.data }
  } catch (error) {
    console.log(error)
  }
})

const forgotPassword = createAppAsyncThunk<any, ForgotArgs>(
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

const setNewPassword = createAppAsyncThunk<any, SetNewPasswordArgs>(
  THUNK_PREFIXES.SET_NEW_PASSWORD,
  async (args, thunkAPI) => {
    try {
      const res = await authAPI.newPassword(args)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  },
)

const setUserData = createAppAsyncThunk<any, SetUserDataArgs>(
  THUNK_PREFIXES.SET_USER_DATA,
  async (args) => {
    try {
      const res = await authAPI.setUserData(args)
      return { newUser: res.data.updatedUser }
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
  },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
  },
  extraReducers(builder) {
    builder.addCase(login.rejected, (state, action: any) => {
      if (action.payload.user) {
        state.user = action.payload.user
        state.isAuth = true
      }
    })
    builder.addCase(logout.fulfilled, (state, action: any) => {
      if (action.payload.isAuth !== undefined) {
        state.isAuth = action.payload.isAuth
      }
    })
    builder.addCase(me.fulfilled, (state, action: any) => {
      if (action.payload.isAuth) {
        state.isAuth = action.payload.isAuth
        state.user = action.payload.user
      }
    })
    builder.addCase(setUserData.fulfilled, (state, action: any) => {
      if (action.payload.newUser) {
        state.user = action.payload.newUser
      }
    })
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {
  register,
  login,
  logout,
  forgotPassword,
  me,
  setNewPassword,
  setUserData,
}
