import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import React from "react"

import { withRedirect } from "@/HOC/withRedirect/withRedirect"

import { Card } from "@/components/card/Card"
import { CardHeader } from "@/components/card/common/cardHeader/CardHeader"
import { Button } from "@/components/button/Button"
import { CardDescription } from "@/components/card/common/cardDescription/CardDescription"
import { authThunks } from "@/features/auth/auth.slice"
import { EditableSpan } from "@/components/editableSpan/EditableSpan"

import "./profilePage.scss"

export const Profile = withRedirect(() => {
  const user = useAppSelector((state) => state.auth.user)
  const dispatch = useAppDispatch()
  const logout = () => {
    dispatch(authThunks.logout({}))
  }
  const setNewName = (newName: string) => {
    dispatch(authThunks.setUserData({ name: newName }))
  }
  return (
    <div className="profile-page">
      <Card width="413px">
        <CardHeader value="Personal Information" marginBottom="30px" />
        <div className="image">
          <img src={user.avatar} />
        </div>
        <div className="name">
          <EditableSpan value={user.name} onChange={setNewName} />
        </div>
        <CardDescription value={user.email} marginBottom="30px" />
        <Button onClick={logout}>Log out</Button>
      </Card>
    </div>
  )
})