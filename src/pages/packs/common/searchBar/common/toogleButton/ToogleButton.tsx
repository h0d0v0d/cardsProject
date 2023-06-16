import * as React from "react"
import { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { packsActions } from "@/features/packs/packs.slice"

import "./toogleButton.scss"

export const ToggleButtons = () => {
  const [alignment, setAlignment] = useState<"my" | "all">("all")
  const dispatch = useAppDispatch()
  const user_id = useAppSelector((state) => state.auth.user._id)

  const getButtonClass = (flag: string): string => {
    return `toogle-button ${alignment === flag ? "active" : null}`
  }

  useEffect(() => {
    console.log("render")
    if (alignment === "my") {
      dispatch(
        packsActions.editSearchParams({
          paramsName: "user_id",
          paramsValue: "648211c5015a684d395ebf5b",
        }),
      )
      return
    }
    dispatch(
      packsActions.editSearchParams({
        paramsName: "user_id",
        paramsValue: undefined,
      }),
    )
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
