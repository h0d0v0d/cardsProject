import { createSlice } from "@reduxjs/toolkit"

enum PACKS_PREFIXES {
  PACKS = "packs",
}

const slice = createSlice({
  name: PACKS_PREFIXES.PACKS,
  initialState: {
    packsData: [] as any[],
  },
  reducers: {
    setPacks: (state, action) => {
      console.log("action")
      state.packsData.push(...action.payload.packs)
    },
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
