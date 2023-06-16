import { withRedirect } from "@/HOC/withRedirect/withRedirect"

import { AddNewPack } from "./common/addNewPack/AddNewPack"
import { SearchBar } from "./common/searchBar/SearchBar"
import { PackList } from "./common/packList/PackList"
import { useEffect } from "react"
import { packsThunks } from "@/features/packs/packs.slice"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { PaginationBar } from "./common/paginationBar/PaginationBar"

import "./packs.scss"

export const Packs = withRedirect(() => {
  const dispatch = useAppDispatch()
  const searchParams = useAppSelector((state) => state.pack.searchParams)
  useEffect(() => {
    dispatch(packsThunks.getPacks({}))
  }, [searchParams])

  return (
    <div>
      <AddNewPack />
      <SearchBar />
      <PackList />
      <PaginationBar />
    </div>
  )
})
