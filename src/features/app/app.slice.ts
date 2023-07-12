import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { getErorMessage } from "@/common/utilis/getErrorMessage"

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    unhandledActions: [] as string[],
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading
    },
    setError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/pending")
        },
        (state, action) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/fulfilled")
        },
        (state, action) => {
          state.isLoading = false
        },
      )
      .addMatcher(
        (action: any) => {
          return action.type.endsWith("/rejected")
        },
        (state, action) => {
          const { showGlobalError, error } = action.payload
          state.isLoading = false
          if (showGlobalError) {
            toast.error(getErorMessage(error))
          }
        },
      )
    builder.addDefaultCase((state, action: any) => {
      console.log("addDefaultCase", action.type)
      state.unhandledActions.push(action)
    })
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
