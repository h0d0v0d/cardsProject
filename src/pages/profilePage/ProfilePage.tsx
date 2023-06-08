import { useAppSelector } from "@/hooks/hooks"
import React from "react"
import { Navigate } from "react-router-dom"

export const ProfilePage = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth)
  console.log(isAuth)
  if (!isAuth) {
    return <Navigate to={"/login"} />
  }
  return <div>ProfilePage</div>
}
