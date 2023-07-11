import React, { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { TextField } from "@mui/material"

import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"

import "./searchInput.scss"

export const SearchInput = () => {
  const packName = useAppSelector((state) => state.pack.searchParams.packName)
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(packName)
  const [debonusedValue] = useDebounce(value, 1000)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  useEffect(() => {
    dispatch(
      packsActions.editPackName({ newPackName: debonusedValue || undefined }),
    )
  }, [debonusedValue])
  return (
    <div className="search-input">
      <h2>Search</h2>
      <TextField
        style={{
          width: "413px",
        }}
        margin="none"
        variant="outlined"
        onChange={onChange}
        value={value ?? ""}
      />
    </div>
  )
}
