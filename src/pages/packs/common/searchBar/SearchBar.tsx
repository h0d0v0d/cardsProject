import React from "react"

import { SearchInput } from "./common/searchInput/SearchInput"
import { Range } from "./common/range/Range"
import { ToggleButtons } from "./common/toogleButton/ToogleButton"

import "./searchBar.scss"

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <SearchInput />
      <ToggleButtons />
      <Range />
    </div>
  )
}
