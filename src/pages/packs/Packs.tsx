import React from "react"
import { useEffect } from "react"

import { withRedirect } from "@/common/HOC/withRedirect/withRedirect"
import { useActions, useAppSelector } from "@/common/hooks"
import { packsThunks } from "@/features/packs/packs.slice"

import { AddNewPack } from "./common/addNewPack/AddNewPack"
import { SearchBar } from "./common/searchBar/SearchBar"
import { PackList } from "./common/packList/PackList"
import { PaginationBar } from "./common/paginationBar/PaginationBar"

import "./packs.scss"

export const Packs = withRedirect(() => {
  const { getPacks } = useActions(packsThunks)
  const searchParams = useAppSelector((state) => state.pack.searchParams)
  useEffect(() => {
    getPacks()
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
