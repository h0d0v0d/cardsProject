import React from "react"
import { useEffect } from "react"

import { withRedirect } from "@/common/HOC/withRedirect/withRedirect"
import { useActions, useAppSelector } from "@/common/hooks"
import { packsThunks } from "@/features/packs/packs.slice"
import { packsSelectors } from "@/features/packs/packs.selectors"

import { AddNewPack } from "../../components/addNewPack/AddNewPack"
import { SearchBar } from "../../components/searchBar/SearchBar"
import { PackList } from "../../components/packList/PackList"
import { PaginationBar } from "../../components/paginationBar/PaginationBar"

import "./packs.scss"

export const Packs = withRedirect(() => {
  const { getPacks } = useActions(packsThunks)
  const searchParams = useAppSelector(packsSelectors.selectSearchParams)
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
