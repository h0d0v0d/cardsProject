import React from "react"

import { useAppSelector } from "@/common/hooks"
import { useNavigate } from "react-router-dom"

import "./header.scss"

export const Header = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const user = useAppSelector((state) => state.auth.user)
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
