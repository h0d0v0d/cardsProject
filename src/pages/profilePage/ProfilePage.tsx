import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import React from "react"
import { Navigate } from "react-router-dom"

import "./profilePage.scss"
import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import Button from "@/components/button/Button"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"
import { authThunks } from "@/features/auth/auth.slice"

export const ProfilePage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(authThunks.logout({}))
  }
  if (!isAuth) {
    return <Navigate to={"/login"} />
  }
  return (
    <div className="profile-page">
      <Card width="413px">
        <CardHeader value="Personal Information" marginBottom="30px" />
        <div className="image"></div>
        <div className="name">
          <h2>Егор</h2>
          <Button width="45px" height="30px">
            Edit
          </Button>
        </div>
        <CardDescription value={user.email} marginBottom="30px" />
        <Button onClick={logout}>Log out</Button>
      </Card>
    </div>
  )
}
