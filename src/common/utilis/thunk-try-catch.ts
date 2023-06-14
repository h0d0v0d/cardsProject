import { AppDispatch, RootState } from "@/app/store"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"

type Options = { showGlobalError?: boolean | undefined }

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: () => Promise<T>,
  options?: Options,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { rejectWithValue } = thunkAPI
  const showGlobalError = options?.showGlobalError ?? true

  try {
    return await promise()
  } catch (e: any) {
    return rejectWithValue({ error: e, showGlobalError })
  }
}
