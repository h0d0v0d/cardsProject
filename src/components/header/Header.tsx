import React from "react"

import "./header.scss"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { authThunks } from "@/features/auth/auth.slice"
import { useNavigate } from "react-router-dom"

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
      {isAuth && <UserInfo name={user.name} avatar={user.avatar} />}
    </div>
  )
}

type UserInfoPropsType = {
  name: string
  avatar?: string
}

const UserInfo: React.FC<UserInfoPropsType> = ({ name, avatar }) => {
  const navigate = useNavigate()
  const redirectToLogin = () => {
    navigate("profile")
  }
  return (
    <div className="user-info" onClick={redirectToLogin}>
      <h2 className="name">{name}</h2>
      <div className="photo">
        <img src={avatar} />
      </div>
    </div>
  )
}
