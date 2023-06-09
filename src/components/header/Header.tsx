import React from "react"

import "./header.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(authThunks.logout({}))
  }
  return (
    <div className="header">
      <div className="icon">it-incubator</div>
      {isAuth && <UserInfo name={user.name} />}
    </div>
  )
}

type UserInfo = {
  name: string
  photoURL?: string
}

const UserInfo: React.FC<UserInfo> = ({ name, photoURL }) => {
  return (
    <div className="user-info">
      <h2 className="name">{name}</h2>
      <div className="photo"></div>
    </div>
  )
}
