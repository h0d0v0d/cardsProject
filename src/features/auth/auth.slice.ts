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
  MeResponse,
} from "./auth.api"
import { toast } from "react-toastify"

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

const register = createAppAsyncThunk<unknown, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.registration(arg)
    })
  },
)

type LoginPayload = { user: User }
const login = createAppAsyncThunk<LoginPayload, LoginArgs>(
  THUNK_PREFIXES.LOGIN,
  async (args, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(args)
      toast.success("Successful login", { autoClose: 3000 })
      return { user: res.data }
    })
  },
)

const logout = createAppAsyncThunk(
  THUNK_PREFIXES.LOGOUT,
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logout()
    })
  },
)

type MePayload = { user: MeResponse }
const me = createAppAsyncThunk<MePayload>(
  THUNK_PREFIXES.ME,
  async (args, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authAPI.me()
        return { user: res.data }
      },
      { showGlobalError: false },
    )
  },
)

const forgotPassword = createAppAsyncThunk<unknown, ForgotArgs>(
  THUNK_PREFIXES.FORGOT,
  async (args, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.forgotPassword({ email: args.email })
    })
  },
)

const setNewPassword = createAppAsyncThunk<unknown, SetNewPasswordArgs>(
  THUNK_PREFIXES.SET_NEW_PASSWORD,
  async (args, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.newPassword(args)
    })
  },
)

type SetUserDataPayload = { updateUser: User }
const setUserData = createAppAsyncThunk<SetUserDataPayload, SetUserDataArgs>(
  THUNK_PREFIXES.SET_USER_DATA,
  async (args, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.setUserData(args)
      return { updateUser: res.data.updatedUser }
    })
  },
)

const slice = createSlice({
  name: THUNK_PREFIXES.AUTH,
  initialState: {
    user: {} as User,
    isAuth: null as boolean | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          state.user = action.payload.user
          state.isAuth = true
        },
      )
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false
        state.user = {} as User
      })
      .addCase(me.fulfilled, (state, action: PayloadAction<MePayload>) => {
        state.user = action.payload.user
        state.isAuth = true
      })
      .addCase(me.rejected, (state) => {
        state.isAuth = false
      })
      .addCase(
        setUserData.fulfilled,
        (state, action: PayloadAction<SetUserDataPayload>) => {
          state.user = action.payload.updateUser
        },
      )
  },
})

export const authReducer = slice.reducer
export const authThunks = {
  register,
  login,
  logout,
  forgotPassword,
  me,
  setNewPassword,
  setUserData,
}
