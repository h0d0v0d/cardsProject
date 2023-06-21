import * as React from "react"
import { useState, useEffect } from "react"

import { useAppDispatch } from "@/hooks/hooks"
import { packsThunks } from "@/features/packs/packs.slice"

import "./toogleButton.scss"

export const ToggleButtons = () => {
  const [alignment, setAlignment] = useState<"my" | "all">("all")
  const dispatch = useAppDispatch()

  const getButtonClass = (flag: string): string => {
    return `toogle-button ${alignment === flag ? "active" : null}`
  }

  useEffect(() => {
    dispatch(packsThunks.editUserId({ packsList: alignment }))
  }, [alignment])

  return (
    <div className="toogle-button">
      <h2>Show packs cards</h2>
      <div className="toogle-button-group">
        <button
          className={getButtonClass("all")}
          onClick={() => {
            setAlignment("all")
          }}
        >
          All
        </button>
        <button
          className={getButtonClass("my")}
          onClick={() => {
            setAlignment("my")
          }}
        >
          MY
        </button>
      </div>
    </div>
  )
}
