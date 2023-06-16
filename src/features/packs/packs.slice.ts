import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import { thunkTryCatch } from "@/common/utilis/thunk-try-catch"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GetPacksArgs, Pack, packsApi } from "./packs.api"

enum PACKS_PREFIXES {
  PACKS = "packs",
  GET_PACKS = "packs/get-packs",
  EDIT_PAGE = "packs/edit-page",
}

type GetPacksPayload = {
  packs: Pack[]
  meta: {
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
  }
}
const getPacks = createAppAsyncThunk<GetPacksPayload, GetPacksArgs>(
  PACKS_PREFIXES.GET_PACKS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const searchParams = thunkApi.getState().pack.searchParams
      console.log(searchParams)
      const res = await packsApi.getPacks(searchParams)
      const { cardPacks, ...meta } = res.data
      return {
        packs: cardPacks,
        meta: meta,
      }
    })
  },
)

const slice = createSlice({
  name: PACKS_PREFIXES.PACKS,
  initialState: {
    packsData: [] as any[],
    searchParams: {
      packName: undefined as string | undefined,
      min: 0,
      max: 40,
      sortPacks: undefined as string | undefined,
      page: 1,
      pageCount: 8,
      user_id: undefined as string | undefined,
    } as GetPacksArgs,
    meta: {
      cardPacksTotalCount: 80,
      minCardsCount: 0,
      maxCardsCount: 10,
    },
  },
  reducers: {
    editPage: (state, action: PayloadAction<{ newPage: number }>) => {
      state.searchParams.page = action.payload.newPage
    },
    editPackName: (
      state,
      action: PayloadAction<{ newPackName: string | undefined }>,
    ) => {
      state.searchParams.packName = action.payload.newPackName
    },
    editSearchParams: (
      state,
      action: PayloadAction<{
        paramsName: string
        paramsValue: string | undefined
      }>,
    ) => {
      // @ts-ignore
      state.searchParams[action.payload.paramsName] = action.payload.paramsValue
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getPacks.fulfilled,
      (state, action: PayloadAction<GetPacksPayload>) => {
        state.packsData = action.payload.packs
        state.meta = action.payload.meta
      },
    )
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks }
