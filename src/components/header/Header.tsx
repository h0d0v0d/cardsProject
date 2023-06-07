import React from "react"

import "./header.scss"
import { useAppSelector } from "@/hooks/hooks"

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  return (
    <div className="header">
      <div className="icon">it-incubator</div>
      {isAuth && <button>Выйти</button>}
    </div>
  )
}
