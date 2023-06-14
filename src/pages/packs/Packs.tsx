import { withRedirect } from "@/HOC/withRedirect/withRedirect"

import "./packs.scss"

import { AddNewPack } from "./common/addNewPack/AddNewPack"
import { SearchBar } from "./common/searchBar/SearchBar"
import { PackList } from "./common/packList/PackList"

export const Packs = withRedirect(() => {
  return (
    <div>
      <AddNewPack />
      <SearchBar />
      <PackList />
    </div>
  )
})
