import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import { LoginArgs, RegisterArgs, authAPI, User } from "./auth.api"

const THUNK_PREFIXES = {
  AUTH: "auth",
  REGISTER: "auth/register",
  LOGIN: "auth/login",
}

const register = createAppAsyncThunk<any, RegisterArgs>(
  THUNK_PREFIXES.REGISTER,
  async (arg, thunkAPI) => {
    try {
      const res = await authAPI.registration(arg)
      console.log(res)
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

const slice = createSlice({
  name: THUNK_PREFIXES.AUTH,
  initialState: {
    isAuth: false,
    user: {} as User,
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
  },
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { register, login }
