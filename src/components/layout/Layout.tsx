import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Toast } from "../toast/Toast"
import LinearProgress from "@mui/material/LinearProgress"

import { authThunks } from "@/features/auth/auth.slice"
import { useActions, useAppSelector } from "@/common/hooks"

import { Header } from "../header/Header"

import "./layout.scss"

export const Layout: React.FC = () => {
  const loading = useAppSelector((state) => state.app.isLoading)
  const { me } = useActions(authThunks)
  useEffect(() => {
    me()
  }, [])
  return (
    <div>
      {loading && <LinearProgress />}
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Toast />
    </div>
  )
}
