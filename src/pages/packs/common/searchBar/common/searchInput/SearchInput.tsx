import React from "react"

import { TextField } from "@mui/material"

import "./searchInput.scss"

export const SearchInput = () => {
  return (
    <div className="search-input">
      <h2>Search</h2>
      <TextField
        style={{
          width: "413px",
        }}
        margin="none"
        variant="outlined"
      />
    </div>
  )
}
