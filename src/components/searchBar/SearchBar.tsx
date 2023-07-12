import React from "react"

import { useActions } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"

import { SearchInput } from "./common/searchInput/SearchInput"
import { Range } from "./common/range/Range"
import { ToggleButtons } from "./common/toogleButton/ToogleButton"
import { Button } from "@/components/button/Button"

import "./searchBar.scss"

export const SearchBar = () => {
  const { resetSearchParams } = useActions(packsActions)
  const reserSearchBar = () => {
    resetSearchParams()
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
