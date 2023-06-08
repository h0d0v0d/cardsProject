import React from "react"

import "./header.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(authThunks.logout({}))
  }
  return (
    <div className="header">
      <div className="icon">it-incubator</div>
      {isAuth && <button onClick={logout}>Выйти</button>}
    </div>
  )
}
