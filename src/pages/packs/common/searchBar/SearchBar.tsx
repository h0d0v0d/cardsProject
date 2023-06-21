import React from "react"

import { SearchInput } from "./common/searchInput/SearchInput"
import { Range } from "./common/range/Range"
import { ToggleButtons } from "./common/toogleButton/ToogleButton"
import { Button } from "@/components/button/Button"

import "./searchBar.scss"
import { useAppDispatch } from "@/hooks/hooks"
import { packsActions } from "@/features/packs/packs.slice"

export const SearchBar = () => {
  const dispatch = useAppDispatch()
  const reserSearchBar = () => {
    dispatch(packsActions.resetSearchParams())
  }
  return (
    <div className="search-bar">
      <SearchInput />
      <ToggleButtons />
      <Range />
      <Button
        width="40px"
        height="36px"
        marginTop="22px"
        onClick={reserSearchBar}
      >
        Reset
      </Button>
    </div>
  )
}
