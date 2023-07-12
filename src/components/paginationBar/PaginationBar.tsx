import React from "react"
import { Pagination } from "@mui/material"

import { useActions, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"
import { packsSelectors } from "@/features/packs/packs.selectors"

export const PaginationBar = () => {
  const page = useAppSelector(packsSelectors.selectPage)
  const cardPacksTotalCount = useAppSelector(
    packsSelectors.selectCardPacksTotalCount,
  )
  const { editPage } = useActions(packsActions)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    editPage({ newPage: value })
  }
  return (
    <Pagination
      count={Math.ceil(cardPacksTotalCount / 8)}
      page={page}
      onChange={handleChange}
      color="secondary"
    />
  )
}
