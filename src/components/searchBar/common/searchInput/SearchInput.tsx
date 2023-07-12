import React, { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { TextField } from "@mui/material"

import { useActions, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"

import { packsSelectors } from "@/features/packs/packs.selectors"

import "./searchInput.scss"

export const SearchInput = () => {
  const packName = useAppSelector(packsSelectors.selectSearchParamsPackName)
  const { editPackName } = useActions(packsActions)
  const [value, setValue] = useState(packName)
  const [debonusedValue] = useDebounce(value, 1000)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  useEffect(() => {
    editPackName({ newPackName: debonusedValue || undefined })
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
