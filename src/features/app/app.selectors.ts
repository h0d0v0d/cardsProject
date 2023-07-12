import { RootState } from "@/app/store"

export const appSlectors = {
  selectIsLoading: (state: RootState) => state.app.isLoading,
}
