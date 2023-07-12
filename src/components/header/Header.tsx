import React from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "@/common/hooks"
import { authSelectors } from "@/features/auth/auth.selectors"

import "./header.scss"

export const Header = () => {
  const isAuth = useAppSelector(authSelectors.selectIsAuth)
  const user = useAppSelector(authSelectors.selectUser)
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
