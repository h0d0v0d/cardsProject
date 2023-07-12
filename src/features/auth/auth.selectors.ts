import { RootState } from "@/app/store"

export const authSelectors = {
  selectIsAuth: (state: RootState) => state.auth.isAuth,
  selectUser: (state: RootState) => state.auth.user,
}
