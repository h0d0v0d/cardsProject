import React from "react"
import { Pagination } from "@mui/material"

import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"

export const PaginationBar = () => {
  const page = useAppSelector((state) => state.pack.searchParams.page)
  const cardPacksTotalCount = useAppSelector(
    (state) => state.pack.meta.cardPacksTotalCount,
  )
  const dispatch = useAppDispatch()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(packsActions.editPage({ newPage: value }))
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
