import React from "react"

import { Button } from "@/components/button/Button"

import "./addNewPack.scss"

export const AddNewPack = () => {
  return (
    <div className="add-new-pack">
      <h2>Packs list</h2>
      <Button width="175px" height="36px">
        Add new pack
      </Button>
    </div>
  )
}
