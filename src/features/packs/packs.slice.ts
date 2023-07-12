import { createAppAsyncThunk } from "@/common/utilis/create-app-async-thunk"
import { thunkTryCatch } from "@/common/utilis/thunk-try-catch"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { GetPacksArgs, Pack, packsApi } from "./packs.api"

enum PACKS_PREFIXES {
  PACKS = "packs",
  GET_PACKS = "packs/get-packs",
  EDIT_PAGE = "packs/edit-page",
  EDIT_USER_ID = "packs/edit-user-id",
}

type GetPacksPayload = {
  packs: Pack[]
  meta: {
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
  }
}
const getPacks = createAppAsyncThunk<GetPacksPayload>(
  PACKS_PREFIXES.GET_PACKS,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      const searchParams = thunkApi.getState().pack.searchParams
      const res = await packsApi.getPacks(searchParams)
      const { cardPacks, ...meta } = res.data
      return {
        packs: cardPacks,
        meta,
      }
    })
  },
)

type EditUserIdPayload = { user_id: string | undefined }
type EditUserIdArgs = { packsList: "all" | "my" }
const editUserId = createAppAsyncThunk<EditUserIdPayload, EditUserIdArgs>(
  PACKS_PREFIXES.EDIT_USER_ID,
  async (args, thunkApi) => {
    return thunkTryCatch(thunkApi, async () => {
      if (args.packsList === "my") {
        const user_id = thunkApi.getState().auth.user._id
        return { user_id }
      }
      return { user_id: undefined }
    })
  },
)

const slice = createSlice({
  name: PACKS_PREFIXES.PACKS,
  initialState: {
    packsData: [] as any[],
    searchParams: {
      packName: undefined as string | undefined,
      min: 0 as number | undefined,
      max: 10 as number | undefined,
      sortPacks: undefined as string | undefined,
      page: 1 as number | undefined,
      pageCount: 8 as number | undefined,
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
    editMinMax: (
      state,
      action: PayloadAction<{
        min: number | undefined
        max: number | undefined
      }>,
    ) => {
      state.searchParams.min = action.payload.min
      state.searchParams.max = action.payload.max
    },
    resetSearchParams: (state) => {
      state.searchParams.user_id = undefined
      state.searchParams.packName = undefined
      state.searchParams.max = undefined
      state.searchParams.min = undefined
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getPacks.fulfilled,
        (state, action: PayloadAction<GetPacksPayload>) => {
          state.packsData = action.payload.packs
          state.meta = action.payload.meta
          state.searchParams.min = action.payload.meta.minCardsCount
          state.searchParams.max = action.payload.meta.maxCardsCount
        },
      )
      .addCase(
        editUserId.fulfilled,
        (state, action: PayloadAction<EditUserIdPayload>) => {
          state.searchParams.user_id = action.payload.user_id
        },
      )
  },
})

export const packsReducer = slice.reducer
export const packsActions = slice.actions
export const packsThunks = { getPacks, editUserId }
