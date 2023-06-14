import * as React from "react"
import { useState } from "react"

import "./toogleButton.scss"

export const ToggleButtons = () => {
  const [alignment, setAlignment] = useState("my")

  const getButtonClass = (flag: string): string => {
    return `toogle-button ${alignment === flag ? "active" : null}`
  }

  const toogle = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    console.log(e)
  }

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
