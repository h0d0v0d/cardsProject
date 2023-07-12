import { RootState } from "@/app/store"

export const packsSelectors = {
  selectPacksData: (state: RootState) => state.pack.packsData,
  // search params
  selectPage: (state: RootState) => state.pack.searchParams.page,
  selectSearchParams: (state: RootState) => state.pack.searchParams,
  selectSearchParamsMin: (state: RootState) => state.pack.searchParams.min,
  selectSearchParamsMax: (state: RootState) => state.pack.searchParams.max,
  selectSearchParamsPackName: (state: RootState) =>
    state.pack.searchParams.packName,
  // meta
  selectCardPacksTotalCount: (state: RootState) =>
    state.pack.meta.cardPacksTotalCount,
  selectMeta: (state: RootState) => state.pack.meta,
  selectMetaMin: (state: RootState) => state.pack.meta.minCardsCount,
  selectMetaMax: (state: RootState) => state.pack.meta.maxCardsCount,
}
