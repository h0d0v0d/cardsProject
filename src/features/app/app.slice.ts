import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    authError: null as string | null,
    isLoading: false,
    isAppInitialized: false,
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
    builder.addMatcher(
      (action: any) => {
        return action.type.endsWith("/pending")
      },
      (state, action) => {
        state.isLoading = true
      },
    )
    builder.addMatcher(
      (action: any) => {
        return action.type.endsWith("/fulfilled")
      },
      (state, action) => {
        state.isLoading = false
      },
    )
    builder.addMatcher(
      (action: any) => {
        return action.type.endsWith("/rejected")
      },
      (state, action) => {
        console.log("Rejected блять")
        state.isLoading = false
      },
    )
  },
})

export const appReducer = slice.reducer
export const appActions = slice.actions
