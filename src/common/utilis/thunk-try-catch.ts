import { AppDispatch, RootState } from "@/app/store"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

import { appActions } from "@/features/app/app.slice"

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function,
) => {
  const { rejectWithValue, dispatch } = thunkAPI

  try {
    return await promise()
  } catch (e: any) {
    let errorMessage = ""
    if (isAxiosError(e)) {
      errorMessage = e?.response?.data.error ?? e.message
      // ?? проверяет на null и undefined
    } else if (e instanceof Object && "message" in e) {
      errorMessage = `Native error ${e.meesage}`
    } else {
      errorMessage = JSON.stringify(e)
    }
    toast.error(errorMessage)
    return rejectWithValue(errorMessage)
  }
}
